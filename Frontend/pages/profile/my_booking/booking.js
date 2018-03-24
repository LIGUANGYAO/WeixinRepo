// pages/booking/booking.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myObj1: [{ "phonenumber": 17642518820, "status": "进行中", "kind": "football", "user": "user", "match": "football", "membernum": "5", "cost": 12, "date": "2018", "place": "bejing", "iscomment": 0}],
    myObj2: [{ "phonenumber": 17642518820, "status": "asdf", "kind": "football", "user": "user", "match": "football", "membernum": "5", "cost": 12, "date": "2018", "place": "bejing", "iscomment": 1}],
    myObj3: [{ "phonenumber": 17642518820, "status": "qwer", "kind": "football", "user": "user", "match": "football", "membernum": "5", "cost": 12, "date": "2018", "place": "bejing", "iscomment": 0}],
    active1: "active",
    active2: "",
    active3: "",
    bookingArray: new Array(),
    selectedtab:"booked"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (query) {
    this.setData({ array: this.data.myObj1});
  },
  /**
 * This function is called after user select one of the tabs
 */

  selectTab: function (event) {
    this.setData({ active1: " " });
    this.setData({ active2: " " });
    this.setData({ active3: " " });
    switch (event.currentTarget.id) {
      case "btn1":
        this.setData({ active1: "active" });
        this.setData({array:this.data.myObj1});
        this.setData({selectedtab:"booked"});
        break;
      case "btn2":
        this.setData({ active2: "active" });
        this.setData({ array: this.data.myObj2});
        this.setData({ selectedtab: "finished" });
        break;
      case "btn3":
        this.setData({ array: this.data.myObj3});
        this.setData({ active3: "active" });
        this.setData({ selectedtab: "canceled"});
        break;
    }
  },
  //called when user clicked cancel event button.
  btn_remove_booking: function (event) {
    wx.showModal({
      content: '是否取消蜂约？',
      success: function (res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '../final_cancel/final_cancel',
          })
        } else if (res.cancel) {
        }
      }
    })
  },
  //called when user wants to see detail
  click_detail_event: function(event)
  {
    wx.navigateTo({
      url: 'booking_detail?id='+event.currentTarget.id,
    })
  },
  //called when user wants to write comment
  btn_write_comment: function(event)
  {
    wx.navigateTo({
      url: '../../evaluation/evaluation',
    })
  }
})