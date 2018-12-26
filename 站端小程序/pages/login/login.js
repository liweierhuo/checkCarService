// pages/login/login.js
import Page from '../../common/page';
const app = getApp();
var util = require('../../utils/util.js');
//const handleLogin = require('../../utils/handleLogin.js');
var config = require('../../config.js');
var network = require('../../network.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'',
    password:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*
    var userName = wx.getStorageSync(config.USER_NAME);
    if (util.isNotBlank(userName)) {
      wx.redirectTo({
        url: '../orderList/orderList',
      })
    }
    */
    var token = wx.getStorageSync(config.SESSION_KEY);
    var header = {
      'content-type': 'application/json', // 默认值
      'token': token
    };
    wx.request({
      url: config.getLoginInfo,
      header: header,
      success:function(res) {
        console.log("getLoginInfo res :"+res.data);
        if (res.data.code == config.SUCCESS_CODE) {
          return;
        } else if (res.data.code == config.SESSION_TIME_OUT) {
          wx.navigateTo({
            url: '../getUserInfo/getUserInfo',
          })
        }
      }
    })

  },

  usernameInput:function(e) {
    this.setData({
      username:e.detail.value,
    })
  },
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value,
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

  },
  login : function () {
    if (!util.isNotBlank(this.data.username)) {
      wx.showToast({
        title: '账户不能为空',
        icon:'none'
      })
      return false;
    }
    if (!util.isNotBlank(this.data.password)) {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none'
      })
      return false;
    }
    network.userLogin(this.data.username,this.data.password,function(res,xhr){
      console.log("network.userLogin res:"+res.data);
      if (res.data.code == config.SUCCESS_CODE) {
        wx.setStorageSync(config.USER_NAME, res.data.result.username);
        wx.redirectTo({
          url: '../orderList/orderList',
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon:'none'
        })
      }
    })

  }
})