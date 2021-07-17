// 设置全局变量token
var app = getApp();

Page({

  data: {
    userInfo: {},
    hasUserInfo: true,
    canIUseGetUserProfile: false,
  },

  onLoad() {    
    
    if (app.globalData.userInfo==null) {
      console.log("onload被调用")
      this.setData({
        hasUserInfo: false
      })
    }
  },
  
  onShow(){
    this.setData({
      userInfo:wx.getStorageSync("userInfo")
    })
  },

  getUserProfile(e) {
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        getApp().globalData.userInfo=res.userInfo;
        wx.setStorage({
          data: res.userInfo,
          key: 'userInfo',
        })
      }
    })
  },


})