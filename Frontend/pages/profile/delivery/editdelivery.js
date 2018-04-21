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
      this.setData({
        method: 'change'
      })
    }
    else{
      this.setData({
        method: 'new'
      })
    }
<<<<<<< HEAD
    console.log(this.data.method)
  }, 
  On_clicked_address: function (e) {
      this.data.select_address = !this.data.select_address;
      if (this.data.select_address) {
        var that = this
        wx.request({
          url: app.globalData.mainURL + 'api/getProvinces',
          success: function (res) {
            console.log(res);
            that.setData({
              province: res.data.result,
              select_province: 0
            })
            wx.request({
              url: app.globalData.mainURL + "api/getCities",
              method: 'POST',
              header: {
                'content-type': 'application/json'
              },
              data: {
                province: that.data.province[that.data.select_province].province
              },
              success: function (res) {
                that.setData({
                  city: res.data.result,
                  select_city: 0
                })
                wx.request({
                  url: app.globalData.mainURL + "api/getAreas",
                  method: 'POST',
                  header: {
                    'content-type': 'application/json'
                  },
                  data: {
                    city: that.data.city[that.data.select_city].city
                  },
                  success: function (res) {
                    that.setData({
                      area: res.data.result,
                      select_area: 0
                    })
                  }
                })
              }
            })
          }
        })
      }
      this.setData({
        select_address: this.data.select_address
      })
=======
>>>>>>> d9384fb835d96b6b8c2290b24abda7c6e82c36cd
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