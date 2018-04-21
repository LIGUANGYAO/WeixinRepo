const app = getApp()
var amapFile = require('../../../lib/amap-wx.js')
var myAmap = new amapFile.AMapWX({ key: "f8f1f5c8a20c199dd0f70f5a6b162280" })
var mapCtx
Page({
  data: {
    favorinput: [],
    isshow: 1
  },
  onLoad: function () {
    this.data.favorinput = wx.getStorageSync("favorinputtext")
    this.setData({ favorinput: this.data.favorinput})
  },
  //get tips by input
  on_input_text: function (res) {
    var that = this
    this.setData({isshow: 0})
    var keywords = res.detail.value;
    if (keywords == '') {
      that.setData({ tips: '' })
      return;
    }
    var curlat, curlong
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        curlat = res.latitude
        curlong = res.longitude
        myAmap.getInputtips({
          keywords: keywords,
          location: curlong+','+curlat,
          success: function (data) {
            if (data && data.tips) {
              that.setData({
                tips: data.tips
              });
            }
          }
        })
      }
    })
  },
  //click place
  on_bindSearch: function (res) {
    var that = this
    var keyword = res.target.dataset.keywords
    myAmap.getInputtips({
      keywords: keyword,
      location: '',
      success: function (data) {
        var i = 0
        while (data.tips[i].location.length == 0)
        {
          i ++
        }
        var long = data.tips[i].location.split(',')[0]
        var lat = data.tips[i].location.split(',')[1]
        that.data.favorinput.push({name: keyword, longitude: long, latitude: lat})
        wx.setStorageSync("favorinputtext", that.data.favorinput)
        wx.redirectTo({
          url: '../index?lat='+lat+'&long='+long,
        })
      }
    })
  },

  on_click_cancel: function () {
    this.setData({ isshow: 1 })
    this.setData({ tips: '' })
    this.setData({ inputtext: '' })
  },

  on_click_delete:function()
  {
    wx.setStorageSync("favorinputtext", [])
    this.setData({ favorinput: []})
  },

  on_click_favor_item:function(res)
  {
    var that = this
    wx.redirectTo({
      url: '../index?lat=' + that.data.favorinput[res.currentTarget.id].latitude + '&long=' + that.data.favorinput[res.currentTarget.id].longitude,
    })
  }
})