// pages/myData/myData.js
import Page from '../../common/page';
var util = require('../../utils/util.js');
const config = require('../../config');
var network = require('../../network.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserData();
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
    if (app.globalData.isBack) {
      this.getUserData();
      app.globalData.isBack = false;
    }
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

  loginOut:function() {
    network.loginOut(function(res,xhr){
      console.log("network.loginOut res:"+res.data);
      if(res.data.code == config.SUCCESS_CODE) {
        wx.removeStorageSync(config.USER_NAME);
        wx.reLaunch({
          url: '../login/login',
        })
      }else {
        wx.showToast({
          title: res.data.msg,
          icon:'none'
        })
      }
    })
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
  getUserData:function() {
    var _this = this;
    var userInfo;
    if (app.globalData.userInfo) {
      userInfo = app.globalData.userInfo;
    } else {
      userInfo = JSON.parse(util.getUserInfoByStore());
    }
    if (typeof userInfo === "undefined" || userInfo == null) {
      wx.navigateTo({
        url: '../getUserInfo/getUserInfo',
      })
    } else{
      _this.setData({
        userInfo: userInfo
      })
    }
  },

})