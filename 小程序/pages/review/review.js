// pages/review/review.js
import Page from '../../common/page';
const app = getApp();
var util = require('../../utils/util.js');
var config = require('../../config.js');
var network = require('../../network.js');
import Notify from '../../miniprogram_npm/vant-weapp/notify/notify.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: "../../img/face.png",
    nickName: '张三',
    orderId :'',
    orderInfo:{},
    star_mark: 0,
    stationId:'',
    detail:'',
    detailMax:140,
    remainNum:140,
    orderStatusArry:{
      1: { info:'未确认',tip:'待审核'},
      2: { info: '已授理', tip: '审核成功'},
      3: { info: '改签', tip: '改签'}
    },
    orderCheckArry:{
      1:{info:'不预审'},
      2:{info:'未预审'},
      3:{info:'已预审'}
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.orderId) {
      this.getOrderDetail(options.orderId);
    } else {
      this.getOrderInfoByStore();
      this.getOrderDetail(this.data.orderId);
    }
    
    
  },

  detailInput:function(e) {
    console.log("detailInput e.detail:"+e.detail.value);
    var length = util.getStrLength(e.detail.value);
    if (length >= this.data.detailMax) {
      e.detail.value = e.detail.value.substr(0, this.data.detailMax);
    }
    this.setData({
      detail: e.detail.value,
      remainNum: this.data.detailMax - length,
    })
  },
  onChange(event) {
    console.log("rate onChange star_mark " + event.detail);
    this.setData({
      star_mark: event.detail
    });
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
    var userInfo;
    if (app.globalData.userInfo) {
      userInfo = app.globalData.userInfo;
    } else {
      userInfo = JSON.parse(util.getUserInfoByStore());
    }
    this.setData({
      avatarUrl: userInfo.avatarUrl,
      nickName: userInfo.nickName,
    })
    if(app.globalData.isBack) {
      this.getOrderInfoByStore();
      this.getOrderDetail(this.data.orderId);
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
  getOrderDetail(orderId) {
    var _this = this;
    network.orderDetail(orderId,function(res,xhr){
      console.log("network.orderDetail res :"+res);
      if (res.data.code == config.SUCCESS_CODE) {
        _this.setData({
          orderInfo: res.data.result,
          stationId: res.data.result.station.id,
        });
      }
    });

  },
  getOrderInfoByStore: function () {
    var value = wx.getStorageSync(config.ORDER_INFO_KEY);
    var orderInfo = JSON.parse(value);
    this.setData({
      orderId: orderInfo.id,
      stationId: orderInfo.stationId,
    })
  },
  addComment:function() {
    var _this = this;
    if (_this.data.star_mark <= 0) {
      Notify('请选择星级');
      return false;
    }
    if (!util.isNotBlank(_this.data.detail)) {
      Notify('评论不能为空');
      return false;
    }
    var order_id = _this.data.orderId;
    var station_id = _this.data.stationId;
    var star_mark = _this.data.star_mark;
    var detail = _this.data.detail;
    network.addComment(order_id, station_id, star_mark, detail,function(res,xhr){
      console.log("network.addComment res:"+res.data);
      if (res.data.code == config.SUCCESS_CODE) {
        wx.showToast({
          title: '评论成功',
        })
      }
    })
  },
  goMySpace:function() {
    wx.switchTab({
      url: '/pages/personal/personal'
    })
  }
})