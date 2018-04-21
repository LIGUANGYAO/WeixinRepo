// pages/profile/delivery/delivery.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();  
  },
  getData: function()
  {
    var that = this;
    wx.request({
      url: app.globalData.mainURL + 'api/getAcceptAddress',
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      data: {
        'user_id': app.globalData.userInfo.user_id
      },
      success: function (res) {
        that.setData({
          address: res.data.result
        });
      },
      fail: function (res) {
      }
    })
  },
  checkMainAddress:function(event){
    var that = this;
    var id = event.target.id;
    var address_buf = that.data.address;
    var no = address_buf[id].no;
    wx.request({
      url:app.globalData.mainURL+"api/checkAcceptAddress",
      method:'POST',
      header:{
        'content-type':'application/json'
      },
      data:{
        'address_id': no,
        'user_id': app.globalData.userInfo.user_id
      },
      success:function(res){
      }
    })
    for(var index = 0; index<address_buf.length; index++)
    {
      if(index == id) 
      {
        address_buf[index].state = 1
      }
      else
      {
        address_buf[index].state = 0
      }
    }
    that.setData({
      address:address_buf
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
  on_click_edit: function(e)
  {
    var id = e.target.id;
    var address = this.data.address[id]
    wx.navigateTo({
      url: 'editdelivery?no='+address.no+'&name='+address.name+'&phone='
      +address.phone+'&address='+address.address+'&email='+address.email,
    })
  },
  on_click_delete: function(e)
  {
    var that = this;
    var id = e.target.id;
    wx.request({
      url: app.globalData.mainURL+'api/deleteAcceptAddress',
      method: 'POST',
      header:{
        'content-type': 'application/json'
      },
      data:{
        'address_id': id,
        'user_id': app.globalData.userInfo.user_id
      },
      success: function(res)
      {
        that.setData({
          address: res.data.result
        })
      }
    })
  },
  on_click_new: function(event){
    wx.navigateTo({
      url: 'editdelivery?no='+ '0'
    })
  }
})