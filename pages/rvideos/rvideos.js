// pages/rvideos/rvideos.js
var util = require('../../utils/util.js')
var api = require('../../config/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: "",
    page: 1,
    scroll_height: 0,
    isEmpty: false,
    videos:[],
    playingVideo: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    this.getVideos(e, "", 1)
    var windowWidth = wx.getSystemInfoSync().windowWidth;
    var windowHeight = wx.getSystemInfoSync().windowHeight;
    var scroll_height = 750 * windowHeight / windowWidth - 130;
    this.setData({
      scroll_height: scroll_height
    })
  },

  onSearch(e) {
    this.data.value = e.detail
    this.data.videos = []
    this.data.page = 1
    this.getVideos(e, e.detail, 1)
  },

  changeInputValue(e) {
    if (e.detail == "") {
      this.data.videos = []
      this.data.page = 1
      this.getVideos(e, "", 1)
    }
  },

  scrolltoLower: function(e) {
    this.data.page += 1;
    let page = this.data.page;
    this.getVideos(e, this.data.value, page);
  },

  onPlay(e) {
    let videoContext = wx.createVideoContext(e.currentTarget.id);
    let playingVideo = this.data.playingVideo;
    if (playingVideo != "") {
      playingVideo.pause()
    }
    this.data.playingVideo = videoContext;
  },

  onPause(e) {
    let videoContext = wx.createVideoContext(e.currentTarget.id);
    let playingViedo = this.data.playingVideo;
    if (videoContext == playingViedo) {
      this.data.playingVideo = ""
    }
  },

  getVideos: function (e, name, page) {
    let that = this;
    if (name != '') {
      var quest = "?name="+name+"&page="+page
    } else {
      var quest = "?page="+page
    }
    util.request(api.GetVideoList + quest).then(function (res) {
      if (res.msg == "success") {
        let videos = that.data.videos.concat(res.data)
        that.setData({
          videos,
          isEmpty: (videos.length == 0)
        })
      }
    });
  },
})