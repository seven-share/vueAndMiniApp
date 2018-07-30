// pages/more/getBook/getBook.js
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
  getBook:function(e){
    var id = e.detail.value.id;
    console.log(id);
    if(id==""){
      wx.showToast({
        title: '请输入图书ID',
        icon: 'loading',
        duration: 2000
      })
    }else{
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
      
    }
  }
 
})