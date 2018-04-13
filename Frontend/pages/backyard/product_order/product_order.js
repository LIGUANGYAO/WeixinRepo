// pages/backyard/product_order/product_order.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comment: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.setData({ upload_url: app.globalData.uploadURL })
    wx.request({
      url: app.globalData.mainURL + 'api/orderExchange',
      data: {
        good_id: options.id,
        user_id: app.globalData.userInfo.user_id
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({status: res.data.status, address: res.data.address[0], good: res.data.good[0]})
      },
      fail: function () {
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
  onBlurtextarea: function(e){
    this.data.comment = e.detail.value
  },
  onBtnsubmit: function(e)
  {
    var that = this;
    console.log(this.data.comment)
    console.log(e.currentTarget.id)
    wx.request({
      url: app.globalData.mainURL + 'api/setExchange',
      data: {
        good_id: e.currentTarget.id,
        user_id: app.globalData.userInfo.user_id,
        comment: that.data.comment
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
      },
      fail: function () {
      }
    })
    wx.navigateTo({
      url: '../ordercomplete/ordercomplete',
    })
  }
})