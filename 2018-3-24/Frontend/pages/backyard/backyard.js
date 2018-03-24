//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    activity: ["../../image/activity_n@2x.png", "../../image/activity_s@2x.png"],
    fengti: ["../../image/Home_n@2x.png", "../../image/Home_s@2x.png"],
    garden: ["../../image/garden_n@2x.png", "../../image/garden_s@2x.png"],
    mine: ["../../image/my_n@2x.png", "../../image/my_s@2x.png"],
    selected: [0, 0, 1, 0]
  },
  onLoad: function () {
  },
  select: function (event) {
    wx.navigateTo({
      url: "../" + event.currentTarget.id +'/'+event.currentTarget.id,
    })
  }
})
