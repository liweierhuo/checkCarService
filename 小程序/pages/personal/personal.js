// pages/personal/personal.js
var util = require('../../utils/util.js');
var handleLogin = require('../../utils/handleLogin.js');
var config = require('../../config.js');
const app = getApp();     // 取得全局App
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl : "../../img/face.png",
    userInfo: {},
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    
    var storeUserInfo = _this.getUserInfoByStore();
    
    if (storeUserInfo != undefined && storeUserInfo != null) {
      storeUserInfo = JSON.parse(storeUserInfo);
      _this.setData({
        userInfo: storeUserInfo,
      })
    } else {
      handleLogin.login(function () {
        storeUserInfo = _this.getUserInfoByStore();
        storeUserInfo = JSON.parse(storeUserInfo);
        _this.setData({
          userInfo: storeUserInfo,
        })
      });
    }
    app.globalData.userInfo = storeUserInfo;
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

})