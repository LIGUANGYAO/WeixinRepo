// pages/profile/my_activity/showmember.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    booking:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var event_id = options.id;
    wx.request({
      url: app.globalData.mainURL + 'api/getBookingDetailByEvent',
      method: 'POST',
      header:{
        'content-type': 'application/json'
      },
      data:{
        'event_id': event_id,
      },
      success: function(res){
        var books = res.data.booking;
        that.setData({
          booking: books
        })
        console.log(that.data.booking);
      }
    })
  },

})