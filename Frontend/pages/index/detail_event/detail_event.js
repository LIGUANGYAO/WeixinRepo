//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    event:[],
    booking: [],
    eventType: [],
    userRole: [],
    eventState: [],
    is_full: false,
    is_registered: false,
    register_amount: 0,
    btn_text:'立即参加',
    rating: 0,
    rating_amount: 0
  },
  onLoad: function (option) {
    wx.setNavigationBarTitle({
      title: '当前页面'
    })
    this.setData({
      userInfo: app.globalData.userInfo,
      eventType: app.globalData.eventType,
      userRole: app.globalData.userRole,
      eventState: app.globalData.eventState
    });
    var id = option.id;
    var that = this;
    this.setData({
      userInfo: app.globalData.userInfo,
      eventType: app.globalData.eventType,
      userRole: app.globalData.userRole,
      eventState: app.globalData.eventState
    });
    var that = this;
    var id = option.id;
    wx.request({
      url: app.globalData.mainURL + 'api/getEventDetail',
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      data: {
        'event_id': id,
        'user_id': app.globalData.userInfo.user_id
      },
      success: function (res) {
        console.log(res);
        var books = res.data.booking;
        var registered_num = 0;
        for (var index = 0; index < books.length; index++) {
          if(books[index].name == app.globalData.userInfo.name){
            that.setData({
              is_registered: true,
              is_disabled: true,
              btn_text: '已报名'
            })
            console.log(that.data.is_registered)
          }
          registered_num += 1*books[index].reg_num;
        }
        that.setData({
          register_amount: registered_num
        })
        if(registered_num==res.data.result[0].limit)
        {
          that.setData({
            is_disabled: true
          })
        }
        that.setData({
          booking: books,
        })
        that.setData({ rating: res.data.rating })
        var event_buf = res.data.result[0];
        event_buf.pic = app.globalData.uploadURL + event_buf.pic;
        if (event_buf.favourite_num == null) {
          event_buf.favourite_num = 0;
        }
        if(registered_num==event_buf.limit){
          that.setData({
            is_full: true,
            btn_text:'人数已满'
          })
        }
        if(that.data.is_registered == true)
        {
          that.setData({
            btn_text:'已报名'
          })
        }
        if(event_buf.state == 2){
          that.setData({
            btn_text: '已取消'
          })
        }
        var time = event_buf.start_time.split(':');
        event_buf.start_time = time[0] + ':' + time[1];
        time = event_buf.end_time.split(':');
        event_buf.end_time = time[0] + ':' + time[1];
        wx.setNavigationBarTitle({
          title: app.globalData.eventType[event_buf.type] + '比赛'
        })
        that.setData({
          event: event_buf,
          id: id
        });
      }
    })
    //code for liseter paticipate
  },

  btn_Clicked_Personal_Input: function (event) {
    wx.navigateTo({
      url: '../personal_input/personal_input?id='+event.currentTarget.id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  btn_Clicked_Gym_Info: function (event) {
    wx.navigateTo({
      url: '../detail_gym/detail_gym?id='+ event.currentTarget.id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  btn_Clicked_Favor:function(){
    if (this.data.rating == 0)
    {
      this.setData({ rating: 1 })
      this.data.rating_amount ++
      this.setData({rating_amount: this.data.rating_amount})
    }
    else{
      this.setData({ rating: 0 })
      this.data.rating_amount--
      this.setData({ rating_amount: this.data.rating_amount }) 
    }
    var that = this;
    wx.request({
      url: app.globalData.mainURL + 'api/setFavouriteEvent',
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      data: {
        'user_id': app.globalData.userInfo.user_id,
        'event_id': that.data.event.id
      },
      success: function(res)
      {
      }
    })
  }
})
