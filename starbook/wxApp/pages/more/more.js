// pages/more/more.js
Page({
  data:{},
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
  shareBook: function () {
    wx.scanCode({
      success: function (res) {
        console.log("将带isbn数据跳转" + res.result);
        var isbn = res.result;
        // wx.showModal({
        //   title: '提示',
        //   content: isbn,
        //   success: function (res) {
        //     if (res.confirm) {
        //       console.log('用户点击确定')
        //     } else if (res.cancel) {
        //       console.log('用户点击取消')
        //     }
        //   }
        // })
        if (isbn) {
          wx.navigateTo({
            url: './shareBook/shareBook?isbn=' + isbn
          })
        }
      },
      fail: function (err) {
        console.log(err);
      }
    })
  },
  getBook:function(){
    wx.navigateTo({
      url: './getBook/getBook'
    })
  },

 shareFeel: function () {
    wx.navigateTo({
      url: './shareFeel/shareFeel'
    })
  }

})