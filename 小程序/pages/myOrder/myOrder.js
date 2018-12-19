// pages/myOrder/myOrder.js
var util = require('../../utils/util.js');
const config = require('../../config');
var network = require('../../network.js');
import Page from '../../common/page';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: "../../img/face.png",
    nickName: '张三',
    myOrderList:[],
    orderListTemp:[],
    currentPage:1,
    pageSize:10,
    isCanLoad:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    this.getMyOrderList(_this.data.currentPage, _this.data.pageSize);
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
    if (app.globalData.isBack) {
      _this.getMyOrderList(_this.data.currentPage,_this.data.pageSize);
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
      currentPage:1,
    });
    this.getMyOrderList(_this.data.currentPage, _this.data.pageSize);

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var _this = this;
    if (_this.data.isCanLoad) {
      var currentPage = _this.data.currentPage + 1;
      var pageSize = _this.data.pageSize;
      _this.getMyOrderList(currentPage, pageSize);
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getMyOrderList(currentPage,pageSize) {
    var _this = this;
    network.getMyOrderList(currentPage, pageSize,function(res,xhr){
      console.log("network.getMyOrderList res:"+res);
      if (res.data.code == config.SUCCESS_CODE) {
        if (res.data.result != undefined && res.data.result != null && res.data.result.length > 0) {
          var orderList = [];
          for (var i = 0; i < res.data.result.length; i++ ) {
            var order = { car_number: res.data.result[i].car_number, 
              app_date: res.data.result[i].app_date, 
              order_no: res.data.result[i].order_no,
              app_time: res.data.result[i].app_time,
              status: config.orderStatus[res.data.result[i].status],
              check: config.orderCheck[res.data.result[i].check],
              id: res.data.result[i].id, 
              }
            orderList.push(order);
          }

          _this.setData({ myOrderList: orderList });
        }
       
      } else if (res.data.code == config.NO_DATA) {
        _this.setData({
          isCanLoad:false
        })
      }
    });
  },
  goOrderDetail:function(e) {
    console.info("goOrderDetail id:" + e.currentTarget.dataset.item.id);
    var id = e.currentTarget.dataset.item.id;
    if (id != undefined && id != null && id)
    wx.navigateTo({
      url: '../review/review?orderId=' + id,
    })
  }
})