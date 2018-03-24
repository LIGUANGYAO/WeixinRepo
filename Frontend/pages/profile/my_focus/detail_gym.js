var app = getApp()
Page({
  data: {
    param: [{ "phonenumber": 17642518820, "status": "进行中", "kind": "football", "user": "user", "match": "football", "membernum": "5", "cost": 12, "date": "2018", "place": "bejing", "iscomment": 0 }],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 100,
    loadingHidden: false,  // loading
    images: [],
  },
  onLoad: function (options) {
    this.setData({ param: this.data.param })
    this.setData({
      images: ["../../../image/temp.jpg", "../../../image/my_bee@3x.png", "../../../image/success@3x.png"]
    })
  },
  click_detail_event: function()
  {
    wx.navigateTo({
      url: 'detail_event',
    })
  }
})  