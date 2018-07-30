// pages/bookStore/bookStore.js
var firstPage = require('../../data/bookStore.js');
Page({
  data: {
    swiperImage: [
      '/images/bookStore/swiper1.jpg',
      '/images/bookStore/swiper2.jpg',
      '/images/bookStore/swiper3.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    sort: firstPage.sort,
    book: firstPage.book
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成
  },
  tapBook: function (event) {
    var bookItemObject = event.currentTarget.dataset.bookItem;
    var bookItemJson=JSON.stringify(bookItemObject);
    console.log(bookItemJson);
    wx.navigateTo({
      url: '/pages/bookStore/bookItem/bookItem?bookItem='+bookItemJson
    })
  },
  tapSortMore:function(){
    wx.navigateTo({
      url: '/pages/bookStore/bookSortMore/bookSortMore'
    })
  },
  tapBookMore:function(){
    wx.navigateTo({
      url: '/pages/bookStore/bookMore/bookMore'
    })
  }
})