var util = require('../../utils/util.js');
var api = require('../../config/api.js');

var app = getApp();

Page({
  data: {
    checkedCartList: [],
    checkedAddress: {},
    // availableCouponLength: 0, // 可用的优惠券数量
    goodsTotalPrice: 0.00, //商品总价
    freightPrice: 0.00, //快递费
    // couponPrice: 0.00, //优惠券的价格
    // grouponPrice: 0.00, //团购优惠价格
    orderTotalPrice: 0.00, //订单总价
    actualPrice: 0.00, //实际需要支付的总价
    cartId: 0,
    addressId: 0,
    couponId: 0,
    userCouponId: 0,
    message: '',
    fromCart:true,
    gkind:0,    //商品类型：目录：1.积分购买，2.积分兑换
    // grouponLinkId: 0, //参与的团购
    // grouponRulesId: 0 //团购规则ID
  },

  onLoad: function (options) {

    wx.showLoading({
      title: '加载中...',
      mask:true
    })
    //获取地址
    this.getAddress();
    // 页面初始化 options为页面跳转所带来的参数数组
    var temcartId=JSON.parse(options.cartId)

    //大于零表示从购物车跳转到此页面
    if(temcartId.length>0){

      let cartId = temcartId;
      console.log(cartId);

      this.getMoreCart(cartId);
    //小于零表示从商品详情跳转而来
    }else{
      let temcart=[];
      temcart.push(wx.getStorageSync('cart'))
      console.log(temcart);
      this.setData({
        checkedCartList:temcart,
        fromCart:false,
        gkind:options.gkind
      })
      this.calAllPrice();
    }


  },

  //获取购物车商品，结算购物车
  getMoreCart: function(cartId){
    util.requestp(api.GetMoreCart,{
      UserId:3,
      carIds:cartId
    }).then(res=>{
      console.log(res)
      //调整部分属性名
      res.data.forEach(function(element, index, array){
        res.data[index].name=element.goodsName;
        res.data[index].retailPrice=element.price;
      });
      console.log(res.data);
      this.setData({
        checkedCartList :res.data,
        cartId:cartId
      })
      this.calAllPrice();
    })
  },

  //计算订单总价
  calAllPrice: function(){
    
    let goodsTotalPrice=this.data.goodsTotalPrice,actualPrice=this.data.actualPrice;
    this.data.checkedCartList.forEach(function(element, index, array){

      console.log(element);
      if(element.counterPrice==undefined || element.counterPrice==0 || element.counterPrice==null){
        goodsTotalPrice=goodsTotalPrice+(element.retailPrice)*(element.number);
      }else{
        goodsTotalPrice=goodsTotalPrice+(element.counterPrice)*(element.number);
      }
      
      actualPrice=actualPrice+(element.retailPrice)*(element.number)
    })

    console.log(goodsTotalPrice+actualPrice);
    this.setData({
      goodsTotalPrice:goodsTotalPrice,
      actualPrice:actualPrice
    })

    wx.hideLoading();
  },


  //获取地址
  getAddress: function(){

    let temAddress=wx.getStorageSync('checkedAddress');

    console.log(temAddress);
    if(temAddress!=""){
      this.setData({
        checkedAddress:temAddress
      })
      return;
    }else{
      util.request(api.GetAddress,{
        UserId:3
      }).then(res=>{

        var that= this;
        console.log(res);
        res.data.forEach(function (element, index, array) {
          if (element.isDefault == true) {
            that.setData({
              checkedAddress:element,
              addressId:element.id
            })
          }
        });

      })
    }


    
  },

  //重新选择地址
  selectAddress() {
    wx.navigateTo({
      url: '/pages/address/address',
    })
  },

  // //选择优惠卷
  // selectCoupon() {
  //   wx.navigateTo({
  //     url: '/pages/ucenter/couponSelect/couponSelect',
  //   })
  // },

  //填写信息
  bindMessageInput: function (e) {
    this.setData({
      message: e.detail.value
    });
  },

  onReady: function () {
    // 页面渲染完成

  },

  onShow: function () {
    
   
  },

  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭

  },

  //提交订单
  submitOrder: function () {

    if (this.data.addressId <= 0) {
      util.showErrorToast('请选择收货地址');
      return false;
    }

    var url=null, app=this.data;
    var data={};

    //根据跳转到订单页面的原页面，执行不同的请求
    if(this.data.fromCart==true){
      url=api.OrderSubmit;
      data={
        cartId:app.cartId,
        userId:3,
        addressId:app.addressId,
        message:app.message
      }
    //商品详情页
    }else{
      url=api.OrderOneSubmit;
      if(app.gkind==1){
        url=api.OrderBSubmit
      }else if(app.gkind==2){
        url=api.OrderCSubmit
      }
      data={
        addressId:app.addressId,
        goodId:app.checkedCartList[0].id,
        message:app.message,
        number:app.checkedCartList[0].number,
        productId:app.checkedCartList[0].productId,
        userId:3,
      }
    }
    util.requestp(url, data, 'POST').then(res => {
      console.log(res);
      if (res.code === 0) {

        const orderId = res.data.orderId;
        console.log(orderId);
        var that=app;

        util.requestp(api.OrderPrepay, {
          orderId:orderId,
          userId:3
        }, 'POST').then(function (res) {
          console.log(res);
          if (res.code === 0) {

            wx.showToast({
              title:"支付成功",
              icon:"success",
              duration:1500
            });
            setTimeout(function(){
               if(that.fromCart==true){
                wx.switchTab({
                  url: '/pages/cart/cart',
                })
                
              }else{
                
                wx.switchTab({
                  url: '/pages/mall/mall',
                })
              }
            },1000);
             
            // const payParam = res.data;
            // console.log("支付过程开始");
            // wx.requestPayment({
            //   'timeStamp': payParam.timeStamp,
            //   'nonceStr': payParam.nonceStr,
            //   'package': payParam.packageValue,
            //   'signType': payParam.signType,
            //   'paySign': payParam.paySign,
            //   'success': function (res) {
            //     console.log("支付过程成功");
            //     if (grouponLinkId) {
            //       setTimeout(() => {
            //         wx.redirectTo({
            //           url: '/pages/groupon/grouponDetail/grouponDetail?id=' + grouponLinkId
            //         })
            //       }, 1000);
            //     } else {
            //       wx.redirectTo({
            //         url: '/pages/payResult/payResult?status=1&orderId=' + orderId
            //       });
            //     }
            //   },
            //   'fail': function (res) {
            //     console.log("支付过程失败");
            //     wx.redirectTo({
            //       url: '/pages/payResult/payResult?status=0&orderId=' + orderId
            //     });
            //   },
            //   'complete': function (res) {
            //     console.log("支付过程结束")
            //   }
            // });
          } else {
            wx.redirectTo({
              url: '/pages/payResult/payResult?status=0&orderId=' + orderId
            });
          }
        });

      } else {
        util.showErrorToast(res.errmsg);
      }
    });
  }

});