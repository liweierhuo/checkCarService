// pages/address/addAddress/addAddress.js
import Page from '../../common/page';
var util = require('../../utils/util.js');
const config = require('../../config');
var network = require('../../network.js');
import Notify from '../../miniprogram_npm/vant-weapp/notify/notify.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressId:'',
    detail:'',
    region: ['广东省', '广州市', '海珠区'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.info("addressId:" + options.addressId);
    if (options.addressId) {
      this.setData({
        addressId: options.addressId,
      });
      this.getAddressInfo(options.addressId);
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
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  detailInput:function(e) {
    console.log('detail改变', e.detail.value);
    this.setData({
      detail: e.detail.value,
    })
  },

  deleteAddress:function() {
    network.deleteAddress(this.data.addressId,function(res,xhr){
      console.log(res);
      if (res.data.code == config.SUCCESS_CODE) {
        wx.showToast({
          title: '删除成功',
        });
        app.globalData.isBack = true;
        wx.navigateBack({
          delta: 1
        });
      }
    });
  },
  getAddressInfo:function(id) {
    var _this = this;
    network.getAddressById(id,function(res,xhr){
      console.log(res);
      if (res.data.code == config.SUCCESS_CODE) {
        var province = res.data.result.province;
        var city = res.data.result.city;
        var country = res.data.result.country;
        var myRegion = [province, city, country];
        _this.setData({
          detail: res.data.result.detail,
          region: myRegion,
        });
      }
    });
  },

  getUserAddress:function(){
    var _this = this;
    //解析出地址
    wx.getLocation({
      success: function (res) {
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
          })
        });
      },
    })
  },
  savaAddress:function() {
    console.log("savaAddress");
    if (!util.isNotBlank(this.data.detail)) {
      Notify('请输入详细地址');
      return;
    }
    if (!util.isNotBlank(this.data.region[0]) || !util.isNotBlank(this.data.region[1]) || !util.isNotBlank(this.data.region[2])) {
      Notify('请选择地区');
      return;
    }
    var message = '新增成功';
    if (this.data.addressId) {
      message = '修改成功';
    }
    network.addOrUpdateAddress(this.data.addressId, this.data.region[0], this.data.region[1], 
    this.data.region[2], this.data.detail, function (res, xhr) {
      console.log("network.addOrUpdateAddress result:" + res.data);
      if (res.data.code == config.SUCCESS_CODE) {
        wx.showToast({
          title: message,
        })
      }
    });
    app.globalData.isBack = true;
    wx.navigateBack({
      delta: 1
    })
  }
})