//app.js
const config = require('./config');
App({
  onLaunch: function () {

    this.globalData.deviceInfo = wx.getSystemInfoSync();
    console.log(this.globalData.deviceInfo);

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
        wx.login({
          success: res => {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            var code = res.code;
            wx.getSetting({
              success: res => {
                if (res.authSetting['scope.userInfo']) {
                  // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                  wx.getUserInfo({
                    success: res => {
                      _this.globalData.userInfo = res.userInfo;
                      wx.setStorageSync(config.USER_INFO_KEY, JSON.stringify(res.userInfo));
                      if (_this.userInfoReadyCallback) {
                        _this.userInfoReadyCallback(res)
                      }
                      var signature = res.signature;
                      var iv = res.iv;
                      var encryptedData = res.encryptedData;
                      var rawData = res.rawData;
                      wx.request({
                        url: config.loginUrl,
                        method:'POST',
                        data: {
                          code: code,
                          signature: signature,
                          iv: iv,
                          encryptedData: encryptedData,
                          rawData: rawData
                        },
                        success: function (res) {
                          wx.setStorageSync(config.SESSION_KEY, res.data.token)
                          console.log('成功登录')
                        }
                      })
                    },
                    fail : res => {
                      console.error("login is error : "+ res);
                    },
                    complete: res => {
                      console.log("login is complete "+res);
                    }
                  })
                } else {
                  console.log("没有授权");
                }
              }
            });
          }
        })
      }
    });
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              wx.setStorageSync(config.USER_INFO_KEY, JSON.stringify(res.userInfo));
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
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