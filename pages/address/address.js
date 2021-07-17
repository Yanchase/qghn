// pages/address/address.js
var app=getApp();
const util = require("../../utils/util");
const api = require("../../config/api");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    addressEdit:false
  },

  addAddress: function (params) {
    wx.navigateTo({
      url: '/pages/addressadd/addressadd',
    })
  },

  editAddress: function(option){

    console.log(option);

    wx.navigateTo({
      url: '/pages/addressedit/addressedit?aid='+option.currentTarget.dataset["aid"],
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.GetAddress(api.GetAddress,{
      UserId:3
    }).then(res=>{
      console.log(res);
      this.setData({
        addresslist:res.data
      })
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
    if(app.userInfo!=null){
      this.setData({
        userInfo:app.globalData.userInfo
      })
    }
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