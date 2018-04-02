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
        for(var index=0;index<books.length; index++)
        {
          books[index].avatar = app.globalData.uploadURL + books[index].avatar
        }
        that.setData({
          booking: books
        })
        console.log(that.data.booking);
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
  
  }
})