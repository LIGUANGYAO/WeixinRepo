//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    activity: ["../../image/activity_n@2x.png", "../../image/activity_s@2x.png"],
    fengti: ["../../image/Home_n@2x.png", "../../image/Home_s@2x.png"],
    garden: ["../../image/garden_n@2x.png", "../../image/garden_s@2x.png"],
    mine: ["../../image/my_n@2x.png", "../../image/my_s@2x.png"],
    sport_kind_text: ["足球", "篮球", "排球", "羽毛球", "乒乓球", "台球", "网球", "保龄球", "健身馆", "瑜伽", "游泳", "射击射箭", "跆拳道", "滑冰", "滑雪", "休闲桌游", "运动装备", "其他"],
    selected: [0, 1, 0, 0],
    active1: "active",
    active2: "",
    modal_active1: "active",
    modal_active2: "",
    array: [{ "phonenumber": 17642518820, "status": "进行中", "kind": "football", "user": "user", "match": "football", "membernum": "5", "cost": 12, "date": "2018", "place": "bejing", "iscomment": 0, "favourite": 200 }],
    showModal: 0,
  },
  onLoad: function () {
  },
  select: function (event) {
    wx.redirectTo({
      url: "../" + event.currentTarget.id + '/' + event.currentTarget.id,
    })
  },
  On_click_favourite: function (e) {

  },
  On_click_detail_event: function (e) {
    wx.navigateTo({
      url: 'detail_event/detail_event',
    })
  },
  On_click_modal_open: function (e) {
    this.data.showModal = 1
    this.setData({ showModal: this.data.showModal })
  },
  selectTab: function (e) {
    if (e.currentTarget.id == 'tab-btn1' & this.data.active1 == "")
    {
      this.setData({active1: "active"})
      this.setData({ active2: "" })
    }
    if(e.currentTarget.id == 'tab-btn2' & this.data.active2 == ""){
      this.setData({ active1: "" })
      this.setData({ active2: "active" })
    }
  },
  On_click_hide: function()
  {
    this.data.showModal = 0;
    this.setData({ showModal: 0})
  }
})
