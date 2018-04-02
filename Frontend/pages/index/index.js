//index.js
//获取应用实例
var app = getApp()
var amapFile = require('../../lib/amap-wx.js')
Page({
  data: {
    activity: ["../../image/activity_n@2x.png", "../../image/activity_s@2x.png"],
    fengti: ["../../image/Home_n@2x.png", "../../image/Home_s@2x.png"],
    garden: ["../../image/garden_n@2x.png", "../../image/garden_s@2x.png"],
    mine: ["../../image/my_n@2x.png", "../../image/my_s@2x.png"],
    selected: [1, 0, 0, 0],
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
  /*
  onShow:function()
  {
    wx.request({
      url:app.globalData.mainURL+'api/getUserState',
      data:{
        'nickname':app.globalData.userInfo.nickname
      },
      method: 'POST',
      header:{
        'content-type':'application/json'
      },
      success: function(res){
        console.log(res);
        if (res.data.status == false) {
          wx.request({
            method: 'POST',
            header: {
              'content-type': 'application/json'
            },
            url: app.globalData.mainURL + 'api/addNewUser',
            data: {
              'nickname': app.globalData.userInfo.nickname,
              'avatar': app.globalData.userInfo.avatar
            },
            success: function (res) {
              console.log(res);
              //app.globalData.userInfo = res[0]
            }

          })
        }
      },
      fail: function(){
      }
    })
  },
  */
  select: function (event) {
    wx.redirectTo({
      url: "../" + event.currentTarget.id + '/' + event.currentTarget.id,
    })
  }
})
