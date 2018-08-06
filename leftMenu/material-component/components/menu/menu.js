// components/menu/menu.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hideDrawerFlag:{
      type:Boolean,
      value:true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    animationData: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showDrawer: function(e) {
      // console.log(e)
      var animation = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease',
      })

      this.animation = animation

      animation.translateX(0).step()

      this.setData({
        hideDrawerFlag: !this.data.hideDrawerFlag
      })

      this.setData({
        animationData: animation.export()
      })

      var myEventDetail = {
        'hello':123
      } // detail对象，提供给事件监听函数
      this.triggerEvent('showDrTry', myEventDetail)
    },
    hideDrawer: function(e) {
      this.animation.translateX(-150).step()
      this.setData({
        animationData: this.animation.export()
      })
      let that = this
      setTimeout(function() {
        that.setData({
          hideDrawerFlag: !that.data.hideDrawerFlag
        })
      }, 500)
    },
  }
})