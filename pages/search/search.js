// pages/search/search.js
Page({

  data: {
    //搜索框的值控制变量
    value:""
  },
  //点击搜索或确认之后执行
  onSearch: function (e) {
    console.log("访问后端")
  },
  //点击取消按钮执行
  onCancel: function (e) {
    console.log("取消")
  },
  //动态更新控制值value
  changeInputValue: function (e) {
    this.data.value = e.detail;
  }
})