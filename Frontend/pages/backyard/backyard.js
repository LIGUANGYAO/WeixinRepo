//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    avatar: "../../image/temp.jpg",
    item: { x: 0, y: 0, honey: 0},
    honeybox_array: [{ x: 0, y: 0, honey: 0 }, { x: 9, y: 3, honey: 0 }]
  },
  onLoad: function () {
    this.setData({ avatar: app.globalData.userInfo.avatar })
  },
  On_click_beeshop: function()
  {
    wx.navigateTo({
      url: 'mainbeeshop/mainbeeshop',
    })
  },
  On_click_beelist: function()
  {
    wx.navigateTo({
      url: 'transaction/transaction',
    })
  }
})
