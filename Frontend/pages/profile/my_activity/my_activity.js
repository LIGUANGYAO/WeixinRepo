// pages/booking/booking.js
const app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    active1: "active",
    active2: "",
    active3: "",
    bookingArray: new Array(),
    selectedtab:"booked",
    events:[],
    selected_state:0,
    userInfo: [],
    eventType: [],
    userRole: [],
    eventState: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (query) {
    this.setData({
      userInfo: app.globalData.userInfo,
      eventType: app.globalData.eventType,
      userRole: app.globalData.userRole,
      eventState: app.globalData.eventState
    });
    var that = this;
    wx.request({
      url: app.globalData.mainURL+'api/getAllEvents',
      method: 'POST',
      header:{
        'content-type': 'application/json'
      },
      data:{
        'user_id': app.globalData.userInfo.user_id
      },
      success: function(res)
      {
        console.log(res);
        var event_buf = res.data.result;
        if(event_buf!=null){
          for(var index = 0; index<event_buf.length; index++)
          {
            event_buf[index].avatar = app.globalData.uploadURL+event_buf[index].avatar;
            var time = event_buf[index].start_time.split(':');
            event_buf[index].start_time = time[0] + ':' +time[1];
          }
          that.setData({
            events: event_buf,
          })
        }
      }
    })
  },
  /**
 * This function is called after user select one of the tabs
 */

  selectTab: function (event) {
    this.setData({ active1: " " });
    this.setData({ active2: " " });
    this.setData({ active3: " " });
    switch (event.currentTarget.id) {
      case "btn1":
        this.setData({ active1: "active" });
        this.setData({selected_state:0});
        break;
      case "btn2":
        this.setData({ active2: "active" });
        this.setData({ selected_state: 1 });
        break;
      case "btn3":
        this.setData({ active3: "active" });
        this.setData({ selected_state: 2});
        break;
    }
  },
  //called when user clicked cancel event button.
  btn_remove_booking: function (event) {
    var index = event.target.id;
    var that = this;
    wx.showModal({
      content: '是否取消蜂约？',
      success: function (res) {
        if (res.confirm) {
          var start_time = that.data.events[index].start_time;
          var date = new Date().getUTCMilliseconds(start_time);
          var now  = new Date().getDate();
          console.log(now);
          console.log(date);
          var data = Date.now();
          console.log(data);
          console.log(data-date);
          /*wx.navigateTo({
            url: '../final_cancel/final_cancel',
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })*/
        } else if (res.cancel) {
        }
      }
    })
  },
  //called when user wants to see detail
  click_detail_event: function(event)
  {
    wx.navigateTo({
      url: 'eventdetail?id='+event.currentTarget.id,
    })
  },
  //called when user wants to write comment
  btn_write_comment: function(event)
  {
    wx.navigateTo({
      url: '../../evaluation/evaluation',
    })
  }
})