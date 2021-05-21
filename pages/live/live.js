// pages/live/live.js
Page({
  data:{
    videoUrl:"",
    orientation: 'vertical',
    transparent: false,
    pop: true,
    height: '440rpx',
    landscape: false,
    title: '',
    nav: true,
  }, 

  onLoad: function (options) {
    /*wx.request({
      method: 'post',
      url: "",
      data: {
	        room_id: roomid,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        if (res.data.status == 1) {
          that.setData({
            videoUrl: res.data.url,
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
        }
      }
    })*/
  },

  landscape(e) {
    let that = this
    let orientation = that.data.orientation == 'vertical' ? 'horizontal' : 'vertical'
    let height = that.data.height == '440rpx' ? '100%' : '440rpx'
    let landscape = that.data.landscape ? false : true
    let pop = that.data.pop ? false : true
    let isShow = that.data.isShow ? false : true
    let transparent = that.data.transparent ? true : false
    let nav = that.data.nav ? false : true

    // 全屏以及退出全屏
    let player = wx.createLivePlayerContext('player')
    if (orientation == 'horizontal') {
      player.requestFullScreen({})
    } else {
      player.exitFullScreen({})
    }

    that.setData({
      orientation: orientation,
      height: height,
      landscape: landscape,
      pop: pop,
      isShow: isShow,
      transparent: transparent,
      nav: nav,
      landscape_op: false
    })
  },
  // 关闭弹窗
  closePop() {
    let that = this
    that.setData({
      pop: false,
      landscape: false,
      transparent: true,
    })
  }
})