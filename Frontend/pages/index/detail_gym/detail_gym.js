var app = getApp()
Page({
  data: {
    param: [{ "phonenumber": 17642518820, "status": "进行中", "kind": "football", "user": "user", "match": "football", "membernum": "5", "cost": 12, "date": "2018", "place": "bejing", "iscomment": 0 }],
    gym_info: {
      "gym_name": "北京大学体育馆", "gym_point": 4.3, "gym_comment": 200, "event_date": "2018-02-22 13:00",
      "detail_place": "北京大学体育馆23号足球场", "gym_intro": "",
      "gym_service": "玩的很愉快玩的很愉快玩的很愉快玩的很愉快玩的很愉快玩的很愉快玩的很愉快玩的很愉快玩的很愉快玩的很愉快玩的很愉快",
      "event_total": 10
    },
    images: [],
  },
  onLoad: function (options) {
    this.setData({ param: this.data.param })
    // set swiper image
    this.setData({
      images: ["../../../image/temp.jpg", "../../../image/my_bee@3x.png", "../../../image/success@3x.png"]
    })
  },
  click_detail_event: function () {
    wx.navigateTo({
      url: '../detail_event/detail_event',
    })
  },
  on_Clicked_Comment: function () {
    wx.navigateTo({
      url: '../detail_event/detail_event',
    })
  }
})  