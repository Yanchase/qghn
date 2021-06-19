// pages/live/live.js
Page({
  data: {
    roomId: [],
    customParams: NaN,
  },
  onLoad(e) {
    let roomId = [200]
    let customParams = encodeURIComponent(JSON.stringify({ path: 'pages/index/index', pid: 1 }))
    this.setData({
      roomId,
      customParams
    })
  },
  onClickRight(e) {
    wx.navigateTo({
      url: '../rvideos/rvideos',
    })
  }
})