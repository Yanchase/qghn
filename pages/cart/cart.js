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
    var scroll_height = 750 * windowHeight / windowWidth - 370;
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
    // if (app.globalData.hasLogin) {
    //   this.getCartList();
    // }
    // this.setData({
    //   hasLogin: app.globalData.hasLogin
    // });
  },

  //修改编辑状态
  onControl(e) {
    this.setData({
      editing: !this.data.editing
    })
    if(this.data.editing==false){
      this.getCartList();
    }
  },

  //商品数量减1
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

  //商品数量加1
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

  //获取购物车商品
  getCartList: function () {
    let that = this;
    util.request(api.GetCart, {
      UserId: "3"
    }, 'GET').then(function (res) {
      console.log(res);
      if (res.code === 0) {

        //异步处理
        that.setData({
          cartGoods: res.data.list,
        })
        that.setData({
          checkedAllStatus: that.isCheckedAll()
        })
        console.log(that.data.checkedAllStatus)
      }
    });
  },

  //判断是否选中全部商品
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

  //选中或取消选中一个商品
  onCheck: function (e) {
    let index = e.currentTarget.dataset.index;
    let that = this;
    let goods = this.data.cartGoods
    wx.showLoading({
      title: '处理中',
    })

    //管理和购物处理不同
    if(this.data.editing==false){
      util.updateCart(api.UpdateChoose, {
        UserId: 3,
        cartCheckedVos:[
          {
            cartId: goods[index].id,
            checked: goods[index].checked==true ? 0 :1 ,
          }
        ]
        
      }, 'POST').then(function (res) {
        wx.hideLoading()
        console.log(res);
        if (res.code === 0) {
          wx.showToast({
            title: '操作成功',
            icon: 'success',
            duration: 200
          })
          goods[index].checked = !goods[index].checked
          that.setData({
            cartGoods: goods,
            checkedAllStatus: that.isCheckedAll()
          });
        }
      });
    }else{
      wx.hideLoading();
      goods[index].checked = !goods[index].checked
      that.setData({
        cartGoods: goods,
        checkedAllStatus: that.isCheckedAll()
      });
    }
    
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

  //选中全部或取消全部
  onCheckAll: function () {
    let that = this;
    let checked=that.isCheckedAll() ? 0 : 1;
    console.log(checked);
    //修改所有商品checked
    if (!this.data.editing) {
      var cartCheckedVos = this.data.cartGoods.map(function (v) {
        let item={};
        item.cartId=v.id;
        item.checked=checked;
        return item;
      });
      console.log(cartCheckedVos);
      util.updateCart(api.UpdateChoose, {
        UserId: 3,
        cartCheckedVos: cartCheckedVos
      }, 'POST').then(function (res) {
        console.log(res);
        that.getCartList();
      });
    } else {
      //编辑状态，全部选中或全部不选中
      let checkedAllStatus = that.isCheckedAll();
      let tmpCartData = this.data.cartGoods.map(function (v) {
        v.checked = !checkedAllStatus;
        return v;
      });

      that.setData({
        cartGoods: tmpCartData,
        // 'cartTotal.checkedGoodsCount': that.getCheckedGoodsCount()
      });
      that.setData({
        
        checkedAllStatus: that.isCheckedAll(),
      })
    }

  },

  //前往订单页面
  onConfirm: function (e) {
    var checkedGoods = this.checkCart();
    if (checkedGoods == false) {
      wx.showToast({
        title: '还没有选中商品哦',
        icon: 'none',
      })
    }
    if (this.data.editing) {
      console.log("走着了")
      this.deleteCart();
    }
    else {
      let cartIds = JSON.stringify(checkedGoods)
      wx.navigateTo({
        url: '../paythebill/paythebill?cartId='+cartIds,
      })
    }
  },

  //获取已选择的商品
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

  //删除选中商品
  deleteCart: function () {
    //获取已选择的商品
    let that = this;


    let cartId = [];
    this.data.cartGoods.forEach(function (element, index, array) {
      if (element.checked == true) {
        cartId.push(element.id);
      }
    });
    console.log(cartId);

    util.requestp(api.DeleteCart, {
      UserId:3,
      cartId: cartId
    }, 'POST').then(function (res) {
      console.log(res);
      if (res.errno === 0) {
        
        let cartList = that.data.cartGoods.map(v => {
          if(v.checked != false){
            return v;
          }
          
        });

        that.setData({
          cartGoods: cartList,
        });
      }

      that.setData({
        checkedAllStatus: that.isCheckedAll()
      });
    });
  }
})