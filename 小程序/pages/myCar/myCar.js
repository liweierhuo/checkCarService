// pages/myCar/myCar.js
const app = getApp();
var util = require('../../utils/util.js');
var config = require('../../config.js');
var network = require('../../network.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carList:[],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCarList();
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
    //this.getCarList();
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
  //获取监测站列表
  getCarList: function () {
    var _this = this;
    network.getCarList(function (res, xhr) {
      console.log(res.data);
      if (res.data.code == config.SUCCESS_CODE) {
        console.info("res.result" + res.data.result);
        if (res.data.result != undefined && res.data.result != null
          && res.data.result.length > 0) {
          _this.setData({
            carList: res.data.result,
          });
        }
      }
    })
  },
  goAddCar() {
    wx.navigateTo({
      url: '../uploadDrivingLicense/uploadDrivingLicense',
    })
  },

})