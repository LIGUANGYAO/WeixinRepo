//index.js
//获取应用实例
const app = getApp()
var amapFile = require('../../lib/amap-wx.js')
var myAmap = new amapFile.AMapWX({ key: "F8f1f5c8a20c199dd0f70f5a6b162280" })
var mapCtx
Page({
  data: {
    activity: ["../../image/activity_n@2x.png", "../../image/activity_s@2x.png"],
    fengti: ["../../image/Home_n@2x.png", "../../image/Home_s@2x.png"],
    garden: ["../../image/garden_n@2x.png", "../../image/garden_s@2x.png"],
    mine: ["../../image/my_n@2x.png", "../../image/my_s@2x.png"],
    selected: [1, 0, 0, 0],
    current_latitude: 0,
    current_longitude: 0,

    item_array: [{ id: 0, src: "../../image/move01@2x.png" }, { id: 1, src: "../../image/move02@2x.png" }, { id: 2, src: "../../image/move03@2x.png" }, { id: 3, src: "../../image/move04@2x.png" }, { id: 4, src: "../../image/move05@2x.png" }, { id: 5, src: "../../image/move06@2x.png" }, { id: 6, src: "../../image/move07@2x.png" }, { id: 7, src: "../../image/move08@2x.png" }, { id: 8, src: "../../image/move09@2x.png" }, { id: 9, src: "../../image/move10@2x.png" }, { id: 10, src: "../../image/move11@2x.png" }, { id: 11, src: "../../image/move12@2x.png" }, { id: 12, src: "../../image/move13@2x.png" }, { id: 13, src: "../../image/move14@2x.png" }, { id: 14, src: "../../image/move15@2x.png" }, { id: 15, src: "../../image/move16@2x.png" }, { id: 16, src: "../../image/move17@2x.png" },],

    show_array: [{ id: 0, src: "../../image/move01@2x.png" }, { id: 1, src: "../../image/move02@2x.png" }, { id: 2, src: "../../image/move03@2x.png" }, { id: 3, src: "../../image/move04@2x.png" }, { id: 4, src: "../../image/move05@2x.png" }, { id: 5, src: "../../image/move06@2x.png" }, { id: 6, src: "../../image/move07@2x.png" }, { id: 7, src: "../../image/move08@2x.png" }, { id: 8, src: "../../image/move09@2x.png" }, { id: 9, src: "../../image/move10@2x.png" }],
    marker: [],
    honey_array: [],
    realwidth: 750,
    realheight: 1344,
    uppoint: 0,
    downpoint: 9,
  },
  onLoad: function () {
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 1000)
    mapCtx = wx.createMapContext('my-map')
    var that = this
    var screen_pos = new Array()
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        that.data.current_latitude = res.latitude
        that.data.current_longitude = res.longitude
        that.setData({ current_latitude: that.data.current_latitude, current_longitude: that.data.current_longitude })
        mapCtx.getRegion({
          success: function (res1) {
            screen_pos[0] = res1.southwest.longitude
            screen_pos[1] = res1.southwest.latitude
            screen_pos[2] = res1.northeast.longitude
            screen_pos[3] = res1.northeast.latitude
            wx.request({
              url: app.globalData.mainURL + 'api/getItemsOnMap',
              data: {
                latitude: that.data.current_latitude,
                longitude: that.data.current_longitude
              },
              method: 'POST',
              header: {
                'content-type': 'application/json'
              },
              success: function (res) {
                wx.getSystemInfo({
                  success: function (res2) {
                    var iter, posx, posy
                    for (iter = 0; iter < res.data.site.length; iter++) {
                      that.data.marker.push({
                        iconPath: "../../image/Business@3x.png",
                        id: res.data.site[iter].boss_id,
                        latitude: res.data.site[iter].latitude,
                        longitude: res.data.site[iter].longitude,
                        width: (69 / 750) * res2.screenWidth,
                        height: (73 / 1344) * res2.screenHeight,
                      })
                    }
                    that.setData({ markers: that.data.marker })
                    for (iter = 0; iter < res.data.honey.length; iter++) {
                      posx = (res.data.honey[iter].longitude - screen_pos[0]) / (screen_pos[2] - screen_pos[0]) * res2.windowWidth
                      posy = (res.data.honey[iter].latitude - screen_pos[3]) / (screen_pos[1] - screen_pos[3]) * (res2.windowHeight - (100 / 1344) * res2.screenHeight)
                      that.data.honey_array.push({
                        id: iter,
                        no: res.data.honey[iter].no,
                        left: posx,
                        top: posy,
                        longitude: res.data.honey[iter].longitude,
                        latitude: res.data.honey[iter].latitude,
                        amount: res.data.honey[iter].amount
                      })
                    }
                    that.setData({ honey_array: that.data.honey_array })
                  },
                })
              },
            })
          }
        })
      },
      fail(error) {
        console.log(error)
      }
    })
  },
  calc_pos() {
    var screen_pos = new Array();
    var that = this
    var honeytemparray = new Array();
    var posx, posy
    mapCtx.getRegion({
      success: function (res1) {
        screen_pos[0] = res1.southwest.longitude
        screen_pos[1] = res1.southwest.latitude
        screen_pos[2] = res1.northeast.longitude
        screen_pos[3] = res1.northeast.latitude
        wx.getSystemInfo({
          success: function (res2) {
            var iter;
            for (iter = 0; iter < that.data.honey_array.length; iter++) {
              posx = (that.data.honey_array[iter].longitude - screen_pos[0]) / (screen_pos[2] - screen_pos[0]) * res2.windowWidth
              posy = (that.data.honey_array[iter].latitude - screen_pos[3]) / (screen_pos[1] - screen_pos[3]) * (res2.windowHeight - (100 / 1344) * res2.screenHeight)
              honeytemparray.push({
                id: iter,
                no: that.data.honey_array[iter].no,
                left: posx,
                top: posy,
                longitude: that.data.honey_array[iter].longitude,
                latitude: that.data.honey_array[iter].latitude,
                amount: that.data.honey_array[iter].amount
              })
            }
            that.setData({ honey_array: honeytemparray })
            that.data.honey_array = honeytemparray

          },
        })
      }
    })
  },
  on_Click_maker: function (event) {
    wx.navigateTo({
      url: 'detail_gym/detail_gym?id=' + event.markId,
    })
  },
  select: function (event) {
    wx.redirectTo({
      url: "../" + event.currentTarget.id + '/' + event.currentTarget.id,
    })
  },
  on_regionchange: function (event) {
    this.calc_pos();
  },
  on_click_down: function (event) {
    if (this.data.downpoint < 16) {
      this.data.show_array.shift()
      this.data.downpoint++;
      this.data.uppoint++
      this.data.show_array.push(this.data.item_array[this.data.downpoint])
      this.setData({ show_array: this.data.show_array })
    }
  },
  on_click_up: function (event) {
    if (this.data.uppoint > 0) {
      this.data.show_array.pop()
      this.data.downpoint--;
      this.data.uppoint--
      this.data.show_array.unshift(this.data.item_array[this.data.uppoint])
      this.setData({ show_array: this.data.show_array })
    }
  },
  on_selectkind: function (event) {
    this.setData({ currentkind: this.data.item_array[event.currentTarget.id].src })
  },
  on_selhoney: function (event) {
    var x = this.distance(this.data.honey_array[event.currentTarget.id].latitude, this.data.honey_array[event.currentTarget.id].longitude,
      this.data.current_latitude, this.data.current_longitude)
    var vip = app.globalData.userInfo.isVIP + 1
    if (x < (2000 * vip))
    {
      var rand = Math.ceil(Math.random() * 500 * vip)
      if (rand + app.globalData.daily_honey[0] > (500 * vip))
      {
        rand = rand + app.globalData.daily_honey[0] - (500*vip)
      }
      if (rand > this.data.honey_array[event.currentTarget.id].amount)
      {
        //connect server with disappearing honey
        this.data.honey_array.splice(event.currentTarget.id, 1)
        app.gainNewHoney(this.data.honey_array[event.currentTarget.id].amount)
      }
      else{
        this.data.honey_array[event.currentTarget.id].amount -= rand
        app.gainNewHoney(rand)
      }
      this.setData({ honey_array: this.data.honey_array })
    }
  },
  distance:function(lat1, lon1, lat2, lon2) {
    var p = 0.017453292519943295;
    var c = Math.cos;
    console.log(c((lat2 - lat1) * p))
    var a = 0.5 - c((lat2 - lat1) * p) / 2 + c(lat1 * p) * c(lat2 * p) *
    (1 - c((lon2 - lon1) * p)) / 2
    return 12742000 * Math.asin(Math.sqrt(a)) // 2 * R; R = 6371 km
  }
})
