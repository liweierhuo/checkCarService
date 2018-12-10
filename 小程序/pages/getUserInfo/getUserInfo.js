// pages/getUserInfo/getUserInfo.js
var util = require('../../utils/util.js');
var handleLogin = require('../../utils/handleLogin.js');
var config = require('../../config.js');
const app = getApp();     // 取得全局App
import Page from '../../common/page';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: "../../img/face.png",
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo: {},
    hasUserInfo: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        avatarUrl: app.globalData.userInfo.avatarUrl,
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
          avatarUrl: res.userInfo.avatarUrl,
        });
        wx.setStorageSync(config.USER_INFO_KEY, JSON.stringify(res.userInfo));
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
            avatarUrl: res.userInfo.avatarUrl,
          });
          wx.setStorageSync(config.USER_INFO_KEY, JSON.stringify(res.userInfo));
        }
      })
    }
  },

  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
      avatarUrl: e.detail.userInfo.avatarUrl,
    });
    wx.setStorageSync(config.USER_INFO_KEY, JSON.stringify(e.detail.userInfo));
    handleLogin.login(function() {
      console.info("异步登录");
      app.globalData.isBack = true;
      wx.navigateBack({
        delta:1,
      })
    });
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
})