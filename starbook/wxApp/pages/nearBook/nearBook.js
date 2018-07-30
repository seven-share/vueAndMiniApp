// pages/nearBook/nearBook.js
var nearBook = require('../../data/nearBook.js');
Page({
  data: {},
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      nearBook
    });
  },
  onReady: function () {
    // 页面渲染完成
  },
  tapPerson: function (event) {
    var personItemObject = event.currentTarget.dataset.personItem;
    var personItemJson = JSON.stringify(personItemObject);
    console.log(personItemJson);
    wx.navigateTo({
      url: '/pages/nearBook/nearBookList/nearBookList?personItem=' + personItemJson
    })
  }
})