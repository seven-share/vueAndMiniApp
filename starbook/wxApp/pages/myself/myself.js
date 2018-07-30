// pages/myself/myself.js
var app = getApp();
Page({
  data: {},
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      avatarUrl: app.globalData.userInfo.avatarUrl,
      nickName: app.globalData.userInfo.nickName
    })
  },
  tapBook: function () {
    wx.navigateTo({
      url: '/pages/myself/book/book'
    })
  },
  tapMyFeel: function () {
    wx.navigateTo({
      url: '/pages/myself/myFeel/myFeel'
    })
  },
  tapBookTime: function () {
    wx.navigateTo({
      url: '/pages/myself/bookTime/bookTime'
    })
  },
  tapMyTip: function () {
    wx.navigateTo({
      url: '/pages/myself/myTip/myTip'
    })
  },
  tapAboutUs: function () {
    wx.navigateTo({
      url: '/pages/myself/aboutUs/aboutUs'
    })
  }
})