// pages/profile/delivery/editdelivery.js
const app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    method:'',
    address:{'no': 0, 'detail_address':'','province':"", 'city':"", 'area':"", 'name':'', 'email':'', 'phone':''},
    province: [],
    city: [],
    select_address: false,
    area: [],
    select_province: -1,
    select_city: 0,
    select_area: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.no!= null){
      var address_buf = this.data.address;
      address_buf.no = options.no;
      address_buf.name = options.name;
      address_buf.phone = options.phone;
      address_buf.province = options.province;
      address_buf.city = options.city;
      address_buf.area = options.area;
      address_buf.detail_address= options.detail_address;
      address_buf.email = options.email;
      this.setData({
        address: address_buf
      })
      this.data.method='change'
    }
    else{
      this.data.method='new'
    }
    console.log(this.data.address)
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
  },
  bindChange: function (e) {
    var that = this
    var province = e.detail.value[0];
    console.log(e.detail)
    if (province != that.data.select_province) {
      that.setData({
        select_province: province
      })
      wx.request({
        url: app.globalData.mainURL + "api/getCities",
        method: 'POST',
        header: {
          'content-type': 'application/json'
        },
        data: {
          province: that.data.province[province].province
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
    else if (e.detail.value[1] != that.data.select_city) {
      that.setData({
        select_city: e.detail.value[1]
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
    else {
      that.setData({
        select_area: e.detail.value[2]
      })
    }
  },
  on_blur_postname: function(e){
    this.data.address.name = e.detail.value
  },
  on_blur_phonenumber: function (e) {
    this.data.address.phone = e.detail.value
  },
  on_blur_address: function (e) {
    this.data.address.detail_address = e.detail.value
  },
  on_blur_mail: function (e) {
    this.data.address.email = e.detail.value;
  },
  on_click_submit: function (e) {
    var error = 0
    var that = this
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
    if (this.data.select_province == -1) {
      wx.showToast({
        title: '请选择省市县！',
        icon: 'none'
      })
      error++
    }
    if(error==0)
    {
      if(that.data.method=="new"){
        wx.request({
          url: app.globalData.mainURL + 'api/addAcceptAddress',
          method: 'POST',
          header:{
            'content-type': 'application/json'
          },
          data:{
            'user_id': app.globalData.userInfo.user_id,
            'name' : that.data.address.name,
            'phone': that.data.address.phone,
            'province': that.data.province[that.data.select_province].id,
            'city': that.data.city[that.data.select_city].id,
            'area': that.data.area[that.data.select_area].id,
            'detail_address': that.data.address.detail_address,
            'email': that.data.address.email
          },
          success: function(res)
          {
            console.log(res);
            wx.redirectTo({
              url: '../profile',
            })
          }
        })
      }
      else{
        if(that.data.select_province!=-1){
          wx.request({
            url: app.globalData.mainURL + 'api/changeAcceptAddress',
            method: 'POST',
            header: {
              'content-type': 'application/json'
            },
            data: {
              'address_id': app.globalData.address.no,
              'user_id': app.globalData.userInfo.user_id,
              'name': that.data.address.name,
              'phone': that.data.address.phone,
              'province': that.data.province[that.data.select_province].id,
              'city': that.data.city[that.data.select_city].id,
              'area': that.data.area[that.data.select_area].id,
              'detail_address': that.data.address.detail_address,
              'email': that.data.address.email
            },
            success: function (res) {
              console.log(res);
              wx.redirectTo({
                url: '../profile',
              })
            }
          })
        }
      }
    }
  },
})