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
    starparam: {
      stars: [0, 1, 2, 3, 4],

      srcImage_0: '../../../image/star-0.png',
      srcImage_1: '../../../image/star-1.png',
      srcImage_2: '../../../image/star-2.png',
      srcImage_3: '../../../image/star-3.png',
      srcImage_4: '../../../image/star-4.png',

      score: 4.3,
      srcImage: '',
    }
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
      url: '../detail_event/detail_event?stadium='+this.data.gym_info.gym_name,
    })
  },
  on_Clicked_Comment: function () {
    wx.navigateTo({
      url: '../../other/comment/comment',
    })
  }
})  