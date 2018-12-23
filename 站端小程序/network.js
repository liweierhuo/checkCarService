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
    config.userLogin,
    config.loginOut,
    config.getStationOrder,
    config.getStationOrderDetail,
    config.orderHandle,
    config.orderChange,
    config.orderPicDetail,
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
  //用户登录
  userLogin: function (username,password,callback) {
    execute(config.userLogin, 'POST', { username: username, password: password}, callback);
  },
  //用户退出
  loginOut: function (callback) {
    execute(config.loginOut, 'GET', {}, callback);
  },
  //分页获取检测站当天订单列表
  getStationOrderPage: function (page,size,callback) {
    execute(config.getStationOrder, 'GET', { page: page, size: size}, callback);
  },
  //站端订单详情
  getStationOrderDetail: function (id, callback) {
    execute(config.getStationOrderDetail+id, 'GET', {}, callback);
  },
  //订单授理
  orderHandle: function (id, callback) {
    execute(config.orderHandle, 'PUT', { id: id}, callback);
  },
  //改签
  orderChange: function (id, app_date, app_time,callback) {
    execute(config.orderChange, 'PUT', { id: id, app_date: app_date, app_time: app_time}, callback);
  },
  //站端订单审核照片详情
  orderPicDetail: function (id, callback) {
    execute(config.orderPicDetail+id, 'GET', {}, callback);
  },

};