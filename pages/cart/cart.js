var util = require('../../utils/util.js');
var api = require('../../config/api.js');
//var user = require('../../utils/user.js');

var app = getApp();

Page({
  data: {
    cartGoods: [],
    isEmpty: false,
    checkedAllStatus: false,
    editing: false,
    goods_count: 0,
    checkedIds: [],
  },
  onLoad: function (options) {
    var windowWidth = wx.getSystemInfoSync().windowWidth;
    var windowHeight = wx.getSystemInfoSync().windowHeight;
    var scroll_height = 750 * windowHeight / windowWidth - 290;
    this.setData({
      scroll_height: scroll_height
    })
  },
  onReady: function () {
    // 页面渲染完成
  },

  onShow: function () {
    this.getCartList();
    // 页面显示
    if (app.globalData.hasLogin) {
      this.getCartList();
    }
    this.setData({
      hasLogin: app.globalData.hasLogin
    });
  },
  onControl(e) {
    this.setData({
      editing: !this.data.editing
    })
  },
  onCheck(e) {
    console.log(e)
  },
  minus(e) {
    var that = this
    var goods = this.data.cartGoods
    var index = e.currentTarget.dataset.index
    wx.showLoading({
      title: '处理中',
    })
    util.requestp(api.UpdateCart, {
        UserId: 3,
        cartId: goods[index].id,
        goodsId: goods[index].goodsId,
        number: goods[index].number - 1,
        productId: goods[index].productId
      }, "POST")
      .then(function (res) {
        wx.hideLoading()
        if (res.code == 0) {
          wx.showToast({
            title: '操作成功',
            icon: 'success',
            duration: 200
          })
          goods[index].number -= 1
          that.setData({
            cartGoods: goods
          })
        } else {
          util.showErrorToast(res.msg);
        }
      });
  },
  plus(e) {
    var that = this
    var goods = this.data.cartGoods
    var index = e.currentTarget.dataset.index
    wx.showLoading({
      title: '处理中',
    })
    util.requestp(api.UpdateCart, {
        UserId: 3,
        cartId: goods[index].id,
        goodsId: goods[index].goodsId,
        number: goods[index].number + 1,
        productId: goods[index].productId
      }, "POST")
      .then(function (res) {
        wx.hideLoading()
        if (res.code == 0) {
          wx.showToast({
            title: '操作成功',
            icon: 'success',
            duration: 200
          })
          goods[index].number += 1
          that.setData({
            cartGoods: goods
          })
        } else {
          util.showErrorToast(res.msg);
        }
      });
  },
  goLogin() {
    wx.navigateTo({
      url: "/pages/login/login"
    });
  },
  getCartList: function () {
    let that = this;
    util.request(api.GetCart, {
      UserId: "3"
    }, 'GET').then(function (res) {
      if (res.code === 0) {
        that.setData({
          cartGoods: res.data.list,
        });
        that.setData({
          checkedAllStatus: that.isCheckedAll()
        });
      }
    });
  },
  isCheckedAll: function () {
    //判断购物车商品已全选
    return this.data.cartGoods.every(function (element, index, array) {
      if (element.checked == true) {
        return true;
      } else {
        return false;
      }
    });
  },
  //!!
  onCheck: function (e) {
    let index = e.currentTarget.dataset.index;
    let that = this;
    let goods = this.data.cartGoods
    wx.showLoading({
      title: '处理中',
    })
    util.requestp(api.UpdateChoose, {
      UserId: 3,
      cartId: goods[index].id,
      checked: !goods[index].checked? 1: 0
    }, 'POST').then(function (res) {
      wx.hideLoading()
      if (res.code === 0) {
        wx.showToast({
          title: '操作成功',
          icon: 'success',
          duration: 200
        })
        goods[index].checked = !goods[index].checked
        that.setData({
          cartGoods: goods
        });
        that.setData({
          checkedAllStatus: that.isCheckedAll()
        });
      }
    });
  },
  getPrice: function () {
    let price = 0;
    this.data.cartGoods.forEach(function (v) {
      if (v.checked === true) {
        price += v.price * v.number;
      }
    });
    return price;
  },
  onCheckAll: function () {
    let that = this;
    if (!this.data.isEditCart) {
      var productId = this.data.cartGoods.map(function (v) {
        return v.productId;
      });
      util.request(api.CartChecked, {
        productId: productId,
        isChecked: that.isCheckedAll() ? 0 : 1
      }, 'POST').then(function (res) {
        if (res.code === 0) {
          console.log(res.data);
          that.setData({
            cartGoods: res.data.cartList,
            cartTotal: res.data.cartTotal
          });
        }

        that.setData({
          checkedAllStatus: that.isCheckedAll()
        });
      });
    } else {
      //编辑状态
      let checkedAllStatus = that.isCheckedAll();
      let tmpCartData = this.data.cartGoods.map(function (v) {
        v.checked = !checkedAllStatus;
        return v;
      });

      that.setData({
        cartGoods: tmpCartData,
        checkedAllStatus: that.isCheckedAll(),
        'cartTotal.checkedGoodsCount': that.getCheckedGoodsCount()
      });
    }

  },
  onConfirm: function (e) {
    var checkedGoods = this.checkCart();
    if (checkedGoods != false) {
      wx.showToast({
        title: '还没有选中商品哦',
        icon: 'none',
      })
    }
    if (this.data.editing) {
    }
    else {
      let cart = JSON.stringify(checkedGoods)
      wx.navigateTo({
        url: '../paythebill/paythebill?cart='+cart,
      })
    }
  },
  checkCart: function () {
    //获取已选择的商品
    var checkedCartId = []
    this.data.cartGoods.forEach(element => {
      if (element.checked) {
        checkedCartId.push(element.id)
      }
    })
    if (checkedCartId.length <= 0) {
      return false;
    }
    return checkedCartId
  },
  deleteCart: function () {
    //获取已选择的商品
    let that = this;

    let productId = this.data.cartGoods.filter(function (element, index, array) {
      if (element.checked == true) {
        return true;
      } else {
        return false;
      }
    });

    if (productId.length <= 0) {
      return false;
    }

    productId = productId.map(function (element, index, array) {
      if (element.checked == true) {
        return element.productId;
      }
    });


    util.request(api.DeleteCart, {
      productId: productId
    }, 'POST').then(function (res) {
      if (res.errno === 0) {
        console.log(res.data);
        let cartList = res.data.cartList.map(v => {
          v.checked = false;
          return v;
        });

        that.setData({
          cartGoods: cartList,
          cartTotal: res.data.cartTotal
        });
      }

      that.setData({
        checkedAllStatus: that.isCheckedAll()
      });
    });
  }
})