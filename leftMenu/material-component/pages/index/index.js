//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    hideDrawerFlag:true,
    animationData:{}
  },
  onLoad: function () {
  },
  showTry:function(e){
    console.log(e)
  },
  toLogs:function(e){
    wx.navigateTo({
      url: '/pages/logs/logs'
    })
    this.setData({
      hideDrawerFlag: true
    })
  }
})
