//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    activity:"../../image/activity_n@2x.png",
    fengti: "../../image/Home_s@2x.png",
    garden: "../../image/garden_n@2x.png",
    mine: "../../image/my_n@2x.png",
  },
  /*
  onLoad(){
    switch (app.globalData.current_using_item)
    {
      case 'fengti':
        this.setData({ fengti: "../../image/Home_s@2x.png" })
      break;
      case 'activity':
        this.setData({ activity: "../../image/activity_s@2x.png" })
      break;
      case 'garden':
        this.setData({ garden: "../../image/garden_s@2x.png" })
      break;
      this.setData({ mine: "../../image/my_s@2x.png" })
      case 'mine':
      break;
    }
  },
  */
  select: function (event) {
    if (event.currentTarget.id == app.globalData.before_using_item)
      return;
    this.setData({fengti: "../../image/Home_n@2x.png"})
    this.setData({activity : "../../image/activity_n@2x.png"})
    this.setData({garden: "../../image/garden_n@2x.png"})
    this.setData({ mine: "../../image/my_n@2x.png"})
    switch(event.currentTarget.id)
    {
      case 'fengti':
        this.setData({ fengti: "../../image/Home_s@2x.png" })
        wx.navigateTo({
          url: '../index/index',
        })
      break
      case 'activity':
        this.setData({ activity: "../../image/activity_s@2x.png" })
      break
      case 'garden':
        this.setData({ garden: "../../image/garden_s@2x.png" })
      break
      case 'mine':
        this.setData({ mine: "../../image/my_s@2x.png" })
        wx.navigateTo({
          url: '../myprofile/myprofile'
        })
      break;
      case 'plus':
      break;
    }
  }
})
