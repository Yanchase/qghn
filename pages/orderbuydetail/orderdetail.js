// pages/orderdetail/orderdetail.js
const util = require("../../utils/util");
const api = require("../../config/api");


Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null,
    "orderGoods": [],
  },

  //取消订单
  cancelOrder: function(option){
    console.log(option);
    var order=this.data.orderGoods[option.currentTarget.dataset["index"]]
    if(this.data.order.orderStatus==103){
      wx.showToast({
        title: '该订单已取消',
        icon:"error",
        duration:100
      })
    }else{
      util.requestp(api.CancelBOrder,{
        userId:3,
        orderId:order.id
      }).then(res=>{
        wx.showToast({
          title: '取消成功',
          icon:"success",
          duration:100
        }).then(res=>{
          this.onLoad();
        })
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orderId:options.orderId,
      userInfo:getApp().globalData.userInfo
    })
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    util.request(api.GetBOrderDetail,{
      orderId:this.data.orderId,
      userId: 3
    }).then(res=>{
      console.log(res);
      if (res.code == 0) {
        try {
          
          this.setData({
            orderGoods:res.data.orderGoods,
            order:res.data.order
          })
        } catch (e) {}

      } else {
        util.showErrorToast(res.msg);
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})