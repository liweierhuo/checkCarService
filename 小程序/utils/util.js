
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

module.exports = {
  isNotBlank: isNotBlank,
  getPages: getPages,
  reverseGeocoder: reverseGeocoder,
}