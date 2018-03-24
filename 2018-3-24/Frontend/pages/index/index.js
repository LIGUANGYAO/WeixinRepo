//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    activity: ["../../image/activity_n@2x.png", "../../image/activity_s@2x.png"],
    fengti: ["../../image/Home_n@2x.png", "../../image/Home_s@2x.png"],
    garden: ["../../image/garden_n@2x.png", "../../image/garden_s@2x.png"],
    mine: ["../../image/my_n@2x.png", "../../image/my_s@2x.png"],
    selected: [1, 0, 0, 0]
  },
  onLoad: function () {
    /*
    wx.login({
      success: function (res) {
        if (res.code) {
          console.log(res.code)
        } else {
        }
      }
    });
    */
    wx.getUserInfo({
      success: function (res) {
        var info = app.globalData.userInfo;
        info.nickname = res.userInfo.nickName;
        info.avatar = res.userInfo.avatarUrl;
        if (info.avatar == '')
        {
          info.avatar = '../../image/temp.jpg'
        }
        info.userStatus = 2;
        info.isVIP = 1;
      }
    })
    wx.navigateTo({
      url: 'detail_gym/detail_gym',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  select: function (event) {
    wx.navigateTo({
      url: "../" + event.currentTarget.id + '/' + event.currentTarget.id,
    })
    /*
    if (app.globalData.current_select == event.currentTarget.id)
      return;
    switch (event.currentTarget.id) {
      case 'fengti':
        app.globalData.current_select = "fengti";
        wx.navigateTo({
          url: '../index/index',
        })
        break
      case 'activity':
        app.globalData.current_select = "activity";
        wx.navigateTo({
          url: '../activity/activity',
        })
        break
      case 'garden':
        app.globalData.current_select = "garden";
        wx.navigateTo({
          url: '../backyard/backyard',
        })
        break
      case 'mine':
        app.globalData.current_select = "mine";
        wx.navigateTo({
          url: '../profile/profile',
        })
        break;
      case 'plus':
        break;
    }
    */
  }
})
