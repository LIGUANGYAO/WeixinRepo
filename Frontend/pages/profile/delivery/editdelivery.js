// pages/profile/delivery/editdelivery.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    method:'',
    address:{'no': 0, 'address':'', 'name':'', 'email':'', 'phone':''}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.no!= 0){
      var address_buf = this.data.address;
      address_buf.no = options.no;
      address_buf.name = options.name;
      address_buf.phone = options.phone;
      address_buf.address = options.address;
      address_buf.email = options.email;
      this.setData({
        address: address_buf
      })
      this.data.method='change'
    }
    else{
      this.data.method='new'
    }
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
  on_blur_postname: function(e){
    this.data.address.name = e.detail.value
  },
  on_blur_phonenumber: function (e) {
    this.data.address.phone = e.detail.value
  },
  on_blur_mail: function (e) {
    this.data.address.mail = e.detail.value;
  },
  on_click_submit: function (e) {
    var error = 0
    if (this.data.address.name.length < 2 || this.data.address.name.length > 6)
    {
      wx.showToast({
        title: '你输入的资料格式！',
        icon: 'none'
      })
      error++
    }
    if (this.data.address.phone.toString().length != 11) {
      wx.showToast({
        title: '你输入的资料格式！',
        icon: 'none'
      })
      error++
    }
    if(error == 0)
    {

    }
  },
})