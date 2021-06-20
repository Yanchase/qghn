// 设置全局变量token
var app = getApp();

Page({

  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
  },

  onLoad() {    
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  
  getUserProfile(e) {
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })

        //获取token
        wx.login
        ({
          success:function(res){
          var code = res.code;
          wx.request({
            url: "http://www.ytalk.shop:8083/qghn/user/login_by_weixin?code=" + code,
            method: "POST",
            success: function(res) {
              //设置全局token
              app.globalData.token=res.data.token
              console.log(app.globalData.token)
            }
          })
      
          }    
        })
      }
    })
  },


})