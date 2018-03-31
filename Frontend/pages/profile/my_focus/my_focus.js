// pages/profile/my_focus/my_focus.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataarray: [],
    dataarray1: [{ avatar: "../../../image/Home_s@2x.png", cityname: "郭德纲刚", placename: "线上支付", phone:"13456767847"}]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  btn_Clicked_Focus: function()
  {
    wx.navigateTo({
      url: '../../index/detail_gym/detail_gym',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})