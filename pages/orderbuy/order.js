const util = require("../../utils/util");
const api = require("../../config/api");

// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['全部', '待付款', "待收货", "已完成"],
    orderStatus:[0,102,201,301],
    currentTab: 0,
    chooseStatus:0,
    index: 0,
    pick_name: "",
    list: [],
    page: 1,
  },
 
  // 初始化加载
  onLoad: function() {
    var that = this;
 
  },
 
 
  //顶部tab切换
  navbarTap: function(e) {
    this.setData({
      currentTab: e.currentTarget.dataset.index,
      chooseStatus:this.data.orderStatus[e.currentTarget.dataset.index]
    })
  },

  //前往订单详情页面
  getOrderDetail: function(option){
    console.log(option.currentTarget.dataset["index"]);
    const orderId=option.currentTarget.dataset["index"];
    wx.navigateTo({
      url: '../orderbuydetail/orderdetail?orderId='+orderId,
    })
  },

  //触底加载
  onReachBottom: function() {
    this.data.page += 1
    let page = this.data.page
    this.getOrders(page)
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
    this.data.page = 1
    this.data.list = []
    this.getOrders(this.data.page)
  },

  getOrders (page) {
    let that = this
    util.GetOrder(api.GetBOrder,{
      page,
      userId: 3
    }).then(res=>{
      console.log(res);
      if (res.code == 0) {
        try {
          let list = that.data.list.concat(res.data)
          this.setData({
            list
          })
        } catch (e) {}

      } else {
        util.showErrorToast(res.msg);
      }
    })
  },

  //取消订单
  cancelOrder: function(option){
    console.log(option);
    var order=this.data.list[option.currentTarget.dataset["index"]]
    if(order.orderStatus==103){
      wx.showToast({
        title: '该订单已取消',
        icon:"error",
        duration:100
      })
    }else{
      util.requestp(api.CancelBOrder,{
        userId:3,
        orderId:order.id
      }).then(res=>{
        wx.showToast({
          title: '取消成功',
          icon:"success",
          duration:100
        }).then(res=>{
          this.onLoad();
        })
      })
    }
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})