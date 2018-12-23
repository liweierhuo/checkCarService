const config = require('../config');
const app = getApp();     // 取得全局App
// 开始login
function login(callback) {
  wx.login({
    success(res) {
      if (res.code) {
        // 登录成功，获取用户信息
        getUserInfo(res.code, callback)
      } else {
        // 否则弹窗显示，showToast需要封装
        showToast();
      }
    },
    fail() {
      showToast();
    }
  })
}

// 获取用户信息
function getUserInfo(code, callback) {
  wx.getUserInfo({
    lang:'zh_CN',
    // 获取成功，全局存储用户信息，开发者服务器登录
    success(res) {
      // 全局存储用户信息
      wx.setStorageSync(config.USER_INFO_KEY, JSON.stringify(res.userInfo));
      app.globalData.userInfo = res.userInfo;
      postLogin(code, res.signature, res.iv, res.encryptedData, res.rawData, callback)
    },
    // 获取失败，弹窗提示一键登录
    fail() {
      // 获取用户信息失败，清楚全局存储的登录状态，弹窗提示一键登录
      // 使用token管理登录态的，清楚存储全局的token
      // 使用cookie管理登录态的，可以清楚全局登录状态管理的变量
      wx.removeStorageSync(config.SESSION_KEY);
      // 获取不到用户信息，说明用户没有授权或者取消授权。弹窗提示一键登录，后续会讲
      showLoginModal()
    }
  })
}

// 开发者服务端登录
function postLogin(code, signature, iv, encryptedData, rawData, callback) {
  wx.showLoading({
    title: '加载中',
  })
  wx.request({
    url: config.loginUrl,
    method: 'POST',
    data: {
      code: code,
      signature: signature,
      iv: iv,
      encryptedData: encryptedData,
      rawData: rawData
    },
    success: function (res) {
      console.log("postLogin :"+res)
      wx.hideLoading();
      // 登录成功，
      // 使用token管理登录态的，存储全局token，用于当做登录态判断，
      // 使用cookie管理登录态的，可以存任意变量当做已登录状态
      if (res.data.code == config.SUCCESS_CODE) {
        wx.setStorageSync(config.SESSION_KEY, res.data.result.token);
        callback && callback();
        console.log('成功登录');
      }else{
        console.log('登录失败');
        showToast();
      }
    },
    fail: function (res) {
      showToast();
    }
  });
}

// 显示toast弹窗
function showToast(content = '系统处理失败，请稍后再试') {
  wx.showToast({
    title: content,
    icon: 'none'
  })
}

// 判断是否登录
function isLogin() {
  var token;
  try {
    var value = wx.getStorageSync(config.SESSION_KEY)
    if (value) {
      console.log("token:"+value);
      token = value;
    }
  } catch (e) {
    // Do something when catch error
    console.error("getTokenByStore is error:" + e);
  }
  if (token) {
    // 如果有全局存储的登录态，暂时认为他是登录状态
    return token;
  } else {
    // 如果没有登录态，弹窗提示一键登录
    showLoginModal();
  }
}

// 接口调用失败处理，
function handleError(res) {
  // 规定-3041和-3042分别代表未登录和登录态失效
  if (res.code == config.SESSION_TIME_OUT) {
    // 弹窗提示一键登录
    showLoginModal()
  } else if (res.code != config.SUCCESS_CODE && res.code != config.NO_DATA) {
    // 弹窗显示错误信息
    showToast(res.msg)
  } else {
    return true;
  }
}

// 显示一键登录的弹窗
function showLoginModal() {
  wx.showModal({
    title: '提示',
    content: '你还未登录，登录后可获得完整体验 ',
    confirmText: '一键登录',
    success(res) {
      // 点击一键登录，去授权页面
      if (res.confirm) {
        wx.navigateTo({
          url: '../getUserInfo/getUserInfo',
        })
      }
    }
  })
}
module.exports = {
  login: login,
  isLogin: isLogin,
  handleError: handleError,
}