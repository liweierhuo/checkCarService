// pages/recommend/recommend.js
const app = getApp();
var util = require('../../utils/util.js'); 
var config = require('../../config.js');
var network = require('../../network.js');
import Page from '../../common/page';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    stationList: [],
    isBack:false,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getStation('');
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (app.globalData.isBack) {
      this.getStation('');
      app.globalData.isBack = false;
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    console.info("下拉");
    var type = 'pullDownRefresh';
    this.getStation(type);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.info("上拉");
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  goDetail : function (e) {
    console.info("id:" + e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '../details/details?stationId=' + e.currentTarget.dataset.id,
    })
  },
  //获取监测站列表
  getStation : function (type) {
    var _this = this;
    network.getStationList(function (res, xhr) {
      console.log(res.data);
      if (res.data.code == config.SUCCESS_CODE) {
        if (type == 'pullDownRefresh') {
          // 隐藏导航栏加载框
          wx.hideNavigationBarLoading();
          // 停止下拉动作
          wx.stopPullDownRefresh();
        }
        console.info("res.result" + res.data.result);
        if (res.data.result != undefined && res.data.result != null
          && res.data.result.length > 0) {
          _this.setData({
            stationList: res.data.result,
          });
        }
      }
    })
  }
})