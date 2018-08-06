//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    hideDrawerFlag:false,
    moveFlag:false,
    animationData:{}
  },
  onLoad: function () {
  },
  showDrawer:function(e){
    console.log('show')
    let that=this
    this.setData({
      hideDrawerFlag: !that.data.hideDrawerFlag,
      moveFlag: !that.data.moveFlag
    })
  },
  hideDrawer: function (e) {
    let that = this
    this.setData({
      moveFlag: !that.data.moveFlag
    })
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
