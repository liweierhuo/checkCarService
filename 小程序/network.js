const config = require('./config');
const util = require('./utils/util.js');
function execute(url, method , params, callback) {
  wx.showLoading({ title: '加载中',});
  wx.showNavigationBarLoading();
  function _callback(ret, status, xhr) {
    if (ret.data.code == config.SESSION_TIME_OUT) {
      wx.showModal({
        title: '提示',
        content: '信息过期，重新登录',
        showCancel: false,
        confirmText: '确定',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../personal/personal',
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      callback(ret, xhr);
    }
    wx.hideLoading();
    wx.hideNavigationBarLoading();
  }
  return new Promise(function (resove, reject) {
    wx.request({
      url: url,
      data: params,
      method: method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: sessionIntercepter(url),
      success: _callback,
      fail: function () {
        wx.showToast({
          title: '系统处理失败',
          icon: 'none'
        })
      },
      complete: function () {
        // complete
      }
    })
  })
}


function sessionIntercepter(url) {
  var header = {
    'content-type': 'application/json', // 默认值
  };
  var token = wx.getStorageSync(config.SESSION_KEY);
  if (util.isNotBlank(token)) {
    //token = util.checkSession();
  } else {
    token = util.login();
  }
  var intercep = [
    config.stationListUrl,
    config.stationDetailUrl,
  ];

  for (var index in intercep) {
    let str = intercep[index];
    if (url.indexOf(str) > -1) {
      if (token != undefined && token != null) {
        header = {
          'content-type': 'application/json', // 默认值
          'token': token
        };
      }
    }
  }
  return header;
}

module.exports = {
  //获取检测站列表
  getStationList: function (callback) {
    execute(config.stationListUrl,'GET', {}, callback);
  },
  //获取检测站详情
  getStationDetail: function (id,callback) {
    execute(config.stationDetailUrl + id, 'GET', {}, callback);
  },
  //获取车辆列表
  getCarList: function (callback) {
    execute(config.carListUrl, 'GET',{}, callback);
  },
  //获取车辆详情
  getCarDetail: function (id, callback) {
    execute(config.carDetailUrl + id, 'GET',{}, callback);
  },
};