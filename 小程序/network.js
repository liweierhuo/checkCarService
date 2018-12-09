const config = require('./config');
const util = require('./utils/util.js');
const handleLogin = require('./utils/handleLogin.js');
function execute(url, method , params, callback) {
  wx.showLoading({ title: '加载中',});
  wx.showNavigationBarLoading();
  function _callback(ret, status, xhr) {
    wx.hideLoading();
    wx.hideNavigationBarLoading();
    if(handleLogin.handleError(ret.data)) {
      callback(ret, xhr);
    }
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
  var intercep = [
    config.stationListUrl,
    config.stationDetailUrl,
    config.carListUrl,
    config.carDetailUrl,
    config.addCard,
  ];
  for (var index in intercep) {
    let str = intercep[index];
    if (url.indexOf(str) > -1) {
      var token = handleLogin.isLogin();
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
  //用户登录
  userLogin: function (code, signature, iv, encryptedData,rawData,callback) {
    execute(config.loginUrl, 'POST', { code: code, signature: signature, iv: iv, encryptedData: encryptedData, rawData: rawData}, callback);
  },

  //新增车辆
  addCard: function (car_number, callback) {
    execute(config.addCard, 'POST', {car_number:car_number}, callback);
  },

};