// pages/review/review.js
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
    avatarUrl: "../../img/face.png",
    nickName: '张三',
    orderId :'',
    orderInfo:{},
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOrderInfoByStore();
    this.getOrderDetail(this.data.orderId)
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
        });
      }
    });

  },
  getOrderInfoByStore: function () {
    var value = wx.getStorageSync(config.ORDER_INFO_KEY);
    var orderInfo = JSON.parse(value);
    this.setData({
      orderId: orderInfo.id,
    })
  }
})