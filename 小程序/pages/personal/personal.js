// pages/personal/personal.js
var util = require('../../utils/util.js');
var config = require('../../config.js');
const app = getApp();     // 取得全局App
Page({

  /**
   * 页面的初始数据
   */
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
          app.globalData.userInfo = res.userInfo;
          wx.setStorageSync(config.USER_INFO_KEY, res.userInfo);
          wx.setStorageSync(config.RAM_DATA_KEY, res.rawData);
          wx.setStorageSync(config.SIGNATURE_KEY, res.signature);
          wx.setStorageSync(config.ENCYYPTED_DATA_KEY, res.encryptedData);
          wx.setStorageSync(config.IV_KEY, res.iv);
          var token = wx.getStorageSync(config.SESSION_KEY);
          if (!util.isNotBlank(token)) {
            util.login();
          }
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo;
    wx.setStorageSync(config.USER_INFO_KEY, e.detail.userInfo);
    wx.setStorageSync(config.RAM_DATA_KEY, e.detail.rawData);
    wx.setStorageSync(config.SIGNATURE_KEY, e.detail.signature);
    wx.setStorageSync(config.ENCYYPTED_DATA_KEY, e.detail.encryptedData);
    wx.setStorageSync(config.IV_KEY, e.detail.iv);
    var token = wx.getStorageSync(config.SESSION_KEY);
    if (!util.isNotBlank(token)) {
      util.login();
    }
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
  }
})