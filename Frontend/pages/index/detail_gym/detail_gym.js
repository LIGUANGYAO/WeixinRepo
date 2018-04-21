var app = getApp()
Page({
  data: {
    site: [],
    event: [],
    isFavourite: false,
    pictures: [],
    eventType: [],
    userRole: [],
    eventState: [],
<<<<<<< HEAD
    favourite_image: ['../../../image/good_n@2x.png', '../../../image/good_s@2x.png'],
=======
>>>>>>> d9384fb835d96b6b8c2290b24abda7c6e82c36cd
    starparam: {
      stars: [0, 1, 2, 3, 4],

      srcImage_0: '../../../image/star-0.png',
      srcImage_1: '../../../image/star-1.png',
      srcImage_2: '../../../image/star-2.png',
      srcImage_3: '../../../image/star-3.png',
      srcImage_4: '../../../image/star-4.png',

      score: 4.3,
      srcImage: '',
    }
  },
  onLoad: function (options) {
    this.setData({
      eventType: app.globalData.eventType,
      userRole: app.globalData.userRole,
      bookingState: app.globalData.eventState
    });
    var id = options.id;
    var that = this;
    wx.request({
      url: app.globalData.mainURL + 'api/getSiteDetail',
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      data: {
        'boss_id': id,
        'user_id': app.globalData.userInfo.user_id
      },
      success: function (res) {
        if (res.data.status) {
          var site_buf = res.data.site[0];
<<<<<<< HEAD
          if (site_buf != null) {
            if (site_buf.point == null) site_buf.point = 0;
            if (site_buf.fav_state == null) site_buf.fav_state = 0;
            else site_buf.fav_state = 1;
=======
          if(site_buf!=null)
          {
            if(site_buf.point==null) site_buf.point = 0;
>>>>>>> d9384fb835d96b6b8c2290b24abda7c6e82c36cd
            var star = that.data.starparam;
            star.score = site_buf.point * 1;
            that.setData({
              starparam: star,
            })
          }
          var picture = res.data.picture;
          var images = [];
          if (picture.length != 0) {
            for (var index = 0; index < picture.length; index++) {
              images[index] = app.globalData.uploadURL + picture[index].picture
            }
          }
          var event_buf = res.data.event;
          var is_favourite = res.data.isFavourite;
<<<<<<< HEAD
          for (var index = 0; index < event_buf.length; index++) {
            if (event_buf[index].register_num == null) {
              event_buf[index].register_num = 0;
            }
=======
          for (var index = 0; index < event_buf.length; index++){
            event_buf[index].avatar = app.globalData.uploadURL + event_buf[index].avatar
>>>>>>> d9384fb835d96b6b8c2290b24abda7c6e82c36cd
          }
          console.log(site_buf)
          wx.setNavigationBarTitle({
            title: site_buf.site_name
          })
          that.setData({
            site: site_buf,
            pictures: images,
            isFavourite: is_favourite,
            event: event_buf
          })
        }
      }
    })
  },
  click_detail_event: function (event) {
    wx.navigateTo({
      url: '../detail_event/detail_event?id=' + event.currentTarget.id,
    })
  },
  on_Clicked_Comment: function (event) {
    wx.navigateTo({
      url: '../../other/comment/comment?id=' + event.currentTarget.id + '&kind=site',
    })
<<<<<<< HEAD
  },
  on_click_favourite: function () {
    var site_buf = this.data.site
    site_buf.fav_state = (1 + site_buf.fav_state) % 2;
    this.setData({
      site: site_buf
    })
    var that = this;
    wx.request({
      url: app.globalData.mainURL + 'api/cancelFavouriteSite',
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      data: {
        'user_id': app.globalData.userInfo.user_id,
        'boss_id': that.data.site.boss_id
      },
      success: function (res) {
      }
    })
=======
>>>>>>> d9384fb835d96b6b8c2290b24abda7c6e82c36cd
  }
})  