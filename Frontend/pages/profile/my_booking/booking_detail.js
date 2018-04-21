// pages/booking/bookingCancel.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    img_black_start_src: '../../../image/star_n@2x.png',
    img_yellow_start_src: '../../../image/star_s@2x.png',
    count_yellowStar: 3,
    booking: [],
    eventType: [],
    userRole: [],
    bookingState: [],
    register_num:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (query) {
    this.setData({
      eventType: app.globalData.eventType,
      userRole: app.globalData.userRole,
      bookingState: app.globalData.eventState
    });
    var that = this;
    var id = query.id;
    console.log(id + '  '+ app.globalData.userInfo.user_id);
    wx.request({
      url: app.globalData.mainURL + 'api/getBookingDetail',
      method: 'POST',
      header:{
        'content-type': 'application/json'
      },
      data:{
        'booking_id': id,
        'user_id': app.globalData.userInfo.user_id
      },
      success: function(res){
        console.log(res);
        var book = res.data.result[0];
        if(book != null){
          var time = book.start_time.split(':');
          var register = res.data.register_num[0].register_num
          if(register==null) register =0;
          book.start_time = time[0] + ':' + time[1];
          that.setData({
            booking: book,
            rating: res.data.rating,
            register_num: register
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  final_cancel: function (event) {
    wx.navigateTo({
      url: '../final_cancel/final_cancel',
    })
  },
  //called when user wants to write comment
  btn_write_comment: function (event) {
    console.log(event.target.id);
    wx.navigateTo({
      url: '../../other/evaluation/evaluation?id='+event.target.id,
    })
  }
})