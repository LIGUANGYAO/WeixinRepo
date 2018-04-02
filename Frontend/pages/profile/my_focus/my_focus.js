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
          for(var index = 0; index < fav_buf.length; index++){
            fav_buf[index].avatar = app.globalData.uploadURL + fav_buf[index].avatar
          }
          that.setData({
            favourite: fav_buf
          })
          console.log(fav_buf)
        }
      }
    })
  },
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
    var a=new Array();
  },
  on_cancel: function(event)
  {
    var that = this;
    console.log(event.currentTarget.id);
    wx.request({
      url: app.globalData.mainURL + 'api/cancelFavouriteSite',
      header:{
        'content-type': 'application/json'
      },
      method: 'POST',
      data:{
        'boss_id': that.data.favourite[event.currentTarget.id].boss_id,
        'user_id': app.globalData.userInfo.user_id
      },
      success:function(res){
        wx.redirectTo({
          url: './my_focus'
        })
      }
    })
  }
})