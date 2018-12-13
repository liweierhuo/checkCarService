const config = require('../../config');
var network = require('../../network.js');
var app = getApp();
Page({
  data: {
    addressList: [],
    items: [
      {
        content:'啊实打实大师啊实打实大师啊实打实大师啊实打实大师啊实打实大师啊实打实大师啊实打实大师啊实打实大师啊实打实大师啊实打实大师啊实打实大师啊实打实大师',
        isTouchMove: false //默认隐藏删除
      },
      {
        content: '啊实打实大师',
        isTouchMove: false //默认隐藏删除
      }
    ],
    startX: 0, //开始坐标
    startY: 0
  },
  onLoad: function(e) {
    this.getAddressList();
  },
  //手指触摸动作开始 记录起点X坐标
  touchstart: function(e) {
    //开始触摸时 重置所有删除
    this.data.addressList.forEach(function(v, i) {
      if (v.isTouchMove) //只操作为true的
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      addressList: this.data.addressList
    })
  },
  //滑动事件处理
  touchmove: function(e) {
    var that = this,
      index = e.currentTarget.dataset.index, //当前索引
      startX = that.data.startX, //开始X坐标
      startY = that.data.startY, //开始Y坐标
      touchMoveX = e.changedTouches[0].clientX, //滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY, //滑动变化坐标
      //获取滑动角度
      angle = that.angle({
        X: startX,
        Y: startY
      }, {
        X: touchMoveX,
        Y: touchMoveY
      });
    that.data.addressList.forEach(function(v, i) {
      v.isTouchMove = false
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX) //右滑
          v.isTouchMove = false
        else //左滑
          v.isTouchMove = true
      }
    })
    //更新数据
    that.setData({
      addressList: that.data.addressList
    })
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
  * 计算滑动角度
  
  * @param {Object} start 起点坐标
  
  * @param {Object} end 终点坐标
  
  */
  angle: function(start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },
  //删除事件
  del: function(e) {
    var _this = this;
    this.data.addressList.splice(e.currentTarget.dataset.index, 1)
    network.deleteAddress(e.currentTarget.dataset.id, function (res, xhr) {
      console.log(res);
      if (res.data.code == config.SUCCESS_CODE) {
        wx.showToast({
          title: '删除成功',
        });
        _this.setData({
          addressList: _this.data.addressList
        })
      }
    });

  
  },
  goChange:function(){
    console.log("435")
  },
  goAddAddress: function () {
    wx.navigateTo({
      url: '../addAddress/addAddress',
    })
  },

  updateAddress: function (e) {
    console.info("updateAddress param id:" + e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '../addAddress/addAddress?addressId=' + e.currentTarget.dataset.id,
    })
  },
  getAddressList: function () {
    var _this = this;
    network.addressList(function (res, xhr) {
      if (res.data.code == config.SUCCESS_CODE) {
        console.log("network.addressList res:" + res);
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