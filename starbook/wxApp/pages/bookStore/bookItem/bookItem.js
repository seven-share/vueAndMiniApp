// pages/bookStore/bookItem/bookItem.js
Page({
  data: {},
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var bookItem = JSON.parse(options.bookItem);
    console.log(bookItem);
    this.setData({
      bookItem
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  borrow: function () {
    wx.showModal({
      title: '确认借阅',
      content: '加入借阅车，请选择完毕后，在个人页面一次性下单',
      success: function (res) {
        if (res.confirm) {
          wx.navigateBack();
        } else if (!res.cancel) {
          wx.showToast({
            title: '我再看看',
            icon: 'success',
            duration: 1000
          })
        }
      }
    })
  }
})