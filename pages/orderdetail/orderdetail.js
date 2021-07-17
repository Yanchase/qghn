// pages/orderdetail/orderdetail.js
const util = require("../../utils/util");
const api = require("../../config/api");


Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null,
    "orderGoods": [
      {
        "id": 2,
        "orderId": 2,
        "goodsId": 1006002,
        "goodsName": "轻奢纯棉刺绣水洗四件套",
        "goodsSn": "1006002",
        "productId": 7,
        "number": 3,
        "price": 899,
        "specifications": "[\"标准\"]",
        "picUrl": "http://yanxuan.nosdn.127.net/8ab2d3287af0cefa2cc539e40600621d.png",
        "comment": 0,
        "addTime": "2021-06-04 02:39:20",
        "updateTime": "2021-06-04 02:39:20",
        "deleted": false
      }
    ],
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
    util.GetOrderDetail(api.GetOrderDetail,{
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