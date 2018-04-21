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
<<<<<<< HEAD
    active1: "active",
    active2: "",
    active3: "",
    bookingArray: new Array(),
    events: [],
    selected_state: 0,
    userInfo: [],
    eventType: [],
    userRole: [],
    eventState: [],
    select_tab: 0,
    filter_role: 1,
    filter_type: 0,
    filter_start: '',
    filter_end: '',
    select_type: 0,
    select_role: 1,
    select_start: '',
    select_end: '',
    starttime: '开始时间',
    endtime: '结束时间'
  },
  onLoad: function () {
    this.setData({
      userInfo: app.globalData.userInfo,
      eventType: app.globalData.eventType,
      userRole: app.globalData.userRole,
      eventState: app.globalData.eventState
    });
    var that = this;
    //http://restapi.amap.com/v3/geocode/regeo?key=Your key&location=116.481488,39.990464&poitype=&radius=&extensions=all&batch=false&roadlevel=0
    wx.getLocation({
      success: function (res) {
        var longitude = res.longitude;
        var latitude = res.latitude;
        var url = 'http://restapi.amap.com/v3/geocode/regeo?key=8eb63e36d0b6d7d29a392503a4a80f6c&location=' + longitude + ',' + latitude + '&poitype=&radius=&extensions=all&batch=false&roadlevel=0';
        wx.request({
          url: url,
          success: function (res) {
            var province = res.data.regeocode.addressComponent.province
            wx.request({
              url: app.globalData.mainURL + 'api/getEventsByProvince',
              method: 'POST',
              header: {
                'content-type': 'application/json'
              },
              data: {
                province: province,
                user_id: app.globalData.userInfo.user_id
              },
              success: function (res) {
                console.log(res)
                var event_buf = res.data.result;
                if (event_buf != null) {
                  for (var index = 0; index < event_buf.length; index++) {
                    var time = event_buf[index].start_time.split(':');
                    event_buf[index].start_time = time[0] + ':' + time[1];
                    if (event_buf[index].current_member == null) {
                      event_buf[index].current_member = 0;
                    }
                  }
                  console.log(event_buf)
                  that.setData({
                    events: event_buf,
                  })
                }
              }
            })
          }
        })
      },
    })
=======
  },
  onLoad: function () {
>>>>>>> d9384fb835d96b6b8c2290b24abda7c6e82c36cd
  },
  select: function (event) {
    if (app.globalData.currentpage != event.currentTarget.id) {
      if (event.currentTarget.id != '') {
        wx.redirectTo({
          url: "../" + event.currentTarget.id + '/' + event.currentTarget.id,
          success: function (res) {
            app.globalData.currentpage = event.currentTarget.id
          }
        })
      }
    }
  },
  on_click_create_event: function () {
    console.log(app.globalData.userInfo.state)
    if (app.globalData.userInfo.state == 0 || app.globalData.userInfo.state == 3) {
      wx.showModal({
        title: '提示',
        content: '是未注册的使用者',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../profile/auth/auth',
            })
          } else if (res.cancel) {
          }
        }
      })
      return;
    }
    if (app.globalData.userInfo.state == 1) {
      wx.showModal({
        title: '提示',
        content: '正在注册。 请稍等。',
        showCancel: false,
      })
      return;
    }
    wx.navigateTo({
      url: '../other/create_event/create_event',
    })
  },
  On_click_favourite: function (e) {

  },
  On_click_modal_open: function (e) {
    this.data.showModal = 1
    this.setData({ showModal: this.data.showModal })
  },
  selectTab: function (e) {
    if (e.currentTarget.id == 'tab-btn1' & this.data.active1 == "") {
      this.setData({ active1: "active" })
      this.setData({ active2: "" })
      this.setData({ select_tab: 0 })
    }
    if (e.currentTarget.id == 'tab-btn2' & this.data.active2 == "") {
      this.setData({ active1: "" })
      this.setData({ active2: "active" })
      this.setData({ select_tab: 1 })
    }
  },
  On_click_hide: function () {
    this.data.showModal = 0;
<<<<<<< HEAD
    this.setData({ showModal: 0 })
  },
  click_detail_event: function (event) {
    wx.navigateTo({
      url: '../index/detail_event/detail_event?id=' + event.currentTarget.id,
    })
  },
  hideModal: function () {
    this.data.showModal = 0;
    this.setData({ showModal: 0 })
  },
  on_click_role: function (event) {
    if (event.currentTarget.id == 2) {
      this.setData({
        modal_active1: "",
        modal_active2: "active",
        filter_role: 2
      })
    }
    else {
      this.setData({
        modal_active1: "active",
        modal_active2: "",
        filter_role: 1
      })
    }
  },
  on_click_type: function (event) {
    var event_type = event.currentTarget.id
    this.setData({
      filter_type: event_type
    })
  },
  change_filter: function () {
    this.setData({
      select_type: this.data.filter_type,
      select_role: this.data.filter_role,
      select_start: this.data.filter_start,
      select_end: this.data.filter_end
    })
    this.hideModal()
  },
  starttime_picker: function (e) {
    this.setData({
      starttime: e.detail.value
    })
  },
  endtime_picker: function (e) {
    this.setData({
      endtime: e.detail.value
    })
=======
    this.setData({ showModal: 0})
>>>>>>> d9384fb835d96b6b8c2290b24abda7c6e82c36cd
  }
})
