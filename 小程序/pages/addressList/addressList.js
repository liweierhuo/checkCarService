// pages/address/addressList/addressList.js
var app = getApp();
var util = require('../../utils/util.js');
const config = require('../../config');
var network = require('../../network.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList:[],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAddressList();
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
      this.getAddressList();
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
  goAddAddress:function() {
    wx.navigateTo({
      url: '../addAddress/addAddress',
    })
  },

  updateAddress:function(e) {
    console.info("updateAddress param id:" + e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '../addAddress/addAddress?addressId=' + e.currentTarget.dataset.id,
    })
  },
  getAddressList : function () {
    var _this = this;
    network.addressList(function(res,xhr){
      if(res.data.code == config.SUCCESS_CODE) {
        console.log("network.addressList res:"+res);
        _this.setData({
          addressList: res.data.result,
        });
      }
    });
  },

  //用户选择收货地址
  chooseAddress: function () {
    var that = this;
    if (wx.chooseAddress) {
      wx.chooseAddress({
        success: function (res) {
          console.log(JSON.stringify(res));
          console.log(res);
          network.addOrUpdateAddress('', res.provinceName, 
            res.cityName, res.countyName, res.detailInfo, function (res, xhr) {
              console.log("network.addOrUpdateAddress result:" + res.data);
              if (res.data.code == config.SUCCESS_CODE) {
                wx.showToast({
                  title: '获取成功',
                });
                that.getAddressList();
              }
            });
        },
        fail: function (err) {
          console.log(JSON.stringify(err));
          console.info("收货地址授权失败");
          wx.showToast({
            title: '授权失败，重新授权请删除小程序后再次进入',
            icon: 'none',
            duration: 2000
          })
        }
      })
    } else {
      console.log('当前微信版本不支持chooseAddress');
    }
  },

})