// pages/orderList/orderList.js
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
    orderList:[],
    currentPage:1,
    pageSize:20,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOrderList();
  },
  goMySpace:function() {
    wx.navigateTo({
      url: '../myData/myData',
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
    if (app.globalData.isBack) {
      this.getOrderList();
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
    console.info("下拉");
    this.getOrderList();
    // 停止下拉动作
    wx.stopPullDownRefresh();
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
  goDetail : function (e) {
    console.info("goOrderDetail id:" + e.currentTarget.dataset.id);
    var id = e.currentTarget.dataset.id;
    if (id != undefined && id != null && id){
      wx.navigateTo({
        url: '../auditingDetails/auditingDetails?orderId='+id,
      })
    }
  },
  getOrderList:function() {
    var page = this.data.currentPage;
    var size = this.data.pageSize;
    var _this = this;
    network.getStationOrderPage(page,size,function(res,xhr){
      console.info("network.getStationOrderPage res :" + res.data);
      if (res.data.code == config.SUCCESS_CODE) {
        var resList = res.data.result;
        var list = [];
        for (var i = 0; i < resList.length; i++) {
          var order = {
            car_number: resList[i].car_number,
            app_date: resList[i].app_date,
            order_no: resList[i].order_no,
            app_time: resList[i].app_time,
            status: config.orderStatus[resList[i].status],
            check: config.orderCheck[resList[i].check],
            id: resList[i].id,
          }
          list.push(order);
        }
        _this.setData({
          orderList: list,
        })
      }
    })
  }
})