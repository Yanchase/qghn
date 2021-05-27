// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['全部', '待付款', "待收货", "已完成"],
    currentTab: 0,
    index: 0,
    pick_name: "",
    list: [{
        bianhao: "3124356568797697978",
        start: "已发货",
        arry: [{
            name: "轻奢纯棉刺绣水洗四件套",
            image: "/image/cart/cart1.jpg",
            money: "999",
          },
          {
            name: "轻奢纯棉刺绣水洗四件套",
            image: "/image/cart/cart2.jpg",
            money: "1099",
          },
        ],
        cont_count: "2",
        count_money: "2098",
      },
 
    ],
 
  },
 
  // 初始化加载
  onLoad: function() {
    var that = this;
 
  },
 
 
  //顶部tab切换
  navbarTap: function(e) {
    this.setData({
      currentTab: e.currentTarget.dataset.index
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