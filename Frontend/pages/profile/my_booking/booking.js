// pages/booking/booking.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    active1: "active",
    active2: "",
    active3: "",
    booking: [],
    selectedtab: 0,
    eventType: [],
    userRole: [],
    bookingState: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (query) {
    this.setData({
      userInfo: app.globalData.userInfo,
      eventType: app.globalData.eventType,
      userRole: app.globalData.userRole,
      bookingState: app.globalData.eventState
    });
    var that = this;
    wx.request({
      url: app.globalData.mainURL + 'api/getMyBooking',
      method: 'POST',
      header:{
        'content-type': 'application/json'
      },
      data:{
        'user_id': app.globalData.userInfo.user_id
      },
      success: function (res) {
        console.log(res);
        var book = res.data.result;
        if(book != null){
          for(var index=0; index<book.length; index++){
            book[index].avatar = app.globalData.uploadURL + book[index].avatar;
            var time = book[index].start_time.split(':');
            book[index].start_time = time[0] + ':' + time[1];
          }
          that.setData({
            booking: book
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
        this.setData({selectedtab:0});
        break;
      case "btn2":
        this.setData({ active2: "active" });
        this.setData({ selectedtab: 1 });
        break;
      case "btn3":
        this.setData({ active3: "active" });
        this.setData({ selectedtab: 2});
        break;
    }
  },
  //called when user clicked cancel event button.
  btn_remove_booking: function (event) {
    wx.showModal({
      content: '是否取消蜂约？',
      success: function (res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '../final_cancel/final_cancel',
          })
        } else if (res.cancel) {
        }
      }
    })
  },
  //called when user wants to see detail
  click_detail_event: function(event)
  {
    wx.navigateTo({
      url: 'booking_detail?id='+event.currentTarget.id,
    })
  },
  //called when user wants to write comment
  btn_write_comment: function(event)
  {
    console.log(event.target.id);
    wx.navigateTo({
      url: '../../other/evaluation/evaluation?id='+event.target.id,
    })
  }
})