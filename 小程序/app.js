//app.js
const config = require('./config');
App({
  onLaunch: function () {
    var _this = this;
    wx.checkSession({
      success: function () {
        //session 未过期，并且在本生命周期一直有效
        console.log('未过期');
      },
      fail: function () {
        //登录态过期
        // 登录
        console.log('过期');
        wx.navigateTo({
          url: '../getUserInfo/getUserInfo',
        })
        
      }
    });
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
  globalData: {
    userInfo: null,
    isBack : false,
    deviceInfo: {},
  },
})