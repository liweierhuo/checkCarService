// pages/recommend/recommend.js
const app = getApp();
var util = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    stationList: [],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getStation();

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
    // 隐藏导航栏加载框
    wx.hideNavigationBarLoading();
    // 停止下拉动作
    wx.stopPullDownRefresh();
  


  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.info("上拉");
    // 显示加载图标
    wx.showLoading({
      title: '玩命加载中',
    })
    // 隐藏加载框
    wx.hideLoading();

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
  getStation : function () {
    var _this = this;
    wx.request({
      url: app.globalData.requestBase+'/api/v1/station/all', 
      data: {time:new Date()},
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
        if (res.data.code = app.globalData.SUCCESS_CODE) {
          console.info("res.result" + res.data.result);
          if (res.data.result != undefined && res.data.result != null 
          && res.data.result.length > 0) {
            _this.setData({
              stationList: res.data.result,
            });
          }
        }
      }
    });
  }
})