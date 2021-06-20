// pages/live/live.js
var util = require('../../utils/util.js')
var api = require('../../config/api.js');
Page({
  data: {
    roomId: [],
    customParams: NaN,
    video: {},
  },
  onLoad(e) {
    this.getVideo(e)
    let roomId = [200]
    let customParams = encodeURIComponent(JSON.stringify({
      path: 'pages/index/index',
      pid: 1
    }))
    this.setData({
      roomId,
      customParams
    })
  },
  onClickRight(e) {
    wx.navigateTo({
      url: '../rvideos/rvideos',
    })
  },
  getVideo(e) {
    var that = this;
    util.request(api.GetVideoList + "?limit=1").then(function (res) {
      if (res.msg == "success") {
        that.setData({
          video: res.data[0]
        })
      }
    });
  }
})