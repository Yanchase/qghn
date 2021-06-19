Page({
  data: {

  },
  //登录
  login: function (e) {

  console.log(this)
  wx.login
  ({
    success:function(res){
    console.log(res)
    var code = res.code;
    wx.request({
      url: "http://www.ytalk.shop:8083/qghn/user/login_by_weixin?code=" + code,
      method: "POST",
      success: function(res) {
        console.log(res.data)
      }
    })

    }    
  })

  },
})

      
      //  success: function(result){
      //    console.log(result);
      //    //保存用户信息到本地缓存，可以用作小程序的拦截器
      //    App.setGlobalUserInfo(e.detail.userInfo);
      //    wx.redirectTo({
      //      url: '../personinfo/personinfo',
      //    })
      //  }