var util = require('./utils/util.js');
var api = require('./config/api.js');
// app.js
App({
  onLaunch() {
    console.log(this.globalData)
    var that=this;
    //获取token
    wx.login
    ({
      success:function(res){
      var code = res.code;
      //调试代码
      console.log(res);
      var context = that;
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
      wx.request({
        url: "http://www.ytalk.shop:8083/qghn/user/login_by_weixin?code=" + code,
        method: "POST",
        success: function(res) {
          //设置全局token/openid/userinfo
          
          context.globalData.Token=res.data.token;
          context.globalData.openId=res.data.openId;
          // context.globalData.userInfo=res.data.userInfo;
          //暂用存储用户信息
          if(wx.getStorageSync("userInfo")!=null){
            
            context.globalData.userInfo=wx.getStorageSync("userInfo")

          }
          
          console.log(context.globalData);
          wx.setStorage({
            key:"token",
            data: res.data.token
          })
        }
      })
  
      }    
    })
  },
  
  globalData: {
    userInfo: null,
    openId:'',
    Token:null
  }
})

