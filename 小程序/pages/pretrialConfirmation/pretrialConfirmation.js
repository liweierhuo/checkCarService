// pages/pretrialConfirmation/pretrialConfirmation.js
import Page from '../../common/page';
var util = require('../../utils/util.js');
var config = require('../../config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statinoName:'测试',
    carNumber:'123213',
    mobile: '13260501936',
    address: '测试地址',
    date: '2018-10-10',
    time:'上午',
  },
  next: function () {
    wx.navigateTo({
      url: '../camera/camera'
    })
  },
  goOrderInfo : function() {
    wx.navigateTo({
      url: '../review/review'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.info("stationName:" + options.stationName);
    console.info("stationId:" + options.stationId);
    if (util.isNotBlank(options.stationName)) {
      this.setData({
        statinoName: options.stationName,
      })
    }
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
    this.getOrderPreDataByStore();
    /*
    this.getOrderInfoByStore();
    */
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
  getOrderPreDataByStore : function () {
    var value = wx.getStorageSync(config.TAKE_ORDER_KEY);
    var orderPreData = JSON.parse(value);
    this.setData({
      carNumber: orderPreData.carNumber,
      mobile:orderPreData.mobile,
      address: orderPreData.region[0] + orderPreData.region[1] + orderPreData.region[2] + orderPreData.detail,
      date:orderPreData.date,
      time:orderPreData.time,
    })
  },
  /*
  getOrderInfoByStore : function () {
    var value = wx.getStorageSync(config.ORDER_INFO_KEY);
    var orderInfo = JSON.parse(value);
    this.setData({
      statinoName:orderInfo.statinoName,
    })
  }
  */
})