// pages/goods/goods.js
var util = require('../../utils/util.js');
var api = require('../../config/api.js');
var WxParse = require('../../lib/wxParse/wxParse')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    goods_id: 0,
    goods: {},
    speclist: [],
    numlist: [],
    valuelist: [],
    storenum: 0,
    productId: 0,
    specprice: 0,
    cartGoodsCount: 0,
    userHasCollect: 0,
    number: 1,
    checkedSpecText: '规格数量选择',
    tmpSpecText: '请选择规格数量',
    checkedSpecPrice: 0,
    openAttr: false,
    openShare: false,
    soldout: false,
  },

   // 获取商品信息
   getGoodsInfo: function() {
    let that = this;

    util.request(api.GoodInfo, {
      id: parseInt(that.data.id)


    }).then(function(res) {
      if (res.code == 0) {
        that.setData({
          goods: res.data,
          goodspic: res.showUrl,
          specurl: res.data.picUrl
        });
      }
      WxParse.wxParse('goodsDetail', 'html', res.data.detail, that);
    });
  },
  getGoodsSpec: function(){
    let that = this;
    util.request(api.GoodSpec, {
      goods_id: parseInt(that.data.id)
    }).then(function(res) {
      if(res.code == 0)
      {
        that.setData({
          speclist: res.data
        })
      }
    })
  },

  clickSkuValue: function(event){
      let that = this;
      let id = event.currentTarget.dataset.id;
      console.log(event)
      that.setData({
        productId: event.currentTarget.dataset.id,
      })
      let _speclist = this.data.speclist;
      for(let i = 0; i < _speclist.length; i++)
      {
        if(_speclist[i].id == id)
        {
          that.setData({
            storenum: _speclist[i].number
          })
        }
      }
      for(let i = 0; i < _speclist.length; i++)
      {
        if(_speclist[i].id == id)
        {
          if (_speclist[i].checked) {
            _speclist[i].checked = false;
          } else {
            _speclist[i].checked = true;
          }
        } else {
          _speclist[i].checked = false;
        }
        }
        console.log(this.data.checked)
        console.log(this.data)
      },

  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    if (options.id) {
      this.setData({
        id: parseInt(options.id)
      });
      this.getGoodsInfo();
      this.getGoodsSpec(options.id);
    }
  },
  onShow: function() {
    // 页面显示
  },

  //立即购买（先自动加入购物车）
  addFast: function() {
    var that = this;
    if (this.data.openAttr == false) {
      //打开规格选择窗口
      this.setData({
        openAttr: !this.data.openAttr
      });
    } else {
      for(let i = 0; i < speclist.length; i++)
      {
       
      }
      //验证库存
      if (this.data.storenum <= 0) {
        util.showErrorToast('没有库存');
        return false;
      }

      //立即购买
      util.request(api.AddCart, {
          userId: 3, 
          goodsId: this.data.goods_id,
          number: this.data.number,
          productId: this.data.productId
        }, "POST")
        .then(function(res) {
          if (res.code == 0) {
            try {
              wx.setStorageSync('cartId', res.data);
              wx.navigateTo({
                url: '/pages/paythebill/paythebill'
              })
            } catch (e) {}

          } else {
            util.showErrorToast(res.msg);
          }
        });
    }
  },

  //添加到购物车
  addToCart: function() {
    var that = this;
    if (this.data.openAttr == false) {
      //打开规格选择窗口
      this.setData({
        openAttr: !this.data.openAttr
      });
    } else {
      //验证库存
      if (this.data.storenum <= 0) {
        util.showErrorToast('没有库存');
        return false;
      }

      //添加到购物车
      util.request(api.AddCart, {
          userId: 3,
          goodsId: this.data.goods_id,
          number: this.data.number,
          productId: this.data.productId
        }, "POST")
        .then(function(res) {
          if (res.code == 0) {
            wx.showToast({
              title: '添加成功'
            });
            that.setData({
              //cartGoodsCount: res.data
            });
            if (that.data.userHasCollect == 1) {
              that.setData({
                collect: true
              });
            } else {
              that.setData({
                collect: false
              });
            }
          } else {
            util.showErrorToast(res.msg);
          }
        });
    }
  },

  cutNumber: function() {
    this.setData({
      number: (this.data.number - 1 > 1) ? this.data.number - 1 : 1
    });
  },
  addNumber: function() {
    this.setData({
      number: this.data.number + 1
    });
  },
  onHide: function() {
    // 页面隐藏

  },
  onUnload: function() {
    // 页面关闭

  },
  switchAttrPop: function() {
    if (this.data.openAttr == false) {
      this.setData({
        openAttr: !this.data.openAttr
      });
    }
  },
  closeAttr: function() {
    this.setData({
      openAttr: false,
    });
  },

  openCartPage: function() {
    wx.switchTab({
      url: '/pages/cart/cart'
    });
  },
  onReady: function() {
    // 页面渲染完成

  }

})