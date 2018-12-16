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
    config.updateCarInfo,
    config.deleteCarInfo,
    config.addAuditor,
    config.getAddressList,
    config.addOrUpdateAddress,
    config.getAddressById,
    config.deleteAddress,
    config.takeOrder,
    config.orderListByUserId,
    config.getUserData,
    config.updateUserData,
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

  //修改车辆信息
  updateCarInfo: function (id, car_number, callback) {
    execute(config.updateCarInfo + id, 'PUT', { car_number: car_number }, callback);
  },
  //删除车辆
  deleteCarInfo: function (id, callback) {
    execute(config.deleteCarInfo + id, 'DELETE', {}, callback);
  },
  //新增审核信息
  addAuditor: function (id, callback) {
    execute(config.addAuditor, 'POST', {}, callback);
  },

  //获取用户所有地址
  addressList: function (callback) {
    execute(config.getAddressList, 'GET', {}, callback);
  },

  //新增地址
  addOrUpdateAddress: function (id,province, city, country, detail,callback) {
    var param;
    if(id) {
      param = {id:id,province: province, city: city, country: country, detail: detail };
    } else{
      param = { province: province, city: city, country: country, detail: detail };
    }
    execute(config.addOrUpdateAddress, 'POST', param, callback);
  },

  //获取用户单个地址信息
  getAddressById: function (id,callback) {
    execute(config.getAddressById + id, 'GET', {}, callback);
  },

  //删除地址信息
  deleteAddress: function (id, callback) {
    execute(config.deleteAddress + id, 'DELETE', {}, callback);
  },

  //下单
  takeOrder: function (station_id, mobile, car_number, snap_address, app_date,app_time,callback) {
    execute(config.takeOrder, 'POST', { station_id: station_id, mobile: mobile, car_number: car_number, snap_address: snap_address, app_date: app_date, app_time: app_time}, callback);
  },
  //获取我的订单列表
  getMyOrderList: function (page,size, callback) {
    execute(config.orderListByUserId, 'GET', { page: page, size: size }, callback);
  },

  //获取用户信息
  getUserData: function (callback) {
    execute(config.getUserData, 'GET', {}, callback);
  },

  //修改用户信息
  updateUserData: function (nickname, city, gender, mobile,callback) {
    var param = {};
    if (util.isNotBlank(nickname)) {
      param.nickname = nickname;
    }
    if (util.isNotBlank(city)) {
      param.city = city;
    }
    if (gender) {
      param.gender = gender;
    }
    if (util.isNotBlank(mobile)) {
      param.mobile = mobile;
    }
    execute(config.updateUserData, 'PUT', param, callback);
  },

};