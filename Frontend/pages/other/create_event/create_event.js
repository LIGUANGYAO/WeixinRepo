var dateTimePicker = require('../../../utils/datetimePicker.js');
var app = getApp();

Page({
  data: {
    event: {
      name: "",
      kind: 20,
      start_time: "",
      end_time: "",
      address4: "",
      limit: "",
      cost: 0,
      event_pic: "../../../image/fengm@3x.png",
      comment: "",
      publicity: 1,
      additional: 1
    },
    errorMessage:[
      "name is longer than 10",
      "limit is empty",
      "cost is empty"
    ],
    date: '2018-10-01',
    time: '12:00',
    dateTimeArray: null,
    dateTime: null,
    dateTimeArray1: null,
    dateTime1: null,
    startYear: 2000,
    endYear: 2050,
    eventType:[],
    overimagecount: 0,
    longitude: 0,
    latitude: 0,
    province: [],
    city: [],
    select_address: false,
    area: [],
    select_province: "",
    select_city: "",
    select_area: "",
    role: 1,
    open: false
  },
  
  onLoad: function(params) {
    this.data.longitude = app.globalData.longitude
    this.data.latitude = app.globalData.latitude
    this.setData({
      role: app.globalData.userInfo.role,
      eventType: app.globalData.eventType
    })
    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    var lastArray = obj1.dateTimeArray.pop();
    var lastTime = obj1.dateTime.pop();

    this.setData({
      dateTime: obj.dateTime,
      dateTimeArray: obj.dateTimeArray,
      dateTimeArray1: obj1.dateTimeArray,
      dateTime1: obj1.dateTime
    });
  }, 

  showitem: function () {
    this.setData({
      open: !this.data.open
    })
  },
  on_click_type:function(e){
    var _this =this
    _this.data.event.kind = e.currentTarget.id;
    _this.setData({
      event: _this.data.event
    })
  },
  On_blur_detailaddress: function (e) {
    console.log(e);
    this.data.event.address4 = e.detail.value;
  },
  on_blur_limit: function (e) {
    this.data.event.limit = e.detail.value;
  },
  on_blur_cost: function (e) {
    this.data.event.cost = e.detail.value;
  },
  on_blur_comment: function (e) {
    this.data.event.comment = e.detail.value;
  },
  on_event_name: function (e) {
    console.log(e)
    this.data.event.name = e.detail.value;
  },
  On_click_registerimage: function (e) {
      var _this = this;
      wx.chooseImage({
        success: function (res) {
          console.log(res.tempFiles[0].size);
          if (res.tempFiles[0].size > 5120000) {
            _this.data.overimagecount++;
          }
          _this.data.event.event_pic = res.tempFilePaths[0];
          _this.setData({ event: _this.data.event })
        },
      })
  }, 
  On_clicked_address: function (e) {
    console.log(this.data.select_province);
      this.data.select_address = !this.data.select_address;
      if (this.data.select_address) {
        var _this = this
        wx.request({
          url: app.globalData.mainURL + 'api/getProvinces',
          success: function (res) {
            console.log(res);
            _this.setData({
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
                province: _this.data.province[_this.data.select_province].province
              },
              success: function (res) {
                _this.setData({
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
                    city: _this.data.city[_this.data.select_city].city
                  },
                  success: function (res) {
                    _this.setData({
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
    console.log(this.data.select_province);
    var _this = this
    var province = e.detail.value[0];
    console.log(e.detail)
    if (province != _this.data.select_province) {
      _this.setData({
        select_province: province
      })
      wx.request({
        url: app.globalData.mainURL + "api/getCities",
        method: 'POST',
        header: {
          'content-type': 'application/json'
        },
        data: {
          province: _this.data.province[province].province
        },
        success: function (res) {
          _this.setData({
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
              city: _this.data.city[_this.data.select_city].city
            },
            success: function (res) {
              _this.setData({
                area: res.data.result,
                select_area: 0
              })
            }
          })
        }
      })
    }
    else if (e.detail.value[1] != _this.data.select_city) {
      _this.setData({
        select_city: e.detail.value[1]
      })
      wx.request({
        url: app.globalData.mainURL + "api/getAreas",
        method: 'POST',
        header: {
          'content-type': 'application/json'
        },
        data: {
          city: _this.data.city[_this.data.select_city].city
        },
        success: function (res) {
          _this.setData({
            area: res.data.result,
            select_area: 0
          })
        }
      })
    }
    else {
      _this.setData({
        select_area: e.detail.value[2]
      })
    }
  },
  On_click_map: function (e) {
      var _this = this
      if (this.data.select_province == "") {
        wx.showToast({
          title: '请选择省市县！',
          icon: 'none',
          duration: 1000
        })
      }
      else {
        var data = _this.data;
        wx.request({
          url: 'http://restapi.amap.com/v3/geocode/geo?key=8eb63e36d0b6d7d29a392503a4a80f6c&address=' +
          data.province[data.select_province].province + data.city[data.select_city].city + data.area[data.select_area].area,
          success: function (res) {
            console.log(res);
            var position = res.data.geocodes[0].location.split(',')
            var longitude = position[0]
            var latitude = position[1]
            wx.navigateTo({
              url: '../../other/select_location/select_location?method=auth&longitude=' + longitude + '&latitude=' + latitude,
            })
          }
        })
      }
  },
  changeDate(e) {
    this.setData({ date: e.detail.value });
  },
  changeTime(e) {
    this.setData({ time: e.detail.value });
  },
  changeDateTime(e) {
    var _this = this
    _this.setData({
      dateTime: e.detail.value
    })
    console.log();
    _this.data.event.end_time = "" + _this.data.dateTimeArray[0][_this.data.dateTime[0]] + '-' + _this.data.dateTimeArray[1][_this.data.dateTime[1]] + '-' + _this.data.dateTimeArray[2][_this.data.dateTime[2]] + ' ' + _this.data.dateTimeArray[3][_this.data.dateTime[3]] + ':' + _this.data.dateTimeArray[4][_this.data.dateTime[4]];

    _this.setData({
      event: _this.data.event
    });
  },
  changeDateTime1(e) {
    var _this = this
    _this.setData({
      dateTime1: e.detail.value
    })
    _this.data.event.start_time = ""+_this.data.dateTimeArray1[0][_this.data.dateTime1[0]] + '-' + _this.data.dateTimeArray1[1][_this.data.dateTime1[1]] + '-' + _this.data.dateTimeArray1[2][_this.data.dateTime1[2]] + ' ' + _this.data.dateTimeArray1[3][_this.data.dateTime1[3]] + ':' + _this.data.dateTimeArray1[4][_this.data.dateTime1[4]];

    _this.setData({
      event: _this.data.event
    });
  },
  changeDateTimeColumn(e) {
    var arr = this.data.dateTime, dateArr = this.data.dateTimeArray;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray: dateArr,
      dateTime: arr
    });
  },
  changeDateTimeColumn1(e) {
    var arr = this.data.dateTime1, dateArr = this.data.dateTimeArray1;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray1: dateArr,
      dateTime1: arr
    });
  },
  radioChange: function(e){
    var _this = this
    _this.data.event.publicity = e.detail.value
    _this.setData({
      event: _this.data.event
    })
  },
  radioChange1: function(e)
  {
    var _this = this
    _this.data.event.additional = e.detail.value
    _this.setData({
      event: _this.data.event
    })
  },
  on_submit:function()
  {
    var _this =this
    _this.data.event.start_time = "" + _this.data.dateTimeArray1[0][_this.data.dateTime1[0]] + '-' + _this.data.dateTimeArray1[1][_this.data.dateTime1[1]] + '-' + _this.data.dateTimeArray1[2][_this.data.dateTime1[2]] + ' ' + _this.data.dateTimeArray1[3][_this.data.dateTime1[3]] + ':' + _this.data.dateTimeArray1[4][_this.data.dateTime1[4]];
    _this.data.event.end_time = "" + _this.data.dateTimeArray[0][_this.data.dateTime[0]] + '-' + _this.data.dateTimeArray[1][_this.data.dateTime[1]] + '-' + _this.data.dateTimeArray[2][_this.data.dateTime[2]] + ' ' + _this.data.dateTimeArray[3][_this.data.dateTime[3]] + ':' + _this.data.dateTimeArray[4][_this.data.dateTime[4]];
    var invalid = 0
    if(_this.data.event.name.length>10)
    {
      invalid = 1
    }
    if(_this.data.event.limit=="")
    {
      invalid = 2
    }
    if(_this.data.event.cost=="")
    {
      invalid = 3
    }
    console.log(_this.data.event.kind);
    if(invalid==0)
    {

      _this.data.longitude = app.globalData.longitude
      _this.data.latitude = app.globalData.latitude
      wx.uploadFile({
        url: app.globalData.mainURL + 'api/createEvent',
        filePath: _this.data.event.event_pic,
        name: 'file',
        formData:{
          'user_id': app.globalData.userInfo.user_id,
          'role': app.globalData.userInfo.role,
          'event_name': _this.data.event.name,
          'event_type': _this.data.event.kind,
          'start_time': _this.data.event.start_time,
          'end_time': _this.data.event.end_time,
          'province': _this.data.province[_this.data.select_province].id,
          'city': _this.data.city[_this.data.select_city].id,
          'area': _this.data.area[_this.data.select_area].id,
          'detail_address': _this.data.event.address4,
          'longitude': _this.data.longitude,
          'latitude': _this.data.latitude,
          'limit': _this.data.event.limit,
          'cost': _this.data.event.cost,
          'comment': _this.data.event.comment,
          'publicity': _this.data.event.publicity,
          'additional': _this.data.event.additional
        },
        success: function(res){
          console.log(res);
          wx.navigateBack({
            delta:1
          })
        }
      })
    }
    else{
      wx.showToast({
        title: _this.data.errorMessage[invalid],
        icon: 'none'
      })
    }
  }

})