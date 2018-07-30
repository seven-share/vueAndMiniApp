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
    leftConDis:0,
    screenWidth: 0,
    startX:0
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
    this.moveTogether()
    
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

    // if(index>=4){
    //   var leftDistanceData = (index-4)*60;
    //   this.setData({
    //     leftDistance: leftDistanceData
    //   })
    // }
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

  handletouchtart: function (event) {
    this.setData({
      startX: event.touches[0].clientX
    })
  },

  handletouchmove: function (event) {
    // console.log(event)
    let currentX = event.changedTouches[0].clientX

    if (Math.abs((currentX - this.data.startX)) > 50){
      if ((currentX - this.data.startX)<0){
        if (this.data.currentTab < (this.data.navbarArray.length-1)){
          var currentTabData = this.data.currentTab+1
          this.setData({ currentTab:currentTabData})
          this.moveTogether()
        }
      }
      if ((currentX - this.data.startX) > 0){
        if (this.data.currentTab >0) {
          var currentTabData = this.data.currentTab - 1
          this.setData({ currentTab: currentTabData })
          this.moveTogether()
        }
      }
    }else{
      this.moveTogether()
    }
  },
  moveContent:function(index){
    var left = this.data.screenWidth*index;
    this.setData({ leftConDis:left})
  },
  moveTogether:function(){
    this.moveContent(this.data.currentTab)
    this.activeTab(this.data.currentTab)
  }
})