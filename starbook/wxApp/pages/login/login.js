// pages/login/login.js
var app = getApp();
Page({
  data: {},
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      avatarUrl: app.globalData.userInfo.avatarUrl,
      nickName: app.globalData.userInfo.nickName
    })
  },
  onReady: function () {
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        wx.setStorageSync('latitude', latitude);
        wx.setStorageSync('longitude', longitude);
      }
    })


  },
  formBindsubmit: function (e) {
    if (isNaN(e.detail.value.phoneNum) || e.detail.value.phoneNum.length != 11) {
      wx.showToast({
        title: '请正确输入手机号',
        icon: 'loading',
        duration: 2000
      })
    } else {
      wx.switchTab({
        url: '/pages/myself/myself'
      });
      // var phoneNum = e.detail.value.phoneNum;
      // var code = wx.getStorageSync('code');
      // var userInfo = wx.getStorageSync('userInfo');
      // var latitude = wx.getStorageSync('latitude');
      // var longitude = wx.getStorageSync('longitude');
      // wx.request({
      //   url: 'http://localhost:3000/register',
      //   method: 'POST',
      //   data: {
      //     code:code,
      //     avatarUrl: userInfo.avatarUrl,
      //     nickName: userInfo.nickName,
      //     phoneNum: phoneNum,
      //     latitude: latitude,
      //     longitude: longitude
      //   },
      //   success: function (res) {
      //     wx.setStorageSync('openid', res.data);
      //     wx.showToast({
      //       title: '注册成功',
      //       icon: 'success',
      //       duration: 5000,
      //       success: function (res) {
      //         wx.switchTab({
      //           url: '/pages/myself/myself'
      //         })
      //       }
      //     })

      //   }
      // })
    }
  }
})