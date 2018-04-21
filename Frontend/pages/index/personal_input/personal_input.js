const app = getApp()

Page({
  data: {
    nickname:"",
    avatar: "",
    event:[],
    realname:"",
    phonenumber:0,
    memcount:0,
    totalcost:0,
    id: 0,
  },
  onLoad: function(param)
  {
    var that = this;
    that.setData({
      nickname: app.globalData.userInfo.nickname,
      avatar: app.globalData.userInfo.avatar
    })
    var id = param.id;
    wx.request({
      url: app.globalData.mainURL + 'api/getEventDetail',
      method: 'POST',
      header:{
        'content-type': 'application/json'
      },
      data:{
        'event_id': id,
        'user_id': app.globalData.userInfo.user_id
      },
      success:function(res){
        console.log(res);
        var event_buf = res.data.result[0]
        var time = event_buf.start_time.split(':');
        event_buf.start_time = time[0] + ':' + time[1];
        time = event_buf.end_time.split(':');
        event_buf.end_time = time[0] + ':' + time[1];
        that.setData({
          event: event_buf,
          id: id
        });
      }
    })
  },
  on_Input_Realname: function(event)
  {
    this.setData({realname: event.detail.value});
  },
  on_Input_Phonenumber: function(event)
  {
    this.setData({ phonenumber: event.detail.value });
  },
  on_Input_Memcount: function (event) {
    this.setData({ memcount: event.detail.value });
    this.setData({ total_cost: event.detail.value * this.data.event.cost})
  },
  on_Btn_OK: function()
  {
    var x = 0
    if (this.data.realname.length > 4 || this.data.realname.length == 0 )
    {
      x++
      this.setData({val_realname: "error"})
    }
    if (this.data.phonenumber.toString().length > 11 || this.data.phonenumber.toString().length == 1)
    {
      x++
      console.log(this.data.phonenumber.toString().length)
      this.setData({ val_phonenumber: "error" })
    }
    if (this.data.memcount > (this.data.event.limit - this.data.event.current_member) || this.data.memcount == 0) 
    {
      x++
      this.setData({ val_memcount: "error" })
    }
    if(x == 0)
    {
      console.log("OK")
      var that = this
      wx.request({
        url: app.globalData.mainURL + 'api/addBooking',
        method: 'POST',
        header: {
          'content-type': 'application/json'
        },
        data:{
          user_id: app.globalData.userInfo.user_id,
          event_id: that.data.event.id,
          reg_num: that.data.memcount,
          pay_type: 1
        },
        success: function(res){
          console.log(res)
        }
      })
      wx.redirectTo({
        url: '../../activity/activity',
      })
    }
  }
})
