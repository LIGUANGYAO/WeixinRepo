// pages/profile/my_member_ship/my_member_ship.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    place_Name:"北京大学体育馆",
    is_vip:1,
    term_date:"2018-3-31",
    cost:20
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.userInfo = app.globalData.userInfo
    if (this.data.userInfo.avatar == '../../image/temp.jpg')
      this.data.userInfo.avatar = '../' + this.data.userInfo.avatar
    this.setData({ userInfo: app.globalData.userInfo })
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
  //listener for cost to be member
  btn_Clicked_Cost: function (evnet) {

  }
})