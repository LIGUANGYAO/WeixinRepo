//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    payment:[],
  },
  onLoad:function()
  {
    var that = this;
    wx.request({
      url: app.globalData.mainURL + 'api/getPaymentHistory',
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      data: {
        'user_id': app.globalData.userInfo.user_id
      },
      success: function (res) {
        console.log(res);
        if(res.data.status==true){
          that.setData({
            payment: res.data.payment,
          })
        }
      }
    })
  }
})
