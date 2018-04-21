//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    activity: ["../../image/activity_n@2x.png", "../../image/activity_s@2x.png"],
    fengti: ["../../image/Home_n@2x.png", "../../image/Home_s@2x.png"],
    garden: ["../../image/garden_n@2x.png", "../../image/garden_s@2x.png"],
    mine: ["../../image/my_n@2x.png", "../../image/my_s@2x.png"],
    selected: [0, 0, 0, 1],
    userInfo: {}
  },
  onLoad: function () {
    //Setting Nickname and avatar of User
<<<<<<< HEAD
    this.setData({ userInfo: app.globalData.userInfo });
    console.log(this.data.userInfo)
  },
  //listener of tabbar
  select: function (event) {
    if (app.globalData.currentpage != event.currentTarget.id) {
      if (event.currentTarget.id != '') {
        wx.redirectTo({
          url: "../" + event.currentTarget.id + '/' + event.currentTarget.id,
          success: function (res) {
            app.globalData.currentpage = event.currentTarget.id
          }
        })
      }
    }
  },
  on_click_create_event: function () {
    console.log(app.globalData.userInfo.state)
    if (app.globalData.userInfo.state == 0 || app.globalData.userInfo.state == 3) {
      wx.showModal({
        title: '提示',
        content: '是未注册的使用者',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../profile/auth/auth',
            })
          } else if (res.cancel) {
          }
        }
      })
      return;
    }
    if (app.globalData.userInfo.state == 1) {
      wx.showModal({
        title: '提示',
        content: '正在注册。 请稍等。',
        showCancel: false,
      })
      return;
    }
    wx.navigateTo({
      url: '../other/create_event/create_event',
=======
    this.setData({ userInfo: app.globalData.userInfo })
  },
  //listener of tabbar
  select: function (event) {
    wx.redirectTo({
      url: "../" + event.currentTarget.id + '/' + event.currentTarget.id,
>>>>>>> d9384fb835d96b6b8c2290b24abda7c6e82c36cd
    })
  },
  whichpress: function (event) {
    switch (event.currentTarget.id) {
      case 'about_my_bee':
        wx.navigateTo({
          url: 'my_booking/booking'
        });
        break;
      case 'my_event':
        wx.navigateTo({
          url: 'my_activity/my_activity'
        });
        break;
      case 'my_purse':
        wx.navigateTo({
          url: 'my_purse/my_purse'
        });
        break;
      case 'my_membership':
        wx.navigateTo({
          url: 'my_membership/my_membership',
        })
        break;
      case 'my_focus':
        wx.navigateTo({
          url: 'my_focus/my_focus',
        })
        break;
      case 'auth_me':
        wx.navigateTo({
          url: 'auth/auth',
        })
        break;
      case 'delivery_address':
        wx.navigateTo({
          url: 'delivery/delivery',
        })
        break;
      case 'about_stadium':
        wx.navigateTo({
          url: 'register_stadium/register_stadium',
        })
        break;
      default:
        break;
    }
  }
})
