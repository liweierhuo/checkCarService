// pages/myData/myData.js
import Page from '../../common/page';
const config = require('../../config');
var network = require('../../network.js');
import Notify from '../../miniprogram_npm/vant-weapp/notify/notify.js';
import WxValidate from '../../libs/WxValidate.js'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userData:{},
    genderArry:['男','女'],
    genderIndex:0,
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserData();
  },
  genderChange:function(e) {
    console.log("genderChange:"+e);
    this.setData({
      genderIndex: e.detail.value
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
    if (app.globalData.isBack) {
      this.getUserData();
      app.globalData.isBack = false;
    }
    this.initValidate();
  },
  clearUserInput:function() {
    this.getUserData();
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
  getUserData:function() {
    var _this = this;
    network.getUserData(function(res,xhr){
      console.log("network.getUserData res:"+res);
      if (res.data.code == config.SUCCESS_CODE) {
      _this.setData({
        userData: res.data.result,
        genderIndex: config.genderRange['' + res.data.result.gender+'']
      })
      }
    })
  },
  formSubmit: function (e) {
      // 传入表单数据，调用验证方法
    const params = e.detail.value;
    params.gender = parseInt(parseInt(params.gender)+1);
    console.log(params)
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0];
      Notify(error.msg);
      return false
    }
    wx.setStorageSync(config.USER_DATA_KEY, JSON.stringify(params));
    network.updateUserData(params.nickname, params.city, params.gender, params.mobile, function (res, xhr) {
      console.log("network.updateUserData res:" + res);
      if (res.data.code == config.SUCCESS_CODE) {
        wx.showToast({
          title: '修改成功',
        })
      }
    })
  },
  initValidate() {
    const rules = {
      nickname:{
        required: true,
      },
      mobile: {
        required: true,
        tel: true
      },
      city: {
        required: true,
      }
    }
    const messages = {
      nickname: {
        required: '昵称不能为空',
      },
      mobile: {
        required: '请填写手机号',
        tel: '请填写正确的手机号'
      },
      city:{
        required: '地区不能为空',
      }
    }
    this.WxValidate = new WxValidate(rules, messages)
  },

})