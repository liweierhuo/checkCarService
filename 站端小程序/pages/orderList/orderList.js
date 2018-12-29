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
    orderListTemp: [],
    isCanLoad: true,
    currentPage:1,
    pageSize:20,
    keywords:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    var type = 'init';
    _this.getOrderList(_this.data.currentPage, _this.data.pageSize, _this.data.keywords, type);
  },
  keyWordsInput:function(e) {
    console.log("keyWordsInput value :" + e.detail.value);
    if (util.isNotBlank(e.detail.value)) {
      this.setData({
        keywords: e.detail.value,
      })
    }
  },
  searchClick:function() {
    this.search(this.data.keywords);
  },
  search:function(keywords){
    if (util.isNotBlank(keywords)) {
      var _this = this;
      var type = 'search';
      _this.setData({
        currentPage: 1,
      })
      _this.getOrderList(_this.data.currentPage, _this.data.pageSize, keywords, type);
    }
  },

  keyWordsConfirm: function (e) {
    console.log("keyWordsInput value :" + e.detail.value);
    this.search(e.detail.value);
    
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
    var _this = this;
    if (app.globalData.isBack) {
      var type = 'init';
      _this.getOrderList(_this.data.currentPage, _this.data.pageSize, _this.data.keywords, type);
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
    console.log("onPullDownRefresh is flush");
    var _this = this;
    _this.setData({
      currentPage: 1,
      isCanLoad: true,
      keywords:'',
    });
    var type = 'pullDownRefresh';
    _this.getOrderList(_this.data.currentPage, _this.data.pageSize, _this.data.keywords, type);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var _this = this;
    if (_this.data.isCanLoad) {
      var currentPage = _this.data.currentPage + 1;
      var pageSize = _this.data.pageSize;
      _this.setData({
        currentPage: currentPage,
        pageSize: pageSize
      })
      var type = 'reachBottom';
      _this.getOrderList(_this.data.currentPage, _this.data.pageSize, _this.data.keywords, type);
    }
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
  getOrderList: function (page, size, keywords,type) {
    var _this = this;
    network.getStationOrderPage(page, size, keywords,function(res,xhr){
      console.info("network.getStationOrderPage res :" + res.data);
      if (res.data.code == config.SUCCESS_CODE) {
        if (type == 'pullDownRefresh' || type == 'search' || type == 'init') {
          //停止下拉刷新
          wx.stopPullDownRefresh();
          _this.setData({
            orderListTemp: [],
          })
        }
        var list = _this.data.orderListTemp;
        var resList = res.data.result;
        if (resList != undefined && resList != null && resList.length > 0) {
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
        }
        _this.setData({ orderListTemp: list });
        _this.setData({ orderList: list });
      } else if (res.data.code == config.NO_DATA) {
        _this.setData({
          isCanLoad: false
        })
        if (type == 'pullDownRefresh' || type == 'search' || type == 'init') {
          //停止下拉刷新
          wx.stopPullDownRefresh();
        }
      }
    })
  }
})