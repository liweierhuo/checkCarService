
const config = require('../config');
// 引入SDK核心类
const QQMapWX = require('../libs/qqmap-wx-jssdk.min.js');
var qqmapsdk;
const app = getApp();     // 取得全局App
function isNotBlank(str) {
  if (typeof (str) != 'string') {
    return false;
  }
  if (str == undefined || str == null || str.trim() == '') {
    return false;
  }
  return true;
}

function getPages(totalCount,pageSize) {
  return Math.ceil(parseInt(totalCount) /parseInt(pageSize));
}

function initQQMapWx () {
  // 实例化API核心类
  if (qqmapsdk == undefined || qqmapsdk == null) {
    qqmapsdk = new QQMapWX({
      // 必填
      key: config.QQ_MAP_APP_KEY,
    });
  }
}

function reverseGeocoder(latitude, longitude) {
  initQQMapWx();
  // 调用接口
  qqmapsdk.reverseGeocoder({
    location: {
      latitude: latitude,
      longitude: longitude
    },
    success: function (res) {
      return res;
    },
    fail: function (res) {
      wx.showToast({
        title: '地址解析失败',
        icon:'none'
      })
      console.log(res);
    },
    complete: function (res) {
      console.log(res);
    }
  });
}

function login() {
  // 登录
  wx.login({
    success: res => {
      // ------ 获取凭证 ------
      var code = res.code;

      if (code) {
        // console.log('获取用户登录凭证：' + code);
        // ------ 发送凭证 ------
        wx.getUserInfo({
          success: res => {
            app.globalData.userInfo = res.userInfo;
            var rawData = res.rawData;
            var signature = res.signature;
            var encryptedData = res.encryptedData;
            var iv = res.iv;
            wx.request({
              url: config.loginUrl,
              data: { 'code': code, 'signature': signature, 'rawData': rawData, 'encryptedData': encryptedData, 'iv': iv },
              method: 'POST',
              header: {
                'content-type': 'application/json'
              },
              success: function (res) {
                if (res.data != undefined && res.data != null) {
                  wx.setStorageSync(config.SESSION_KEY, res.data.token);
                  return res.data.token;
                } else {
                  wx.showToast({
                    title: res.data.msg,
                    icon: 'none'
                  });
                }
              },
              fail: function (res) {
                wx.showToast({
                  title: '登录失败',
                  icon: 'none'
                })
              }
            })
          }
        })
      } else {
        console.log('获取用户登录失败：' + res.errMsg);
      }
    }
  });
}
function checkSession() {
  wx.checkSession({
    success() {
      //session_key 未过期，并且在本生命周期一直有效
      return wx.getStorageSync(config.SESSION_KEY);
    },
    fail() {
      // session_key 已经失效，需要重新执行登录流程
      return login(); //重新登录
    }
  })
}

module.exports = {
  isNotBlank: isNotBlank,
  getPages: getPages,
  reverseGeocoder: reverseGeocoder,
  login: login,
  checkSession: checkSession,
}