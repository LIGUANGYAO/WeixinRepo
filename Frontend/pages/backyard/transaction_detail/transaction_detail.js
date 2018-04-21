// pages/backyard/transaction_detail/transaction_detail.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: app.globalData.mainURL + 'api/getExchangeDetail',
      data: {
        user_id: app.globalData.userInfo.user_id,
        exchange_id: options.id
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({ array: res.data.result[0], upload_url: app.globalData.uploadURL, productState: app.globalData.productState })
      },
      fail: function () {
      }
    })
  },
  onCancel1: function () {
    this.setData({
      showModal1: false
    });
  },
  onConfirm1: function () {
    this.setData({
      showModal1: false
    });
    
    wx.navigateTo({
      url: '../transaction/transaction',
    })
  },
  btn_submit: function () {
    console.log("ok")
    this.setData({
      showModal1: true
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