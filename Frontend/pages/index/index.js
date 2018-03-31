//index.js
//获取应用实例
const app = getApp()
var amapFile = require('../../lib/amap-wx.js')
Page({
  data: {
    current_latitude: 0,
    current_longitude: 0,
  },
  onLoad: function () {
    var that = this
    var myAmap = new amapFile.AMapWX({ key: "F8f1f5c8a20c199dd0f70f5a6b162280" });
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        that.data.current_latitude = res.latitude
        that.data.current_longitude = res.longitude
        that.setData({ current_latitude: that.data.current_latitude, current_longitude: that.data.current_longitude })
      }
    })
  },
})
