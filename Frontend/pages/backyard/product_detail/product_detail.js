// pages/backyard/product_detail/product_detail.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    disable: 0,
    btn_text:"立即兑换"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(options.id)
    wx.request({
      url: app.globalData.mainURL + 'api/getGoodDetail',
      data: {
        id: options.id
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.data.id = res.data.result[0].id
        that.data.cost = res.data.result[0].cost
<<<<<<< HEAD
        if (res.data.result[0].cost > app.globalData.honey_info.total_honey)
=======
        /*
        if (res.data.result[0].cost > app.globalData.total_honey)
>>>>>>> d9384fb835d96b6b8c2290b24abda7c6e82c36cd
        {
          that.setData({ btn_text: "蜂蜜不足", disable: 1})
        }
        if (res.data.result[0].number == 0)
        {
          that.setData({ btn_text: "缺货", disable: 1})
        }
<<<<<<< HEAD
=======
        */
>>>>>>> d9384fb835d96b6b8c2290b24abda7c6e82c36cd
        that.setData({product: res.data.result[0]})
        that.setData({ upload_url: app.globalData.uploadURL })
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
  On_click_order:function()
  {
    var that = this
    wx.navigateTo({
      url: '../product_order/product_order?id=' + that.data.id,
    })
  }
})