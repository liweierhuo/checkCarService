// pages/review/review.js
import Page from '../../common/page';
var util = require('../../utils/util.js'); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    completeList: [{ code: '2341', city: '武汉市' }, { code: '2341', city: '南京市' }],
    inputName:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  bindKeyInput:function(e) {
    var _this = this;
    console.log("bindKeyInput"+e.detail.value);
    if (util.isNotBlank(e.detail.value)) {
      util.getCityByKeyword(e.detail.value,function(res){
        console.log("util.getCityByKeyword res :"+res);
        if (res.status == 0 && res.data != undefined && res.data.length > 0) {
          var myCityList = [];
          for (var i = 0; i < res.data.length;i++) {
            var city = { code: res.data[i].adcode, city: res.data[i].city};
            myCityList.push(city);
          }
         _this.setData({
           completeList: myCityList
         }) 
        }
      });
    }
    
  },
  bindBlur: function (e) {
    this.setData({
      inputName: ''
    })
  },
  bindCity:function(e){
    console.info("bindCity city:" + e.currentTarget.dataset.city);
    wx.navigateTo({
      url: '../details/details?stationId=' + e.currentTarget.dataset.id,
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

  }
})