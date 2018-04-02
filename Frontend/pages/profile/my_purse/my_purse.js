//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    image_withdrawal_next_src: '../../resources/next@2x.png',
    account_balance: 0,
    is_new_user: 1,
    cost: 0,
    receiver: "",
    credit_no: "",
    id_no: ""
  },
  onLoad: function(){
    var that = this;
    wx.request({
      url: app.globalData.mainURL + 'api/getBindingInfo',
      method: 'POST',
      header:{
        'content-type': 'application/json'
      },
      data:{
        'user_id': app.globalData.userInfo.user_id
      },
      success: function(res)
      {
        console.log(res);
        if(res.data.status==true){
          that.setData({
            is_new_user: 0,
            account_balance: res.data.result[0].amount,
            receiver: res.data.result[0].receiver,
            credit_no: res.data.result[0].credit_no,
            id_no: res.data.result[0].id_no
          })
        }
      }
    })
  },
  onCancel: function () {
    this.setData({
      showModal: false
    });
  },
  //if user will send money
  onConfirm: function (e) {
    if(this.data.cost < 100)
    {
      wx.showToast({title: "输入金额比100元小！", icon:'none'})
    }
    else if(this.data.cost > 1*this.data.account_balance)
    {
      wx.showToast({ title: "余额不足", icon: 'none'})
    }
    else{
      var that = this;
      wx.request({
        url: app.globalData.mainURL + 'api/addBindingHistory',
        method: 'POST',
        header: {
          'content-type': 'application/json'
        },
        data: {
          'user_id': app.globalData.userInfo.user_id,
          'amount': that.data.cost
        },
        success: function (res) {
          if(res.data.status==true){
            wx.redirectTo({
              url: '../final_cancel/final_cancel?method=purse'
            })
          }
        }
      })
    }
  },
   //if user will register
  onCancel1: function () {
    this.setData({
      showModal1: false
    });
  },
  onConfirm1: function () {
    this.setData({
      showModal1: false
    });
    wx.navigateTo({
      url: 'add_New_Account/add_New_Account',
    })
  },
  //bind input data to variable
  on_Input_Cost: function(e)
  {
    this.setData({
      cost: e.detail.value
    })
  },
  //when user click send button
  on_Clicked_Cost: function()
  {
    if(this.data.is_new_user == 1)
    {
      this.setData({
        showModal1: true
      })
    }
    else {
      this.setData({
        showModal: true
      })
    }

  },
  on_Clicked_Detail: function()
  {
    wx.navigateTo({
      url: 'trans_detail/trans_detail',
    })
  }
})
