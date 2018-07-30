// pages/more/shareBook/shareBook.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var isbn = options.isbn;
    var that = this;
    wx.request({
      url: 'https://api.douban.com/v2/book/isbn/' + isbn + '?fields=images,title,author,publisher',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data);
        var bookMessage = {
          image: res.data.images.large,
          title: res.data.title,
          author: res.data.author[0],
          publisher: res.data.publisher
        }
        that.setData({
          bookMessage
        })

      }
    })
  },
  shareConfirm:function(){

    wx.showToast({
      title: '分享成功',
      icon: 'success',
      duration: 4000,
      success:function(){
        wx.switchTab({
          url: '/pages/more/more'
        });
      }
    })
   

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  }
})