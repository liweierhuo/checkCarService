// pages/personal/personal.js
var util = require('../../utils/util.js');
var handleLogin = require('../../utils/handleLogin.js');
var config = require('../../config.js');
const app = getApp();     // 取得全局App
import Page from '../../common/page';
Page({

  /**
    asdfasdfa   */
  data: {
    avatarUrl : "../../img/face.png",
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    /*
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    */
    var type = 'init';
    this.pageOnload(type);
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    console.info("下拉");
    var type = 'pullDownRefresh';
    this.pageOnload(type);
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  goMyData :function() {
    wx.navigateTo({
      url: '../myData/myData',
    })
  },
  goMyCar :function() {
    wx.navigateTo({
      url: '../myCar/myCar',
    })
  },
  goMyOrder: function () {
    wx.navigateTo({
      url: '../myOrder/myOrder',
    })
  },
  goMyNews : function() {
    wx.navigateTo({
      url: '../myNew/myNew',
    })
  },
  goMyAddress:function() {
    wx.navigateTo({
      url: '../address/address',
    })
  },
  getUserInfoByStore : function() {
    var storeUserInfo;
    try {
      var value = wx.getStorageSync(config.USER_INFO_KEY)
      if (value) {
        console.log(value);
        storeUserInfo = value;
      }
    } catch (e) {
      // Do something when catch error
      console.error("getUserInfoByStore is error:"+e);
    }
    return storeUserInfo;
  },

  pageOnload:function (type) {
    var userInfo;
    if (app.globalData.userInfo) {
      userInfo = app.globalData.userInfo;
    } else {
      var userInfoStore = util.getUserInfoByStore();
      if (userInfoStore != undefined && userInfoStore != null) {
        userInfo = JSON.parse(userInfoStore);
      }
    }
    if (userInfo != undefined && userInfo != null) {
      this.setData({
        userInfo: userInfo,
        hasUserInfo: true
      })
    }
    if (type = 'pullDownRefresh') {

      // 隐藏导航栏加载框
      wx.hideNavigationBarLoading();
      // 停止下拉动作
      wx.stopPullDownRefresh();
    }
  }

})