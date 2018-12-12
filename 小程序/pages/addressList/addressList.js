// pages/address/addressList/addressList.js
var app = getApp();
var util = require('../../../utils/util.js');
const config = require('../../../config');
var network = require('../../../network.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList:[],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAddressList();
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
      this.getAddressList();
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
  goAddAddress:function() {
    wx.navigateTo({
      url: '../addAddress/addAddress',
    })
  },
  getAddressList : function () {
    var _this = this;
    network.addressList(function(res,xhr){
      if(res.data.code == config.SUCCESS_CODE) {
        console.log("network.addressList res:"+res);
        _this.setData({
          addressList: res.data.result,
        });
      }
    });
  },

})