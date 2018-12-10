//index.js
//获取应用实例
const app = getApp()
import Page from '../../common/page';
Page({
  data: {
    imgSrc: "../../img/upload.png",
    selected: true,
  },
  selected: function (e) {
    let that = this
    this.setData({
      selected: true
    })
  },
  selected1: function (e) {
    let that = this
    this.setData({
      selected: false
    })
  },
  goMy:function(){
    wx.navigateTo({
      url: '../personal/personal'
    })
  },
  goAppointment:function(){
    wx.navigateTo({
      url: '../appointment/appointment'
    })
  },
  goUploadDriving: function () {
    wx.navigateTo({
      url: '../uploadDrivingLicense/uploadDrivingLicense'
    })
  },
  onLoad: function () {

  },

})
