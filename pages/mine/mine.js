// pages/mine/mine.js
Page({

  data: {
<<<<<<< Updated upstream
    userinfo:{},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName')
=======
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
>>>>>>> Stashed changes
  },
  
  getUserProfile(e) {
<<<<<<< Updated upstream
=======
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
>>>>>>> Stashed changes
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
<<<<<<< Updated upstream
  onShow()
  {
    const userinfo=wx.getStorageSync("userinfo");
    console.log(userinfo)
    this.setData({userinfo});
  }
=======



>>>>>>> Stashed changes

})