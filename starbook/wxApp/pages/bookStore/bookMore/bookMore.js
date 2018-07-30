// pages/bookStore/bookMore/bookMore.js
var firstPage = require('../../../data/bookStore.js');
Page({
  data:{
     book: firstPage.book
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  tapBook: function (event) {
    var bookItemObject = event.currentTarget.dataset.bookItem;
    var bookItemJson=JSON.stringify(bookItemObject);
    console.log(bookItemJson);
    wx.navigateTo({
      url: '/pages/bookStore/bookItem/bookItem?bookItem='+bookItemJson
    })
  },
  searchSubmit:function(e){
    console.log(e);
  }
})