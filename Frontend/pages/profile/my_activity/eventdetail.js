
//获取应用实例
const app = getApp()

Page({
  data: {
    img_black_star_src: '../../../image/star_n@2x.png',
    img_yellow_star_src: '../../../image/star_s@2x.png',
    star_img_position: 25,
    id:0,
    event:[],
    booking:[],
    rating: [],
    userInfo: [],
    eventType: [],
    userRole: [],
    eventState: []
  },
  onLoad: function(param)
  {
    this.setData({
      userInfo: app.globalData.userInfo,
      eventType: app.globalData.eventType,
      userRole: app.globalData.userRole,
      eventState: app.globalData.eventState
    });
    var that = this;
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
      success: function (res) {
        console.log(res);
        var books = res.data.booking;
        var rating_buf = res.data.rating_detail
        that.setData({
          booking: books,
          rating: rating_buf
        })
        console.log(rating_buf)
        var event_buf = res.data.result[0];
        event_buf.pic = app.globalData.uploadURL + event_buf.pic;
        if(event_buf.favourite_num==null){
          event_buf.favourite_num = 0;
        }
        var time = event_buf.start_time.split(':');
        event_buf.start_time = time[0]+':'+time[1];
        that.setData({
          event: event_buf,
          id: id
        });
      }
    })
  },
  on_click_booking: function()
  {
    var that = this;
    wx.navigateTo({
      url: 'showmember?id='+this.data.id,
    })
  },
  on_click_rating: function()
  {
    var that = this;
    wx.navigateTo({
      url: '../../other/comment/comment?id='+that.data.id+'&kind=event',
    })
  }
})
