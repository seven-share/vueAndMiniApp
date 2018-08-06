//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    hideDrawerFlag:true,
    animationData:{}
  },
  onLoad: function () {
  },
  showDrawer:function(e){
    console.log('show')
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })

    this.animation = animation

    animation.translateX(0).step()

    let that=this
    this.setData({
      hideDrawerFlag: !that.data.hideDrawerFlag
    })

    this.setData({
      animationData: animation.export()
    })
  },
  hideDrawer: function (e) {
    this.animation.translateX(-150).step()
    this.setData({
      animationData: this.animation.export()
    })
    let that = this
    setTimeout(function(){
      that.setData({
        hideDrawerFlag: !that.data.hideDrawerFlag
      })
    },500)
  },
  toLogs:function(e){
    wx.navigateTo({
      url: '/pages/logs/logs'
    })
    this.hideDrawer()
  }
})
