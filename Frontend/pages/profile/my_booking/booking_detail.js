// pages/booking/bookingCancel.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img_black_start_src: '../../../image/star_n@2x.png',
    img_yellow_start_src: '../../../image/star_s@2x.png',
    count_yellowStar: 3,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (query) {
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
  }
})