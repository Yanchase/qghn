var util = require('../../utils/util.js');
var api = require('../../config/api.js');

var app = getApp();

Page({
  data: {
      name:'',
      phone:'',
      moreInfo:''

  },
  AddPartner: function() {
    console.log()
    util.requestp(api.AddPartner,{partnerInfo: this.partnerInfo},"POST").then(function(res) {
      console.log(res)
    })
  }
})