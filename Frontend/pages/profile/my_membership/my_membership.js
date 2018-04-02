// pages/profile/my_member_ship/my_member_ship.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    mn_ismember: 0,
    is_vip: 1,
    term_date: "2018-3-31",
    cost: 20
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.userInfo = app.globalData.userInfo
    
    this.setData({ userInfo: app.globalData.userInfo })
    this.setData({ mn_ismember: this.data.mn_ismember })
  },
  pay: function () {
    var ordercode = 0.1;
    wx.login({
      success: function (res) {
        if (res.code) {
          wx.request({
            url: app.globalData.mainURL+'api/pay',
            data: {
              id: res.code,//要去换取openid的登录凭证
              fee: ordercode
            },
            method: 'POST',
            header:
            {
              'content-type': 'application/json'
            },
            success: function (res) {
              console.log(res.data)
              wx.requestPayment({
                timeStamp: res.data.timeStamp,
                nonceStr: res.data.nonceStr,
                package: res.data.package,
                signType: 'MD5',
                paySign: res.data.paySign,
                success: function (res) {
                  // success
                  console.log(res);
                },
                fail: function (res) {
                  // fail
                  console.log(res);
                },
                complete: function (res) {
                  // complete
                  console.log(res);
                }
              })
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //listener for cost to be member
  btn_Clicked_Cost: function (evnet) {

  }
})