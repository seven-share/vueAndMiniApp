// pages/slideCard/slideCard.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animationData1: {},
    animationData2: {},
    topPos1: 120,
    leftPos1: 42,
    topPos2: 120,
    leftPos2: 42,
    isShow: true,
    startX: 0,
    startY: 0,
    windowWidth:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowWidth:res.windowWidth
        })
      }
    });
    console.log(options)
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

  touchS1: function (event) {
    var pointXData = event.touches[0].clientX;
    var pointYData = event.touches[0].clientY;
    this.setData({
      startX: pointXData,
      startY: pointYData
    })
  },
  touchM1: function (event) {
    var pointXData = event.touches[0].clientX;
    var pointYData = event.touches[0].clientY;
    var widthMiddle=this.data.windowWidth/2

    var perX = Math.abs(pointXData - widthMiddle) / widthMiddle
    var perY = Math.abs(pointYData - 575) / 575


    if (perY > perX) {
      this.showBottom2(perY)
    } else {
      this.showBottom2(perX)
    }



    var XData = pointXData * 2 - 332;
    var YData = pointYData * 2 - 475;

    this.setData({
      leftPos1: XData,
      topPos1: YData
    })
  },
  touchE1: function (event) {
    var endXData = event.changedTouches[0].clientX;
    var endYData = event.changedTouches[0].clientY;
    var disX = endXData - this.data.startX;
    var disY = endYData - this.data.startY
    console.log(disX)


    if (disX > 93.75) {
      this.moveXBox('right')
    }
    if (disX < -93.75) {
      this.moveXBox('left')
    }
    if (disY < -150) {
      this.moveXBox('up')
    }
    if (disY > 150) {
      this.moveXBox('down')
    }

    if (disX < 93.75 && disX > -93.75 && disY > -150 && disY < 150) {
      this.replace1()
    }



  },
  moveXBox: function (direction) {
    var animation = wx.createAnimation({
      duration: 250,
      timingFunction: 'linear',
    })
    if (direction == 'right') {
      animation.translateX(400).rotate(45).opacity(0).step();
      animation.translateX(0).rotate(0).step();
    }
    if (direction == 'left') {
      animation.translateX(-400).rotate(-45).opacity(0).step();
      animation.translateX(0).rotate(0).step();
    }
    if (direction == 'up') {
      animation.translateY(-400).opacity(0).step();
      animation.translateY(0).step();
    }
    if (direction == 'down') {
      animation.translateY(400).opacity(0).step();
      animation.translateY(0).step();
    }

    this.setData({
      animationData1: animation.export(),
      isShow: false
    })
    setTimeout(function () {
      this.setData({
        topPos1: 120,
        leftPos1: 42
      })
    }.bind(this), 500)
  },
  replace1: function () {
    this.setData({
      topPos1: 120,
      leftPos1: 42
    })
  },
  showBottom1: function (per) {
    var animation = wx.createAnimation({
      duration: 100,
      timingFunction: 'ease-out',
    })
    animation.opacity(per).step();
    this.setData({
      animationData1: animation.export()
    })
  },



  touchS2: function (event) {
    var pointXData = event.touches[0].clientX;
    var pointYData = event.touches[0].clientY;
    this.setData({
      startX: pointXData,
      startY: pointYData
    })
  },
  touchM2: function (event) {
    var pointXData = event.touches[0].clientX;
    var pointYData = event.touches[0].clientY;
    var widthMiddle = this.data.windowWidth / 2

    var perX = Math.abs(pointXData - widthMiddle) / widthMiddle
    var perY = Math.abs(pointYData - 575) / 575

    if (perY > perX) {
      this.showBottom1(perY)
    } else {
      this.showBottom1(perY)
    }

    var XData = pointXData * 2 - 332;
    var YData = pointYData * 2 - 475;
    this.setData({
      leftPos2: XData,
      topPos2: YData
    })
  },
  touchE2: function (event) {
    var endXData = event.changedTouches[0].clientX;
    var endYData = event.changedTouches[0].clientY;

    var disX = endXData - this.data.startX;
    var disY = endYData - this.data.startY
    console.log(disX)


    if (disX > 93.75) {
      this.moveXBox('right')
    }
    if (disX < -93.75) {
      this.moveXBox('left')
    }
    if (disY < -150) {
      this.moveXBox('up')
    }
    if (disY > 150) {
      this.moveXBox('down')
    }

    if (disX < 93.75 && disX > -93.75 && disY > -150 && disY < 150) {
      this.replace2()
    }
  },
  replace2: function () {
    this.setData({
      topPos2: 120,
      leftPos2: 42
    })
  },
  showBottom2: function (per) {
    var animation = wx.createAnimation({
      duration: 100,
      timingFunction: 'ease-out',
    })
    animation.opacity(per).step();
    this.setData({
      animationData2: animation.export()
    })
  }

})