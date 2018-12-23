// pages/auditingDetails/auditingDetails.js
const date = new Date()
const years = []
const months = []
const days = []



for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}

import Page from '../../common/page';
const app = getApp();
var util = require('../../utils/util.js');
var config = require('../../config.js');
var network = require('../../network.js');
Page({
  data: {
    years: years,
    year: 2018,
    months: months,
    month: 1,
    days: days,
    day: 2,
    times:['上午','下午'],
    time:'上午',
    value: [0, 0, 0,0],
    showLayer:false,
    showOk: false,
    orderInfo:{},
  },
  bindChange: function(e) {
    const val = e.detail.value;
    console.log("bindChange res :"+val);
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]],
      time: this.data.times[val[3]],
    })
  },

  showOk: function () {
    /*
    this.setData({
      showOk: true,
      showLayer: true,
    })
    */
    network.orderHandle(this.data.orderInfo.id,function(res,xhr){
      console.log("network.orderHandle res :" +res.data.msg);
      if (res.data.code == config.SUCCESS_CODE) {
        wx.showToast({
          title: '受理成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
    
  },
  hideOk: function () {
    this.setData({
      showOk: false,
      showLayer: true,
    })
  },


  showLayer:function(){
    this.setData({
      showLayer: true,
    })
  },
  hideLayer: function () {
    this.setData({
      showLayer: false,
    })
  },
  sure: function () {
    this.hideLayer();
    var app_date = this.data.year+'-'+this.data.month+'-'+this.data.day;
    var app_time = config.timeRange[this.data.time];
    network.orderChange(this.data.orderInfo.id, app_date, app_time,function(res,xhr){
      console.log("network.orderChange res :"+res.data);
      if (res.data.code == config.SUCCESS_CODE) {
        wx.showToast({
          title: '改签成功',
        });
      } else {
        wx.showToast({
          title: res.data.msg,
          icon:'none'
        });
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.orderId) {
      this.getOrderDetail(options.orderId);
    }
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
      app.globalData.isBack = false;
      wx.redirectTo({
        url: '../orderList/orderList',
      })
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  reviewImg : function (e) {
    console.info("order id:" + e.currentTarget.dataset.id);
    console.info("orderNo:" + e.currentTarget.dataset.order_no);
    console.info("carNumber:" + e.currentTarget.dataset.car_number);
    var id = e.currentTarget.dataset.id;
    var orderNo = e.currentTarget.dataset.order_no;
    var carNumber = e.currentTarget.dataset.car_number;
    if (id != undefined && id != null && id) {
      wx.navigateTo({
        url: '../auditingReview/auditingReview?orderId=' + id + '&orderNo=' + orderNo + '&carNumber=' + carNumber,
      })
    }
  },
  getOrderDetail:function(id) {
    var _this = this;
    network.getStationOrderDetail(id,function(res,xhr){
      console.log("network.getStationOrderDetail res :"+res.data);
      if (res.data.code == config.SUCCESS_CODE) {
        _this.setData({
          orderInfo:res.data.result,
        })
        _this.setDateAndTime(res.data.result);
      }
    })
  },
  setDateAndTime:function(orderInfo) {
    var _this = this;
    var date = orderInfo.app_date;
    var time = orderInfo.app_time;
    var dateArray = date.split('-');
    var timesIndex = 0;
    var years = [];
    for (let i = parseInt(dateArray[0]); i <= parseInt(parseInt(dateArray[0])+30); i++) {
      years.push(i)
    }
    for (var i = 0 ; i< this.data.times; i++) {
      if (this.data.times[i] == time ) {
        timesIndex = i;
      }
    }
    var myValue = [0, parseInt(dateArray[1] - 1), parseInt(dateArray[2] - 1), timesIndex];
    this.setData({
      year: dateArray[0],
      month: dateArray[1],
      day: dateArray[2],
      time:time,
      value: myValue,
      years: years,
    })
  }
})