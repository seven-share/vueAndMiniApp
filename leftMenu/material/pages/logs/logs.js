//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    
  },
  onLoad: function () {

  },
  backBtn:function(e){
    wx.navigateBack({
      delta: 1
    })
  }
})
