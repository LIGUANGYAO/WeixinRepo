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
    this.setData({ userInfo: app.globalData.userInfo })
  },
  //listener of tabbar
  select: function (event) {
    wx.redirectTo({
      url: "../" + event.currentTarget.id + '/' + event.currentTarget.id,
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
