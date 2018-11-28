// pages/appointment/appointment.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['广东省', '广州市', '海珠区'],
    date: '2016-09-01',
    array: ['上午', '下午'],
    index: 0,
    numberArray: ['贵A123456', '贵A111111'],
    numberIndex: 0,
    address:'',
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
    wx.getStorage({
      key: 'ad_info',
      success(res) {
        console.log(res.data)
        var province= res.data.province;
        var city = res.data.city;
        var district = res.data.district;
        var myRegion = [province, city, district]
        _this.setData({
          region: myRegion
        })
      }
    });
    wx.getStorage({
      key: 'address',
      success(res) {
        console.log(res.data)
        var address = res.data;
        _this.setData({
          address: address
        })
      }
    })
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
    wx.navigateTo({
      url: '../location/location',
    })
  }
})