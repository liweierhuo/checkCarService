// pages/details/details.js
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
    station: {},
    markers: [{
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      label:{
        display:"ALWAYS",
        borderRadius:5,
        borderWidth:1,
        bgColor:'#fff',
        borderColor:"#aeaeae",
        padding:5,
        content: "均运汽车检测有限公司\n地址：贵州省贵阳市白云区\n电话：1360000000"
      }
    }],
  },
  next: function () {
    var _this = this;
    var orderPreData = JSON.parse(wx.getStorageSync(config.TAKE_ORDER_KEY));
    var mobile = orderPreData.mobile;
    var car_number = orderPreData.carNumber;
    var snap_address = orderPreData.region[0] + orderPreData.region[1] + orderPreData.region[2] + orderPreData.detail;
    var app_date = orderPreData.date;
    var app_time = config.timeRange[''+orderPreData.time+''];
    network.takeOrder(this.data.station.id, mobile, car_number, snap_address, app_date, app_time,function(res,xhr){
      console.log("network.takeOrder res:"+res);
      if (res.data.code == config.SUCCESS_CODE) {
        res.data.result.stationId = _this.data.station.id;
        res.data.result.stationName = _this.data.station.name;
        wx.setStorageSync(config.ORDER_INFO_KEY, JSON.stringify(res.data.result));
        wx.navigateTo({
          url: '../pretrialConfirmation/pretrialConfirmation?stationName=' + _this.data.station.name + '&stationId=' + _this.data.station.id,
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon:'none'
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.info("stationId:"+options.stationId);
    this.getStationInfo(options.stationId);
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
        url: '../recommend/recommend',
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
  makePhoneCall(e) {
    console.info("id:" + e.currentTarget.dataset.phone);
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone,
      success() {
        console.log('成功拨打电话')
      }
    })
  },
  getStationInfo : function (id) {
    var _this = this;
    network.getStationDetail(id ,function (res, xhr) {
      console.log(res.data);
      if (res.data.code = config.SUCCESS_CODE) {
        console.info("res.result" + res.data.result);
        if (res.data.result != undefined && res.data.result != null
          && res.data.result != '') {
          var marker = {
            id: 0,
            latitude: res.data.result.latitude,
            longitude: res.data.result.longitude,
            label: {
              display: "ALWAYS",
              borderRadius: 5,
              borderWidth: 1,
              bgColor: '#fff',
              borderColor: "#aeaeae",
              padding: 5,
              content: res.data.result.name + "\n地址：" + res.data.result.address + "\n电话："
                + res.data.result.mobile,
            }
          };
          var myMarkers = new Array(1);
          myMarkers[0] = marker;
          _this.setData({
            station: res.data.result,
            markers: myMarkers,
          });
        }
      }
    });
  },
  previewImage : function () {
    wx.previewImage({
      current: this.data.station.log_img.url, // 当前显示图片的http链接
      urls: [this.data.station.log_img.url], // 需要预览的图片http链接列表
      success: function (res) {
        // success
      },
      fail: function (res) {
        // fail
        console.log(res)
      },
      complete: function (res) {
        // complete
        //console.log(res)
      }
    });
  },
})