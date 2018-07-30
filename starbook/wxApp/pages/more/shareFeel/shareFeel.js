// pages/more/shareFeel/shareFeel.js
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
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  shareFeel:function(e){
    var feel = e.detail.value.feel;
    console.log(feel);
    if (feel == "") {
      wx.showToast({
        title: '请输入你的心得',
        icon: 'loading',
        duration: 2000
      })
    } else {
      wx.showToast({
        title: '分享成功',
        icon: 'success',
        duration: 4000,
        success: function () {
          wx.switchTab({
            url: '/pages/more/more'
          });
        }
      })

    }
  }
})