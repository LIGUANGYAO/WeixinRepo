//index.js
//获取应用实例
const app = getApp()
var dtemp1, dtemp2
Page({
  data: {
    activity: ["../../image/activity_n@2x.png", "../../image/activity_s@2x.png"],
    fengti: ["../../image/Home_n@2x.png", "../../image/Home_s@2x.png"],
    garden: ["../../image/garden_n@2x.png", "../../image/garden_s@2x.png"],
    mine: ["../../image/my_n@2x.png", "../../image/my_s@2x.png"],
    selected: [0, 0, 1, 0],
    avatar: "../../image/temp.jpg",
  },
  onLoad: function () {
    this.setData({ total: app.globalData.honey_info.total_honey})
    this.setData({ honeybox_array : app.globalData.honey_info.honeybox_array})
    this.setData({ avatar: app.globalData.userInfo.avatar })
  },
  select: function (event) {
    wx.redirectTo({
      url: "../" + event.currentTarget.id + '/' + event.currentTarget.id,
    })
  },
  On_click_beeshop: function () {
    wx.navigateTo({
      url: 'mainbeeshop/mainbeeshop',
    })
  },
  On_click_beelist: function () {
    wx.navigateTo({
      url: 'transaction/transaction',
    })
  },
  On_click_comment: function(){
    wx.navigateTo({
      url: 'help/help',
    })
  },
  on_click_honey: function(event){
    for (var iter = 0; iter < app.globalData.honey_info.honeybox_array.length; iter++)
    {
      app.globalData.honey_info.total_honey += app.globalData.honey_info.honeybox_array[iter].honey
    }
    //app.globalData.honey_info.honeybox_array = new Array()
    this.setData({ total: app.globalData.honey_info.total_honey })
    this.setData({ honeybox_array: app.globalData.honey_info.honeybox_array})
  }
})
