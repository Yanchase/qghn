var api = require('../config/api.js');
var app = getApp();

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

// 封装微信request
function request(url, data = {}, method = "GET") {
  return new Promise(function(resolve, reject) {
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        'Content-Type': 'application/json',
        'X-Token': wx.getStorageSync('token')
      },
      success: function(res) {

        if (res.statusCode == 200) {

          if (res.data.errno == 501) {
            // 清除登录相关内容
            try {
              wx.removeStorageSync('userInfo');
              wx.removeStorageSync('token');
            } catch (e) {
              // Do something when catch error
            }
            // 切换到登录页面
            wx.navigateTo({
              url: '/pages/login/login'
            });
          } else {
            resolve(res.data);
          }
        } else {
          reject(res.errMsg);
        }

      },
      fail: function(err) {
        reject(err)
      }
    })
  });
}

// 封装post请求
function requestp (url, data, method = "POST") {
  var promise = new Promise(function (resolve, reject) {
    //网络请求
    wx.request({
      url: url,
      data:data,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'token':wx.getStorageSync('token')
      },
      method: method,
      success: function (res) {//服务器返回数据
        if (res.statusCode == 200) {
          resolve(res.data);
        } else {//返回错误提示信息
          reject(res.data);
        }
      },
      fail: function (e) {
        reject(e);
      }
    })
  });
  return promise;
}


function deleteAdd (url, data, method = "POST") {
  var promise = new Promise(function (resolve, reject) {
    //网络请求
    wx.request({
      url: url+"?UserId="+data.UserId+"&adressId="+data.addressId,
      header: {
        'token':wx.getStorageSync('token')
      },
      method: method,
      success: function (res) {//服务器返回数据
        if (res.statusCode == 200) {
          resolve(res.data);
        } else {//返回错误提示信息
          reject(res.data);
        }
      },
      fail: function (e) {
        reject(e);
      }
    })
  });
  return promise;
}

//判断页面是否需要登录
function redirect(url) {
  if (false) {
    wx.redirectTo({
      url: '/pages/login/login'
    });
    return false;
  } else {
    wx.redirectTo({
      url: url
    });
  }
}

function showErrorToast(msg) {
  wx.showToast({
    title: msg,
    image: '/image/Error.png'
  })
}
//获取订单
function GetOrder(url,data){
  var promise = new Promise(function (resolve, reject) {
  //网络请求
  wx.request({
    url: url,
    data: data,
    header: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'token':wx.getStorageSync('token')
    },
    method: "GET",
    success: function (res) {//服务器返回数据
      if (res.statusCode == 200) {
        resolve(res.data);
      } else {//返回错误提示信息
        reject(res.data);
      }
    },
    fail: function (e) {
      reject(e);
    }
  })
  });
  return promise;
}

//获取订单详情
function GetOrderDetail(url,data){
  var promise = new Promise(function (resolve, reject) {
  //网络请求
  wx.request({
    url: url,
    data: data,
    header: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'token':wx.getStorageSync('token')
    },
    method: "GET",
    success: function (res) {//服务器返回数据
      if (res.statusCode == 200) {
        resolve(res.data);
      } else {//返回错误提示信息
        reject(res.data);
      }
    },
    fail: function (e) {
      reject(e);
    }
  })
  });
  return promise;
}

//获取收货地址
function GetAddress(url,data){
  var promise = new Promise(function (resolve, reject) {
  //网络请求
  wx.request({
    url: url,
    data: data,
    header: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'token':wx.getStorageSync('token')
    },
    method: "GET",
    success: function (res) {//服务器返回数据
      if (res.statusCode == 200) {
        resolve(res.data);
      } else {//返回错误提示信息
        reject(res.data);
      }
    },
    fail: function (e) {
      reject(e);
    }
  })
  });
  return promise;
}

//添加收货地址
function addAddress(url,data){
  var promise = new Promise(function (resolve, reject) {
  //网络请求
  wx.request({
    url: url+"?UserId="+data.UserId,
    data: JSON.stringify(data.address) ,
    header: {
      'token':wx.getStorageSync('token')
    },
    method: "POST",
    success: function (res) {//服务器返回数据
      if (res.statusCode == 200) {
        resolve(res.data);
      } else {//返回错误提示信息
        reject(res.data);
      }
    },
    fail: function (e) {
      reject(e);
    }
  })
  });
  return promise;
}

//添加收货地址
function GetOneAddress(url,data){
  var promise = new Promise(function (resolve, reject) {
  //网络请求
  wx.request({
    url: url,
    data: data ,
    header: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'token':wx.getStorageSync('token')
    },
    method: "GET",
    success: function (res) {//服务器返回数据
      if (res.statusCode == 200) {
        resolve(res.data);
      } else {//返回错误提示信息
        reject(res.data);
      }
    },
    fail: function (e) {
      reject(e);
    }
  })
  });
  return promise;
}

// post请求添加到购物车
function updateCart (url, data, method = "POST") {
  var promise = new Promise(function (resolve, reject) {
    //网络请求
    wx.request({
      url: url+"?UserId="+data.UserId,
      data:JSON.stringify(data.cartCheckedVos),
      header: {
        'token':wx.getStorageSync('token')
      },
      method: method,
      success: function (res) {//服务器返回数据
        if (res.statusCode == 200) {
          resolve(res.data);
        } else {//返回错误提示信息
          reject(res.data);
        }
      },
      fail: function (e) {
        reject(e);
      }
    })
  });
  return promise;
}

module.exports = {
  formatTime,
  request,
  requestp,
  deleteAdd,
  redirect,
  showErrorToast,
  GetOrder,
  GetOrderDetail,
  GetAddress,
  addAddress,
  GetOneAddress,
  updateCart,
}
