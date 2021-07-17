// pages/mall/mall.js
var util = require('../../utils/util.js')
var api = require('../../config/api.js');

var app = getApp();

Page({

  data: {
    //搜索框的值控制变量
    value:"",
    stuff_types:[],
    stuffs:[],
    isEmpty: false,
    id:0,
    scroll_height:0,
    page:1,
  },

  onLoad(e) {
    this.getCategory(e);
    this.getGoods(e, 1);
    var windowWidth = wx.getSystemInfoSync().windowWidth;
    var windowHeight = wx.getSystemInfoSync().windowHeight;
    var scroll_height = 750*windowHeight/windowWidth-270;
     this.setData({
        scroll_height:scroll_height
    })
  },

  //前往搜索
  onClick: function (e) {
    wx.navigateTo({
      url: '../search/search'
    })
  },

  //更改栏目
  onChange: function (e) {
    let title = e.detail.title
    let types = this.data.stuff_types
    this.data.stuffs = []
    this.data.page = 1
    if (title == "全部") {
      this.getGoods(e, 1);
      this.setData({
        id: 0
      });
    }
    else {
      var x;
      for (x in types) {
        if (types[x].name == title) {
          let id = types[x].id
          //获取相应商品
          this.getGoodbyCategory(e, id, 1)
          this.setData({
            id
          });
        }
      }
    }
  },

  //触底翻页
  scrolltoLower: function(e) {
    this.data.page += 1
    let page = this.data.page
    let id = this.data.id
    if (id == "0") {
      this.getGoods(e, page)
    } else {
      this.getGoodbyCategory(e, id, page)
    }
  },

  //获取根目录
  getCategory: function(e) {
    var that = this;
    util.request(api.GetRootCate).then(function(res) {
      if (res.msg == "success") {
        let r = [{
          "id": 0,
          "name": "全部",
        }];
        r = r.concat(res.data)
        console.log(res);
        that.setData({
          stuff_types: r
        })
      }
    });
  },

  //获取商品
  getGoods: function(e, page) {
    let that = this;
    util.request(api.GoodList+"?page="+page).then(function(res) {
      if (res.msg == "success") {
        let stuffs = that.data.stuffs.concat(res.data)
        that.setData({
          stuffs,
          isEmpty: (stuffs.length == 0)
        })
      }
    });
  },

  //根据目录获取商品
  getGoodbyCategory: function(e, id, page) {
    let that = this;
    util.request(api.Goodlist+"/"+id+"?page="+page).then(function(res) {
      if (res.msg == "success") {
        let stuffs = that.data.stuffs.concat(res.data)
        that.setData({
          stuffs,
          isEmpty: (stuffs.length == 0)
        })
      }
    });
  },
})