var util = require('./utils/util.js');
var api = require('./config/api.js');
// app.js
App({
  onLaunch() {
    // 登录
    wx.login({
      success: res => {
        console.log(res.code)
      }
    })
  },
  
  globalData: {
    userInfo: null,
<<<<<<< Updated upstream
    openId:''
  }
})
=======
    Token:null
}
})
>>>>>>> Stashed changes
