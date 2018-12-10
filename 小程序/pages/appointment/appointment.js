// pages/appointment/appointment.js
import Page from '../../common/page';
var util = require('../../utils/util.js');
const config = require('../../config');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['广东省', '广州市', '海珠区'],
    date: '2016-09-01',
    array: ['上午', '下午'],
    index: 0,
    numberArray: ['贵A123456', '贵A111111'],
    numberIndex: 0,
    address:'',
    latitude: 23.099994,
    longitude: 113.324520,
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },

  bindDateChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  bindNumberChange: function (e) {
    this.setData({
      numberIndex: e.detail.value
    })
  },
  next: function () {
    wx.navigateTo({
      url: '../appointmentConfirmation/appointmentConfirmation'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
        _this.setData({
          latitude: latitude,
          longitude: longitude,
        })
        //util.reverseGeocoder(latitude, longitude);
      }
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
    var _this = this;
    wx.getStorage({
      key: 'ad_info',
      success(res) {
        console.log(res.data)
        var province= res.data.province;
        var city = res.data.city;
        var district = res.data.district;
        var myRegion = [province, city, district]
        _this.setData({
          region: myRegion
        })
      }
    });
    wx.getStorage({
      key: 'address',
      success(res) {
        console.log(res.data)
        var address = res.data;
        _this.setData({
          address: address
        })
      }
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
  selectAddress:function() {
    /*
    wx.navigateTo({
      url: '../location/location',
    })
    */
    wx.chooseLocation({
      success: function (res) {
        console.log(res);
        //选择地点之后返回到原来页面

        
      },
      fail: function (err) {
        console.log(err)
      }
    });
  }
})