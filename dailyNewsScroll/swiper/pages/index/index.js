// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbarArray: [
      {
        text: '推荐',
        tabActive: true
      }, 
      {
        text: '热点',
        tabActive: false
      }, 
      {
        text: '视频',
        tabActive: false
      }, 
      {
        text: '图片',
        tabActive: false
      }, 
      {
        text: '段子',
        tabActive: false
      }, 
      {
        text: '社会',
        tabActive: false
      }, 
      {
        text: '娱乐',
        tabActive: false
      }, 
      {
        text: '科技',
        tabActive: false
      },
      {
        text: '体育',
        tabActive: false
      }
    ],
    currentTab:0,
    leftDistance:0,
    screenWidth: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    wx.getSystemInfo({
      success: function(res) {
        that.setData({screenWidth : res.windowWidth})
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  switchText:function(event){
    this.setData({ currentTab: event.currentTarget.dataset.index });
    this.activeTab(this.data.currentTab)
  },


  activeTab:function(index){
    var navbarArrayData = this.data.navbarArray
    for (var i in navbarArrayData) {
      if (i == index) {
        navbarArrayData[i].tabActive = true;
      } else {
        navbarArrayData[i].tabActive = false
      }
    }
    
    this.setData({
      navbarArray: navbarArrayData
    })

    var that=this
    wx.createSelectorQuery().selectAll('.active').boundingClientRect(function (res) {
      var left=res[0].left
      if (left > that.data.screenWidth-60){
        var leftDistanceData = that.data.leftDistance+60;
        that.setData({
         leftDistance: leftDistanceData
        })
      }
      if (left < 0){
        var leftDistanceData = that.data.leftDistance - 60;
        that.setData({
          leftDistance: leftDistanceData
        })
      }

    }).exec()
  },

  bindChange:function(event){
    this.setData({ currentTab: event.detail.current})
    this.activeTab(this.data.currentTab)
  }
})