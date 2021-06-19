// pages/search/search.js
var util = require('../../utils/util.js')
var api = require('../../config/api.js');

var app = getApp();
Page({

  data: {
    //搜索框的值控制变量
    value:'',
    stuffs:[],
    isEmpty: false,
    page: 1,
  },
  onLoad(e) {
    var windowWidth = wx.getSystemInfoSync().windowWidth;
    var windowHeight = wx.getSystemInfoSync().windowHeight;
    var scroll_height = 750*windowHeight/windowWidth-100;
     this.setData({
        scroll_height:scroll_height
    })
  },
  scrolltoLower: function(e) {
    this.data.page += 1
    let page = this.data.page
    this.getGoods(e, this.data.value, page)
  },
  //点击搜索或确认之后执行
  onSearch: function (e) {
    this.data.stuffs = []
    if (this.data.value != '') {
      this.getGoods(e, this.data.value, 1);
    }
  },
  //点击取消按钮执行
  onCancel: function (e) {
    wx.navigateBack({
      delta: 0,
    })
  },
  //动态更新控制值value
  changeInputValue: function (e) {
    this.data.value = e.detail;
    if (e.detail == "") {
      this.setData({
        stuffs: []
      })
    }
  },

  getGoods: function(e, name, page) {
    let that = this;
    let quest = '';
    if (name != '') {
      quest = "?name="+name+"&page="+page
    }
    util.request(api.GoodList+quest).then(function(res) {
      if (res.msg == "success") {
        let stuffs = that.data.stuffs.concat(res.data)
        that.setData({
          stuffs,
        })
      }
    });
  },
})