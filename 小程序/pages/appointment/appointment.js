// pages/appointment/appointment.js
var util = require('../../utils/util.js');
const config = require('../../config');
var network = require('../../network.js');
import WxValidate from '../../libs/WxValidate.js'
import Page from '../../common/page';
import Notify from '../../miniprogram_npm/vant-weapp/notify/notify.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: "../../img/face.png",
    nickName:'张三',
    region: ['广东省', '广州市', '海珠区'],
    date: '',
    timeArray: ['上午', '下午'],
    timeArrayIndex:0,
    numberArray: [],
    numberIndex: 0,
    detail:'',
    mobile:'',
    appStart:'',
    appEnd:'',
  },
  bindRegionChange: function (event) {
    console.log('picker发送选择改变，携带值为', event.detail)
    this.setData({
      region: event.detail.value
    })
  },
  timeChange:function(e) {
    this.setData({
      timeArrayIndex: e.detail.value
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindNumberChange: function (e) {
    this.setData({
      numberIndex: e.detail.value
    })
  },
  formSubmit: function (e) {
    // 传入表单数据，调用验证方法
    const params = e.detail.value;
    params.carNumber = this.data.numberArray[this.data.numberIndex];
    params.time = this.data.timeArray[this.data.timeArrayIndex];
    console.log(params)
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0];
      Notify(error.msg);
      return false
    }
    wx.setStorageSync(config.TAKE_ORDER_KEY, JSON.stringify(params));
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
      userInfo = JSON.parse(util.getUserInfoByStore());
    }
    if (userInfo != undefined && userInfo != null) {
      this.setData({
        avatarUrl: userInfo.avatarUrl,
        nickName: userInfo.nickName,
        date: util.formatTime(new Date(),1),
        appStart: util.formatTime(new Date(),1),
        appEnd: util.formatTime(new Date(),30),
      })
    }
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
    var _this = this;
    this.initValidate();
    if (app.globalData.isBack) {
      var userInfo;
      if (app.globalData.userInfo) {
        userInfo = app.globalData.userInfo;
      } else {
        userInfo = JSON.parse(util.getUserInfoByStore());
      }
      if (userInfo != undefined && userInfo != null) {
        this.setData({
          avatarUrl: userInfo.avatarUrl,
          nickName: userInfo.nickName,
          date: util.formatTime(new Date(), 1),
          appStart: util.formatTime(new Date(), 1),
          appEnd: util.formatTime(new Date(), 30),
        })
      }
      _this.getCarList();
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
      fail: function () {
        wx.getSetting({
          success: function (res) {
            var statu = res.authSetting;
            if (!statu['scope.userLocation']) {
              wx.showModal({
                title: '是否授权当前位置',
                content: '需要获取您的地理位置，请确认授权，否则定位功能将无法使用',
                success: function (tip) {
                  if (tip.confirm) {
                    wx.openSetting({
                      success: function (data) {
                        if (data.authSetting["scope.userLocation"] === true) {
                          wx.showToast({
                            title: '授权成功',
                            icon: 'success',
                            duration: 1000
                          })
                        } else {
                          wx.showToast({
                            title: '授权失败',
                            icon: 'none',
                            duration: 1000
                          })
                        }
                      }
                    })
                  }
                }
              })
            }
          },
          fail: function (res) {
            wx.showToast({
              title: '调用授权窗口失败',
              icon: 'success',
              duration: 1000
            })
          }
        })
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
        } 
      } else if(res.data.code == config.NO_DATA){
        wx.showModal({
          title: '提示',
          content: '您还没有添加车辆，现在去添加车辆',
          success(res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '../addCar/addCar',
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    })
  },
  initValidate() {
    const rules = {
      mobile: {
        required: true,
        tel: true
      }
    }
    const messages = {
      mobile: {
        required: '请填写手机号',
        tel: '请填写正确的手机号'
      }
    }
    this.WxValidate = new WxValidate(rules, messages)
  },
})