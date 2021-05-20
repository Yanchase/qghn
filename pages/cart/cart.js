// pages/cart/cart.js
Page({
  //点击获取收获地址
  handleChooseAddress(){
    wx.chooseAddress({
      success: (result) => {
        console.log(result);
      }
    });
      
  }
})