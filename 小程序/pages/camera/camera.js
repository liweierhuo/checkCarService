// pages/camera/camera.js
import Page from '../../common/page';
const config = require('../../config');
var handleLogin = require('../../utils/handleLogin.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tip:"请按提示拍照！点击照片进行",
    currentStep:1,
    finish:false, //是否完成拍照
    photoStep: {
      1: { tip: '请拍车辆左前45度照片。', complete: false, type: 1, photo: config.imageServer + 'left45.png' },
      2: { tip: '请拍车辆右后45度照片。', complete: false, type: 2, photo: config.imageServer + 'right45.png' },
      3: { tip: '请拍车辆前轮胎花纹照片。', complete: false, type: 3, photo: config.imageServer + 'front.png' },
      4: { tip: '请拍车辆后轮胎花纹照片。', complete: false, type: 4, photo: config.imageServer + 'rear.png' },
      5: { tip: '请拍车辆侧面照片。', complete: false, type: 5, photo: config.imageServer + 'side.png' },
    }
  },
  takePhoto() {
    var _this = this;
    var token = handleLogin.isLogin();
    wx.chooseImage({
      sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      count:1,
      success: res => {
        console.log(res.tempFilePaths);
        var tempFilePaths = res.tempFilePaths;
        var photoStep = {
          1: { tip: '请拍车辆左前45度照片。', complete: false, type: 1, photo: config.imageServer + 'images/left45.png'},
          2: { tip: '请拍车辆右后45度照片。', complete: false, type: 2, photo: config.imageServer + 'images/right45.png'},
          3: { tip: '请拍车辆前轮胎花纹照片。', complete: false, type: 3, photo: config.imageServer +'images/front.png' },
          4: { tip: '请拍车辆后轮胎花纹照片。', complete: false, type: 4, photo: config.imageServer + 'images/rear.png' },
          5: { tip: '请拍车辆侧面照片。', complete: false, type: 5, photo: config.imageServer+'images/side.png' },
        };
        photoStep[_this.data.currentStep].photo = tempFilePaths;
        
        wx.showLoading({
          title: '上传中',
        })
        wx.uploadFile({
          url: config.uploadImage,
          //url: 'http://10.23.10.60:8001/lifen/video/upload.json',
          filePath: tempFilePaths[0],
          name: 'image',
          formData: {
            'type': photoStep[_this.data.currentStep].type
          },
          header: {
            "Content-Type": "multipart/form-data;charset=UTF-8",
            'token': token
          },
          success: function (res) {
            console.log("wx.uploadFile res :"+res.data);
            var data = JSON.parse(res.data);  
            if (data.code == config.SUCCESS_CODE) {
              photoStep[_this.data.currentStep].complete = true;
              wx.showToast({
                title: '上传成功',
              })
              _this.setData({
                photoStep: photoStep
              })
            } else {
              wx.showToast({
                title: data.msg,
                icon:'none'
              })
              _this.setData({
                photoStep: photoStep
              })
            }
          },
          complete:function(res) {
          }
        });
        
      }
    })
  },
  next:function() {
    var currentStep = parseInt(parseInt(this.data.currentStep) + 1);
    if (currentStep <= 5) {
      this.setData({
        currentStep: currentStep
      })
    } else {
      this.setData({
        tip:'查验资料采集完毕',
        finish: true,
      })
    }

  },
  error(e) {
    console.log(e.detail)
  },
  goResutPage:function() {
    wx.navigateTo({
      url: '../review/review'
    })
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

  }
})