// pages/uploadDrivingLicense/uploadDrivingLicense.js
const app = getApp();
var util = require('../../utils/util.js');
var config = require('../../config.js');
var network = require('../../network.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src:'../../img/uploadBg.jpg',
    finish:false,
    array: ['贵A12345', '贵A111111'],
    index: 0,
    carNumber : '',
  },
  showPhoto:function(){
    this.setData({
      finish: true
    })
  },
  takePhoto:function(){
    /*
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          src: res.tempImagePath
        })
        wx.navigateTo({
          url: '../personal/personal'
        })
      }
    })
    */
    this.setData({
      finish: false
    })
    
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  carNumberInput: function(e) {
    console.log("carNumberInput" + e.detail.value);
    this.setData({
      carNumber: e.detail.value
    })
  },

  saveFunc : function() {
    console.info("this.carNumber=="+this.data.carNumber);
    network.addCard(this.data.carNumber, function (res, xhr){
      console.log(res.data);
      if (res.data.code == config.SUCCESS_CODE) {
        wx.showToast({
          title: '添加成功',
        })
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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