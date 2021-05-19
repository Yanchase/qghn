// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    active: 0,
  },
   onChange(event) {
    var index = event.detail

    if (index == 0) {
      that.data.active = 0
    }
    else if (index == 1) {
      wx.navigateTo({
        url: '../mall/mall',
      })
    } 
    else if (index == 2) {
      wx.navigateTo({
        url: '../live/live',
      })
    } 
    else if (index == 3) {
      wx.navigateTo({
        url: '../cart/cart',
      })
    } 
    else if (index == 4) {
      wx.redirectTo({
        url: '../mine/mine',
      })
    }
    this.setData({
      active: that.data.active
    });
  },
});
