//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    img_black_start_src: '../../../image/star_n@2x.png',
    img_yellow_start_src: '../../../image/star_s@2x.png',
    star_img_position: 122,
    count_yellowStar: 3,
    text_count: 0,
  },
  onLoad: function () {
    wx.showToast({
      title: '啦啦啦啦啦',
      icon: "none",
      duration: 2000
    });
  },
  bindInputText: function (e) {
    this.setData({text_count: e.detail.cursor})
  },

  additionStar: function (event) {
    this.setData({ count_yellowStar: this.data.count_yellowStar + 1 })
  },

  subtractStar: function (event) {
    this.setData({ count_yellowStar: this.data.count_yellowStar - 1 })
  }
})
