// pages/auditingReview/auditingReview.js
import Page from '../../common/page';
const app = getApp();
var util = require('../../utils/util.js');
var config = require('../../config.js');
var network = require('../../network.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId:'',
    orderNo :'',
    carNumber:'',
    imgArray:[],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("orderId:"+options.orderId);
    console.log("orderNo:" + options.orderNo);
    console.log("carNumber:" + options.carNumber);
    if (options.orderId) {
      this.setData({
        orderId: options.orderId,
        orderNo: options.orderNo,
        carNumber: options.carNumber
      })
      this.getOrderPic(options.orderId);
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
    if (app.globalData.isBack) {
      app.globalData.isBack = false;
      wx.redirectTo({
        url: '../orderList/orderList',
      })
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
  getOrderPic:function(orderId) {
    var _this = this;
    network.orderPicDetail(orderId,function(res,xhr){
      console.log("network.orderPicDetail res:"+res.data.msg);
      if (res.data.code == config.SUCCESS_CODE) {
        var list = res.data.result;
        if (list != undefined && list != null && list.length > 0) {
          for (var i = 0; i < list.length; i++) {
            list[i].type = config.imgTypeRange[list[i].type];
          }
        }
        _this.setData({
          imgArray: list,
        })
      }else {
        wx.showToast({
          title: res.data.msg,
          icon:'none'
        })
      }
    })

  }
})