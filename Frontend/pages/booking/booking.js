// pages/booking/booking.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active1: "active",
    active2: "",
    active3: "",
    bookingArray: new Array(),
    id: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (query) {
    if(query.type == "bee")
    {
      console.log("OK");
    }
  },
  cancel: function (event){
    this.data.id = event.currentTarget.id;
    wx.navigateTo({
      url: 'bookingCancel',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
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
    /**
   * This function is called after user select one of the tabs
   */
  
  selectTab:function(event) {
    console.log(event);
    this.setData({active1:" "});
    this.setData({active2:" "});
    this.setData({active3:" "});
    switch(event.currentTarget.id)
    {
      case "btn1":
      this.setData({active1:"active"});
      break;
      case "btn2":
        this.setData({active2:"active"});
      break;
      case "btn3":
        this.setData({active3:"active"});
      break;
    }
  },
  
})