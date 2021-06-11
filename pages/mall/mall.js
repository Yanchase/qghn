// pages/mall/mall.js
var util = require('../../utils/util.js')
var api = require('../../config/api.js');

var app = getApp();

Page({

  data: {
    //搜索框的值控制变量
    value:"",
    stuff_types: [{
      type:"全部"
    }, {
      type:"海南特产"
    }, {
      type:"文体活动"
    }, {
      type:"玩乐专区"
    }, {
      type:"竞猜游戏"
    }, {
      type:"本地美食"
    }],
    stuffs:[],
    isEmpty: false,
    title:'',
  },

  onShow(e) {
    this.getGoods(e);
  },

  onClick: function (e) {
    wx.navigateTo({
      url: '../search/search'
    })
  },

  onChange: function (e) {
    this.setData({
      title: e.detail.title
    })
    this.onShow(e)
    this.setData({
      isEmpty: (this.data.stuffs.length == 0)
    })
  },

  getGoods: function(e) {
    let that = this;
    util.request(api.GoodList).then(function(res) {
      if (res.msg == "success") {
        that.setData({
          stuffs: res.data
        })
      }
    });
  },
})