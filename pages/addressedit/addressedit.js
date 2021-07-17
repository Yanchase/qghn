// pages/myinfo/infoupdate/infoupdate.js
const util = require("../../utils/util");
const api = require("../../config/api");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // productInfo: {}
    
    
  },

  bindRegionChange: function (e) {  // picker值发生改变都会触发该方法
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      ['address.province']:e.detail.value[0],
      ['address.city']:e.detail.value[1],
      ['address.area']:e.detail.value[2], 
      
    })
  },

  //设为默认
  changeradio:function(){
    this.setData({
      ["address.isDefault"]:!this.data.address.isDefault,
    })
  },

  //更新详细信息
  toupdate:function(option){

    var address=option.detail.value
    console.log(option.detail.value);
    address.isDefault=this.data.address.isDefault;
    address.userId=3;
    address.deleted=false;
    
    wx.showModal({
      title:"提交",
      content:"确认修改地址",
      showCancel:true,
      success(res){
        if(res.confirm){

          wx.showLoading({
            title: '加载中...',
            mask:true,
          })
          var tem=address;
          console.log(tem);

          //云函数调用
          util.addAddress(api.UpdateAddress,{
            UserId:tem.userId,
            address:tem
          }).then(res=>{
            console.log(res);
            wx.hideLoading();

            wx.showToast({
              title: '修改成功',
              icon:"success",
              duration:1500
            })
            wx.redirectTo({
              url: '/pages/address/address',
            })
          })

         
        }
      }
    })
  },

  //更新详细信息
  deleteAdd:function(){

    var that=this;
    wx.showModal({
      title:"提交",
      content:"确认删除地址",
      showCancel:true,
      success(res){
        if(res.confirm){

          wx.showLoading({
            title: '加载中...',
            mask:true,
          })
          var tem=that.data.address;
          console.log(tem);

          //云函数调用
          util.deleteAdd(api.DeleteAddress,{
            UserId:3,
            addressId:tem.id
          }).then(res=>{
            console.log(res);
            wx.hideLoading();

            wx.showToast({
              title: '删除成功',
              icon:"success",
              duration:1500
            })
            wx.redirectTo({
              url: '/pages/address/address',
            })
          })

         
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.aid)
    util.GetOneAddress(api.GetOneAddress,{
      UserId:3,
      adressId:options.aid,
      UserId:3
    }).then(res=>{
      console.log(res);
      this.setData({
        address:res.data
      })
    })
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

    
    if(getApp().globalData.user==null){
      
      //调用云函数
      
      
    }else{
      this.setData({
        user:getApp().globalData.user,
      })
    }

    //解决返回地址qq、WeChat为空问题
    if(getApp().globalData.qqNumber!=null || getApp().globalData.wechatNumber!=null){
      this.setData({
        ['user.qqNumber']:getApp().globalData.qqNumber,
        ['user.wechatNumber']:getApp().globalData.wechatNumber,
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return{
      
    };
  }
})