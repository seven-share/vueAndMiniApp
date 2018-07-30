//app.js
App({
  onLaunch: function () {
    var that = this;
    wx.login({
      success: function (res) {
        var code = res.code;
        if (code) {
          // console.log('获取用户登录凭证：' + code);
        } else {
          // console.log('获取用户登录态失败：' + res.errMsg);
        }
        wx.getUserInfo({
          success: function (res) {
            // console.log(res);
            that.globalData.userInfo = res.userInfo;
            wx.setStorageSync('userInfo', res.userInfo);
            wx.setStorageSync('code', code);
          }
        })
      }
    })
  },
  globalData: {
    userInfo: {}
  }
})