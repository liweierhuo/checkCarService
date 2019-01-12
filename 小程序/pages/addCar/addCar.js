// pages/addCar/addCar.js
var util = require('../../utils/util.js');
var config = require('../../config.js');
var network = require('../../network.js');
import Page from '../../common/page';
import Notify from '../../miniprogram_npm/vant-weapp/notify/notify.js';
var handleLogin = require('../../utils/handleLogin.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carNumber:'',
    array: ['京', '津', '沪', '渝', '冀', '豫', '云', '辽', '黑', '湘', '皖', '鲁', '新', '苏', '浙', '赣', '鄂', '桂', '甘', '晋', '蒙', '陕', '吉', '闽', '贵', '粤', '青', '藏', '川', '宁', '琼', '使', '领'],
    index: 24,
    carImgSrc:'../../img/uploadBg.jpg',
    carId:'',
  },
  showTakePhoto() {
    wx.showToast({
      title: '智能识别功能尚未开放，请手动添加',
      icon:'none'
    })
  },
  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value
    })
  },

  carNumberInput: function (e) {
    var car_number = e.detail.value;
    console.log("carNumberInput" + car_number);
    if (util.isNotBlank(car_number)) {
      this.setData({
        carNumber: car_number.toUpperCase(),
      })
      return car_number.toUpperCase();
    }
  },

  saveFunc: function () {
    console.info("this.carNumber==" + this.data.carNumber);
    if (!util.isNotBlank(this.data.carNumber)) {
      Notify('请输入车牌号');
      return;
    }
    var fullCarNumber = this.data.array[this.data.index]+this.data.carNumber;
    var re = /^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{4}[A-Z_0-9\u4e00-\u9fa5]{1,2}$/;
    if (!re.test(fullCarNumber)) {
      Notify('请输入正确的车牌号码');
      return;
    }
    console.info("this.carId==" + this.data.carId);
    if (this.data.carId) {
      network.updateCarInfo(this.data.carId, fullCarNumber, function (res, xhr) {
        console.log("network.updateCarInfo result:" + res.data);
        if (res.data.code == config.SUCCESS_CODE) {
          wx.showToast({
            title: '修改成功',
          })
        }
      });
    } else {
      network.addCard(fullCarNumber, function (res, xhr) {
        console.log(res.data);
        if (res.data.code == config.SUCCESS_CODE) {
          wx.showToast({
            title: '添加成功',
          })
        }
      });
    }
    app.globalData.isBack = true;
    wx.navigateBack({
      delta: 1
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    console.info("stationId:" + options.carId);
    if (util.isNotBlank(options.carId)) {
      _this.getCarInfoById(options.carId);
    }
  },

  getCarInfoById: function (id) {
    var _this = this;
    network.getCarDetail(id, function (res, xhr) {
      if (res.data.code == config.SUCCESS_CODE) {
        var resultCarNumber = res.data.result.car_number;
        var carNumberPrefix = util.getChinese(resultCarNumber);
        var carNumberArrayIndex = 24;
        for (var i = 0; i< _this.data.array.length; i++) {
          if (carNumberPrefix == _this.data.array[i]) {
            carNumberArrayIndex = i;
          }
        }
        _this.setData({
          carNumber: util.removeChinese(resultCarNumber),
          carId: res.data.result.id,
          index: carNumberArrayIndex
        });
      }
    });
  },


  recognitionCard() {
    var _this = this;
    var token = handleLogin.isLogin();
    wx.chooseImage({
      sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      count: 1,
      success: res => {
        console.log(res.tempFilePaths);
        var tempFilePaths = res.tempFilePaths;
        _this.setData({
          carImgSrc: tempFilePaths[0],
        })
        wx.showLoading({
          title: '上传中',
        })
        wx.uploadFile({
          url: config.recognitionCard,
          filePath: tempFilePaths[0],
          name: 'card',
          formData: {},
          header: {
            "Content-Type": "multipart/form-data;charset=UTF-8",
            'token': token
          },
          success: function (res) {
            console.log("wx.uploadFile res :" + res.data);
            var data = JSON.parse(res.data);
            if (data.code == config.SUCCESS_CODE) {
              wx.showToast({
                title: '上传成功',
              })
              var resultCarNumber = data.result.car_number;
              var carNumberPrefix = util.getChinese(resultCarNumber);
              var carNumberArrayIndex = 24;
              for (var i = 0; i < _this.data.array.length; i++) {
                if (carNumberPrefix == _this.data.array[i]) {
                  carNumberArrayIndex = i;
                }
              }

              _this.setData({
                
                carNumber: util.removeChinese(resultCarNumber),
                index: carNumberArrayIndex,
                carId: data.result.id,
              })
            } else {
              wx.showToast({
                title: data.msg,
                icon: 'none'
              })
              _this.setData({
                carImgSrc: tempFilePaths[0],
                carNumber: data.result.car_number,
              })
            }
          },
          complete: function (res) {
          }
        });

      }
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
    return {
      title: '返回首页',
      path: '/pages/index/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})