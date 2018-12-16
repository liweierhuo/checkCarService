
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

function reverseGeocoder(latitude, longitude,callBack) {
  initQQMapWx();
  // 调用接口
  qqmapsdk.reverseGeocoder({
    location: {
      latitude: latitude,
      longitude: longitude
    },
    success: function (res){
      callBack(res);
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
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return year + '-' + month + '-' + day;
}
function getUserInfoByStore() {
  var storeUserInfo;
  try {
    var value = wx.getStorageSync(config.USER_INFO_KEY)
    if (value) {
      console.log(value);
      storeUserInfo = value;
    }
  } catch (e) {
    // Do something when catch error
    console.error("getUserInfoByStore is error:" + e);
  }
  return storeUserInfo;
}

function getCityByKeyword(keyword, callBack) {
  initQQMapWx();
  // 调用接口
  qqmapsdk.getSuggestion({
    keyword: keyword,
    success: function (res) {
      callBack(res);
    },
    fail: function (res) {
      console.log(res);
    },
    complete: function (res) {
      console.log(res);
    }
  })
}

module.exports = {
  isNotBlank: isNotBlank,
  getPages: getPages,
  reverseGeocoder: reverseGeocoder,
  formatTime: formatTime,
  getUserInfoByStore: getUserInfoByStore,
  getCityByKeyword: getCityByKeyword,
}