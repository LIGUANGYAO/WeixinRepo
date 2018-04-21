// pages/profile/my_focus/my_focus.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    favourite:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.globalData.mainURL + 'api/getFavouriteSite',
      method: 'POST',
      header: {
        'content-type': 'application/json',
      },
      data:{
        'user_id': app.globalData.userInfo.user_id
      },
      success: function(res){
        var fav_buf = res.data.result;
        if(fav_buf!=null){
          that.setData({
            favourite: fav_buf
          })
          console.log(fav_buf)
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
  btn_Clicked_Focus: function(event)
  {
    var that = this;
    console.log(event.currentTarget);
    wx.navigateTo({
      url: '../../index/detail_gym/detail_gym?id=' + that.data.favourite[event.currentTarget.id].boss_id,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  on_cancel: function(event)
  {
    var that = this;
    wx.request({
      url: app.globalData.mainURL + 'api/cancelFavouriteSite',
      header:{
        'content-type': 'application/json'
      },
      method: 'POST',
      data:{
        'boss_id': that.data.favourite[event.target.id].boss_id,
        'user_id': app.globalData.userInfo.user_id
      },
      success:function(res){
        console.log(res);
        if(res.data.status == true)
        {
          var fav_buf = that.data.favourite.pop(e.target.id);
          that.setData({
            favourite: fav_buf,
          })
        }
      }
    })
  }
})