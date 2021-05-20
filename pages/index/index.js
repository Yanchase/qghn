// index.js
// 获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList:[
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20161205%2F7f4cf70807bc4fcfb76356be2a947541_th.jpeg&refer=http%3A%2F%2Fimg.mp.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1624007866&t=c601ed68225ae0285cfd1992729232e7'
    ],
    picList:[
      "/image/grid/shangjia.png",
      "/image/grid/hehuo.png"
    ],
    hei:""
  },
  imgH: function (e) {
    let winWid = wx.getSystemInfoSync().windowWidth;         
    let imgh = e.detail.height;　　　　　　　　　　　　　　　
    let imgw = e.detail.width;
    let swiperH = winWid * imgh / imgw + "px"
    this.setData({
      hei: swiperH　　　　　　　　
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getTabBar().init();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})