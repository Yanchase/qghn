// pages/mall/mall.js
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
    stuffs_all: [{
      img:"/image/mall/mall1.jpg",
      tag:"小猫咪活物英短蓝猫幼猫蓝白猫英短金银渐层布偶猫幼猫矮脚美短猫",
      price:9.9,
      sale:9,
      url:""
    }, {
      img:"/image/mall/mall2.jpg",
      tag:"JLINDEBERG金林德伯格夏季商务休闲弹性poloshirt翻领t恤男短袖",
      price:654.0,
      sale:4,
      url:""
    }],
    isEmpty: false,
  },

  onLoad(e) {
    this.setData({
      stuffs: this.data.stuffs_all,//这里后面也要换成访问数据库
    })
  },

  onClick: function (e) {
    wx.navigateTo({
      url: '../search/search'
    })
  },

  onChange: function (e) {
    if (e.detail.title == "全部") {
      this.setData({
        stuffs: this.data.stuffs_all
      })
    }
    //通过e得到的标签访问数据库查询对应的商品
    else {
      this.setData({
        stuffs: []//后面这里要换成数据库访问的返回结果
      })
    }
    this.setData({
      isEmpty: (this.data.stuffs.length == 0)
    })
  }
})