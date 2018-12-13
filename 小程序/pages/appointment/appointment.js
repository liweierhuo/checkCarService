// pages/appointment/appointment.js
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
    nickName:'张三',
    region: ['广东省', '广州市', '海珠区'],
    date: '2016-09-01',
    array: ['上午', '下午'],
    index: 0,
    numberArray: ['贵A123456', '贵A111111'],
    numberIndex: 0,
    detail:'',
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
    var userInfo;
    if (app.globalData.userInfo) {
      userInfo = app.globalData.userInfo;
    } else {
      userInfo = JSON.parse(_this.getUserInfoByStore());
    }
    this.setData({
      avatarUrl: userInfo.avatarUrl,
      nickName: userInfo.nickName
    })
    _this.getCarList();
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
    var _this = this;
    wx.chooseLocation({
      success: function (res) {
        console.log(res);
        //选择地点之后返回到原来页面
        var latitude = res.latitude;
        var longitude = res.longitude;
        util.reverseGeocoder(latitude, longitude, function (res1) {
          console.log("util.reverseGeocoder res :" + res1);
          var province = res1.result.address_component.province;
          var city = res1.result.address_component.city;
          var district = res1.result.address_component.district;
          var myRegion = [province, city, district];
          _this.setData({
            region: myRegion,
            detail: res1.result.address_component.street + res1.result.address_component.street_number
          })
        });
      },
      fail: function (err) {
        console.log(err)
      }
    });
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
            var myCarNumberList = [];
          for (var i = 0; i < res.data.result.length;i++) {
            myCarNumberList.push(res.data.result[i].car_number);
          }
          _this.setData({
            numberArray: myCarNumberList,
          });
        } else {
          wx.showModal({
            title: '提示',
            content: '您还没有添加车辆，现在去添加车辆',
            success(res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '../uploadDrivingLicense/uploadDrivingLicense',
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      }
    })
  },
  getUserInfoByStore: function () {
    var storeUserInfo;
    try {
      var value = wx.getStorageSync(config.USER_INFO_KEY)
      if (value) {
        console.log(value);
        storeUserInfo = value;
      }
    } catch (e) {
      // Do something when catch error
      console.error("getUserInfoByStore is error:" + e);
    }
    return storeUserInfo;
  },
})