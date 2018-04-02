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
        console.log(res);
        if(res.data.result!=null){
          that.setData({
            address: res.data.result
          });
        }
      },
      fail: function (res) {
      }
    })
  },
  checkMainAddress:function(event){
    var that = this;
    console.log(event.target);
    var id=event.target.id;
    var address_buf=that.data.address;
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
    for(var index=0; index<address_buf.length; index++)
    {
      if(index==id) 
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
  
  on_click_edit: function(e)
  {
    var id = e.target.id;
    var address = this.data.address[id]
    wx.navigateTo({
      url: 'editdelivery?no='+address.no+'&name='+address.name+'&phone='
      + address.phone + '&detail_address=' + address.detail_address + '&province=' + address.province + '&city=' + address.city + '&area=' + address.area +'&email='+address.email,
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