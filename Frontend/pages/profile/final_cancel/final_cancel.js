//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    image_cancel_success_src: '../../../image/success@2x.png',
    cancel_sucess_text: "提现成功，钱款将在1-3个工作日退回",
  },
  on_return:function()
  {
    wx.redirectTo({
      url: '../profile',
    })
  }
})
