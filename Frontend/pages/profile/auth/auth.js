// pages/profile/auth/auth.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickname:'',
    user_role: "场馆主",
    user:{
      name: "",
      phone: "",
      site_name: "",
      detail_address: "",
      id_no: "",
      allow_pic: "../../../image/002@3x.png",
      id_pic1: "../../../image/sfz@3x.png",
      id_pic2: "../../../image/sfb@3x.png",

    },
    hide: 0,
    role: 1,
    overimagecount: 0,
    longitude: 0,
    latitude: 0,
    sms_state: 0,
    check_code: 0,
    sms_check_state: false,
    province: [],
    city: [],
    select_address: false,
    area: [],
    userRole: [],
    select_province: "",
    select_city:"",
    select_area: "",
    method: 'new'
  },

  On_clicked_role: function () {
    if(this.data.method=='new'){
      this.data.hide = !this.data.hide;
      this.setData({ hide: this.data.hide })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userRole: app.globalData.userRole
    })
    var method = options.method;
    this.setData({
      nickname: app.globalData.userInfo.nickname,
    })
    var that = this
    if (method != null){
      wx.request({
        url: app.globalData.mainURL + 'api/getUserDetail',
        method: 'POST',
        header: {
          'content-type': 'application/json'
        },
        data: {
          user_id: app.globalData.userInfo.user_id
        },
        success: function (res) {
          console.log(res)
          if(res.data.status == true){
            var user_info = res.data.result[0]
            if (user_info.role == 1) {
              user_info.allow_pic = app.globalData.uploadURL + user_info.allow_pic
              user_info.id_pic1 = app.globalData.uploadURL + user_info.id_pic1
              user_info.id_pic2 = app.globalData.uploadURL + user_info.id_pic2
            }
            that.setData({
              user: user_info,
              role: user_info.role,
              user_role: that.data.userRole[user_info.role],
              method: 'edit'
            })
          }
        }
      })
    }
  },

  On_change_picker: function (e) {
    if(this.data.method == "new"){
      if (e.detail.value[0] == 1) {
        this.data.user_role = "个人"
        this.data.role = 2;

      }
      else {
        this.data.role = 1;
        this.data.user_role = "场馆主"
      }
      this.setData({ role: this.data.role })
      this.setData({ user_role: this.data.user_role })
    }
  },
  On_blur_stadiuminfo: function (e) {
    this.data.user.site_name = e.detail.value;
  },
  On_blur_name: function (e) {
    this.data.user.name = e.detail.value;
  },
  On_blur_phone: function (e) {
    this.data.user.phone = e.detail.value;
  },
  On_blur_authnumber: function (e) {
    this.data.user.authnumber = e.detail.value;
  },
  On_clicked_address: function (e) {
    var that = this
    if(that.data.method == "new"){
      if(that.data.select_province==""){
        that.data.select_address = !that.data.select_address;
        if(that.data.select_address){
          wx.request({
            url: app.globalData.mainURL + 'api/getProvinces',
            success:function(res)
            {
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
        that.setData({
          select_address: that.data.select_address
        })
      }
    }
  },
  On_blur_detailaddress: function (e) {
    this.data.user.detail_address = e.detail.value;
  },

  //receive sms
  On_click_authnumber: function (e) {
    var that = this
    if (that.data.sms_state == 0) {
      if(that.data.user.phone.length==11){
        var random = Math.ceil(Math.random() * 900000) + 99999;
        wx.request({
          url: app.globalData.smsURL,
          method: 'POST',
          header: {
            'content-type': 'application/json'
          },
          data: {
            'phonenumber': that.data.user.phone,
            'random': random
          },
          success: function (res) {
            console.log(res);
            if (res.result != "fail") {
              setTimeout(
                that.auth_fail, 600000
              )
              that.setData({
                sms_state: 1,
                check_code: random
              })
            }
          }
        })
      }
      else{
        wx.showToast({
          title: 'Phone Number is incorrect!Please correct again.',
          icon: 'none',
          duration: 2000
        })
      }
    }
    else {
      if (that.data.authnumber = that.data.check_code) {
        wx.showToast({
          title: 'success!',
          duration: 1000
        })
        that.setData({
          sms_check_state: true
        })
      }
      else {
        wx.showToast({
          title: 'failed',
          duration: 1000
        })
        that.setData({
          sms_state: 0
        })
      }
    }
  },
  auth_fail() {
    this.setData({
      sms_state: 0
    })
  },
  On_click_map: function (e) {
    if(this.data.method == "new"){
      var that = this
      if(that.data.select_province=="")
      {
        wx.showToast({
          title: '请选择省市县！',
          icon: 'none',
          duration: 1000
        })
      }
      else{
        var data = that.data;
        wx.request({
          url: 'http://restapi.amap.com/v3/geocode/geo?key=8eb63e36d0b6d7d29a392503a4a80f6c&address='+
          data.province[data.select_province].province+data.city[data.select_city].city+data.area[data.select_area].area,
          success: function (res){
            console.log(res);
            var position = res.data.geocodes[0].location.split(',')
            var longitude =  position[0]
            var latitude = position[1]
            wx.navigateTo({
              url: '../../other/select_location/select_location?method=auth&longitude='+longitude+'&latitude='+latitude,
            })
          }
        })
      }
    }
  },
  On_click_registerimage: function (e) {
    if(this.data.method == "new"){
      var that = this;
      wx.chooseImage({
        success: function (res) {
          console.log(res.tempFiles[0].size);
          if (res.tempFiles[0].size > 5120000) {
            that.data.overimagecount++;
          }
          that.data.user.allow_pic = res.tempFilePaths[0];
          that.setData({ user: that.data.user })
        },
      })
    }
  },
  On_blur_idcard: function (e) {
    this.data.user.id_no = e.detail.value;
  },
  On_click_frontimage: function (e) {
    if(this.data.method == "new"){
      var that = this;
      wx.chooseImage({
        success: function (res) {
          console.log(res.tempFiles[0].size);
          if (res.tempFiles[0].size > 5120000) {
            that.data.overimagecount++;
          }
          that.data.user.id_pic1 = res.tempFilePaths[0];
          that.setData({ user: that.data.user })
        },
      })
    }
  },
  On_click_backimage: function (e) {
    if(this.data.method == "new"){
      var that = this;
      wx.chooseImage({
        success: function (res) {
          console.log(res.tempFiles[0].size);
          if (res.tempFiles[0].size > 5120000){
            that.data.overimagecount++;
          }
          that.data.user.id_pic2 = res.tempFilePaths[0];
          that.setData({ user: that.data.user })
        },
      })
    }
  },
  On_click_submit: function (e) {
    var that = this;
    if (this.data.method == "new") {
      var invalid = 0;
      if (this.data.overimagecount > 0) {
        console.log("here");
        invalid = invalid + 1
      }
      if (this.data.user.site_name.length > 20) {
        invalid = invalid + 1
      }
      if (this.data.user.name.length > 4) {
        invalid = invalid + 1
      }
      if (this.data.user.phone.length > 20) {
        invalid = invalid + 1
      }
      if (this.data.user.id_no.length > 18) {
        invalid = invalid + 1
      }
      if(this.data.sms_check_state==false){
        //invalid = invalid +1
      }
      console.log(invalid)
      if (invalid == 0) {
        if (that.data.role == 0) {
          app.globalData.role = 2
          app.globalData.state = 1
          wx.request({
            url: app.globalData.mainURL + 'api/registerUser',
            method: 'POST',
            header: {
              'content-type': 'application/json'
            },
            data:{
              user_id: app.globalData.userInfo.user_id,
              role: 2,
              name: that.data.user.name,
              phone: that.data.user.phone
            },
            success: function(res)
            {
              if(res.data.status==true)
              {
                wx.redirectTo({
                  url: './auth-text/auth_text',
                })
              }
            }
          })
        }
        else{
          app.globalData.role = 1
          app.globalData.state =1
          wx.request({
            url: app.globalData.mainURL + 'api/registerBoss',
            method: 'POST',
            header: {
              'content-type': 'application/json'
            },
            data: {
              role: 1,
              user_id: app.globalData.userInfo.user_id,
              name: that.data.user.name,
              phone: that.data.user.phone,
              site_name: that.data.user.site_name,
              province: that.data.province[that.data.select_province].id,
              city: that.data.city[that.data.select_city].id,
              area: that.data.area[that.data.select_area].id,
              detail_address: that.data.user.detail_address,
              longitude: app.globalData.longitude,
              latitude: app.globalData.latitude,
              id_no: that.data.user.id_no
            },
            success: function (res) {
              if (res.data.status != true) {
                wx.showToast({
                  title: '认证失败！重复',
                  icon: 'fail',
                  duration: 1000
                })
              }
              else{

                console.log(that.data.user.allow_pic)
                wx.uploadFile({
                  url: app.globalData.mainURL + 'api/addAllowPic',
                  filePath: that.data.user.allow_pic,
                  name: 'file',
                  formData: {
                    'user_id': app.globalData.userInfo.user_id,
                  }
                })
              }
            }
          })
          wx.uploadFile({
            url: app.globalData.mainURL + 'api/addIDPic1',
            filePath: that.data.user.id_pic1,
            name: 'file',
            formData: {
              'user_id': app.globalData.userInfo.user_id,
            }
          })
          wx.uploadFile({
            url: app.globalData.mainURL + 'api/addIDPic2',
            filePath: that.data.user.id_pic2,
            name: 'file',
            formData: {
              'user_id': app.globalData.userInfo.user_id,
            },
            success:function(res){
              if(res.data.status)
              {
                app.globalData.userInfo.state = 1;
              }
            }
          })

          wx.redirectTo({
            url: './auth-text/auth_text',
          })
        }
      }
      else {
        wx.showToast({
          title: 'Error',
          icon: 'none',
          duration: 2000
        })
      }
    }
    else{

      if (this.data.sms_check_state == false) {
        //invalid = invalid +1
      }
      else {
        app.globalData.state = 1
        wx.request({
          url: app.globalData.mainURL + 'api/updateUserPhone',
          method: 'POST',
          header: {
            'content-type': 'application/json'
          },
          data: {
            user_id: app.globalData.userInfo.user_id,
            phone: that.data.user.phone
          },
          success: function(res)
          {
            wx.redirectTo({
              url: './auth-text/auth_text',
            })
          }
        })
      }
    }
  },

  //personal data input
  On_blur_name1: function (e) {
    this.data.user.name = e.detail.value;
    console.log(this.data.user.name)
  },
  On_blur_phone1: function (e) {
    this.data.user.phone = e.detail.value;
  },
  On_blur_authnumber1: function (e) {
    this.data.user.authnumber = e.detail.value;
  },
  bindChange: function (e) {
    var that = this
    var province = e.detail.value[0];
    console.log(e.detail)
    if(province!=that.data.select_province){
      that.setData({
        select_province: province
      })
      wx.request({
        url: app.globalData.mainURL + "api/getCities",
        method: 'POST',
        header:{
          'content-type': 'application/json'
        },
        data:{
          province: that.data.province[province].province
        },
        success: function(res)
        {
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
            success: function(res)
            {
              that.setData({
                area: res.data.result,
                select_area: 0
              })
            }
          })
        }
      })
    }
    else if(e.detail.value[1]!=that.data.select_city)
    {
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
    else{
      that.setData({
        select_area: e.detail.value[2]
      })
    }
  }
})