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
    gkind:0,    //商品类型：目录：1.积分购买，2.积分兑换
    speclist: [],
    numlist: [],
    valuelist: [],
    storenum: 0,  //选中商品规格库存
    productId: 0, //商品规格id
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
    integral:false,  //是否是积分商品
  },

   // 获取商品信息
   getGoodsInfo: function(gkind,id) {
    let that = this,url="";
    if(gkind==1){
      url=api.intBGoodInfo
    }else if(gkind==2){
      url=api.intCGoodInfo
    }else{
      url=api.GoodInfo
    }

    util.request(url, {
      id: id
    }).then(function(res) {
      if (res.code == 0) {
        that.setData({
          goods: res.data,
          goodspic: res.showUrl,
          specurl: res.data.picUrl,
          goodsId: res.data.id
        });
      }
      WxParse.wxParse('goodsDetail', 'html', res.data.detail, that);
    });
  },

  //获取商品规格
  getGoodsSpec: function(gkind,id){
    let that = this;
    util.request(api.GoodSpec, {
      goods_id: id
    }).then(function(res) {
      if(res.code == 0)
      {
        console.log("这里有消息")
        that.setData({
          speclist: res.data
        })
      }
    })
  },

  //选中类型
  clickSkuValue: function(event){
      let that = this;
      let id = event.currentTarget.dataset.id;
      console.log(event)
      that.setData({
        productId: id,
        index:event.currentTarget.dataset.index
      })
      let _speclist = this.data.speclist;
      //将库存变量设为选中商品的
      for(let i = 0; i < _speclist.length; i++)
      {
        if(_speclist[i].id == id)
        {
          that.setData({
            storenum: _speclist[i].number,
          })
        }
      }
      //选中或取消选中
      for(let i = 0; i < _speclist.length; i++)
      {
        if(_speclist[i].id == id)
        {
          
          _speclist[i].checked = !_speclist[i].checked;
          
          this.setData({
            speclist:_speclist
          })
          console.log(_speclist[i].checked)
        } else {
          _speclist[i].checked = false;
          this.setData({
            speclist:_speclist
          })
        }
        }
        console.log(this.data)
      },

  //基础信息和规格,积分类商品也会通过该页面显示
  onLoad: function(options) {
    if (options.id) {
      this.setData({
        id: parseInt(options.id),
        gkind: parseInt(options.gkind)
      });
      //判断商品是否是积分商品
      if(options.gkind!=0){
        this.setData({
          integral:true
        })
      }
      //根据商品类别获取商品信息
      this.getGoodsInfo(options.gkind,options.id);
      this.getGoodsSpec(options.gkind,options.id);
    }
  },

  //下栏购物车数量显示
  onShow: function() {
    let that = this;
    util.request(api.GetCart,{
      UserId: 3
    },'GET').then(function(res){
      that.setData({
        cartGoodsCount: res.data.list.length
      })
    })
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
      for(let i = 0; i < this.data.speclist.length; i++)
      {
       
      }
      //验证库存
      if (this.data.storenum <= 0) {
        util.showErrorToast('没有库存');
        return false;
      }

      let specilist=this.data.speclist[this.data.index];
      console.log(specilist);

      //立即购买,整合信息
      let cart=this.data.goods;
      cart.UserId=3;
      cart.number=this.data.number;
      cart.productId=this.data.productId;
      cart.specifications=specilist.specifications
      
      //跳转去购买
      try {
        wx.setStorageSync('cart', cart);
        wx.navigateTo({
          url: '/pages/paythebill/paythebill?cartId='+JSON.stringify([])+"&gkind="+this.data.gkind
        })
      } catch (e) {}


           
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
      util.requestp(api.AddCart, {
          UserId: 3,
          goodsId: this.data.goodsId,
          number: this.data.number,
          productId: this.data.productId
        }, "POST").then(function(res) {
          if (res.code == 0) {
            wx.showToast({
              title: '添加成功'
            });
            console.log(res);
            that.setData({
              openAttr: !that.data.openAttr,
              cartGoodsCount: (that.data.cartGoodsCount+1)
            });
          } else {
            util.showErrorToast(res.msg);
          }
        });
    }
  },

  //加入购物车商品的数量加操作
  cutNumber: function() {
    this.setData({
      number: (this.data.number - 1 > 1) ? this.data.number - 1 : 1
    });
  },

  //加入购物车商品的数量减操作
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
  //查看商品规格
  switchAttrPop: function() {
    if (this.data.openAttr == false) {
      this.setData({
        openAttr: !this.data.openAttr
      });
    }
  },
  //关闭规格窗口
  closeAttr: function() {
    this.setData({
      openAttr: false,
    });
  },
  
  //跳转到购物车
  openCartPage: function() {
    if(this.data.integral=true){
      wx.showToast({
        title: '该商品不能加入购物车',
        icon:"none",
        duration:1000
      })
    }else{
      wx.switchTab({
        url: '/pages/cart/cart'
      });
    }
    
  },

  onReady: function() {
    // 页面渲染完成

  }

})