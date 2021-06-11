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
  },
  onLoad(e) {
    let vs = this.selectComponent("#v-search")
    console.log(vs)
  },
  onShow(e) {
    if (this.data.value != '') {
      this.getGoods(e, this.data.value);
    }
  },
  //点击搜索或确认之后执行
  onSearch: function (e) {
    this.onShow(e)
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
  },

  getGoods: function(e, name, category) {
    let that = this;
    let conditions = [];
    let quest = '';
    if (name != '') {
      conditions.push("name="+name)
    }
    /*if (category != '全部') {
      conditions.push()
    }*/
    if (conditions.length != 0) {
      quest = "?"+conditions.join('')
    }
    util.request(api.GoodList+quest).then(function(res) {
      if (res.msg == "success") {
        that.setData({
          stuffs: res.data
        })
      }
    });
  },
})