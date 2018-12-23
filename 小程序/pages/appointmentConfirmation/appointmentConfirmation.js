// pages/appointmentConfirmation/appointmentConfirmation.js
import Page from '../../common/page';
var util = require('../../utils/util.js');
const config = require('../../config');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    appointment:{},
    avatarUrl: "../../img/face.png",
    nickName: '张三',
  },
  next: function () {
    wx.navigateTo({
      url: '../recommend/recommend'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var orderPreData = wx.getStorageSync(config.TAKE_ORDER_KEY);
    var userInfo;
    if (app.globalData.userInfo) {
      userInfo = app.globalData.userInfo;
    } else {
      userInfo = JSON.parse(util.getUserInfoByStore());
    }
    this.setData({
      avatarUrl: userInfo.avatarUrl,
      nickName: userInfo.nickName,
      appointment: JSON.parse(orderPreData),
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

  }
})