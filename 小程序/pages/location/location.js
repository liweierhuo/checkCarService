// pages/location/location.js
var QQMapWX = require('../../libs/qqmap-wx-jssdk.min.js');
var util = require('../../utils/util.js');
import Page from '../../common/page';
var qqmapsdk;
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: 23.099994,
    longitude: 113.324520,
    ads: [],
    addressList:[],
    keyword:'',
    page_size:20,
    page_index:1,
    totalCount : 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: app.globalData.QQ_MAP_APP_KEY,
    });

    wx.getLocation({
      type: 'wgs84',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
        _this.setData({
          latitude: latitude,
          longitude: longitude,
        })
      }
    });
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
  // 事件触发，调用接口
  nearby_search: function (keyword, page_size, page_index) {
    var _this = this;
    var locationStr = this.data.latitude + "," + this.data.longitude
    // 调用接口
    qqmapsdk.search({
      keyword: this.data.keyword,  //搜索关键词
      location: locationStr,  //设置周边搜索中心点
      page_size: page_size,
      page_index: page_index,
      success: function (res) { //搜索成功后的回调
        for (var i = 0; i < res.data.length; i++) {
          _this.data.ads.push({ // 获取返回结果，放到mks数组中
            title: res.data[i].title,
            address: res.data[i].address,
            ad_info: res.data[i].ad_info,
          })
        }
        _this.setData({ //设置markers属性，将搜索结果显示在地图中
          addressList: _this.data.ads,
          totalCount: res.count
        })
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
      }
    });
  },
  bindconfirm: function (event) {
    console.info(event);
    this.setData({
      keyword: event.detail.value,
      ads:[],
      page_index:1,
    });

    this.nearby_search(event.detail.value, this.data.page_size, this.data.page_index);
  },
  onReachBottom(){
    console.info("12341234");
    if (util.getPages(this.data.totalCount, this.data.page_size) > this.data.page_index) {
      var currentPage = this.data.page_index;
      this.setData({
        page_index: currentPage+1,
      });
      this.nearby_search(this.data.keyword, this.data.page_size, this.data.page_index);
    }
  },
  selectedThis: function (e) {
    console.info("id:" + e.currentTarget.dataset.address);
    console.info("id:" + e.currentTarget.dataset.ad_info);
    wx.setStorageSync('ad_info', e.currentTarget.dataset.ad_info);
    wx.setStorageSync('address', e.currentTarget.dataset.address);
    wx.navigateBack({
      delta: 1
    })
  }
})