//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    image_withdrawal_next_src: '../../resources/next@2x.png',
    account_balance: 500.01,
    is_new_user: 1,
    cost:0
  },
  onCancel: function () {
    this.setData({
      showModal: false
    });
  },
  //if user will send money
  onConfirm: function (e) {
    if(this.data.cost < 0)
    {
      this.setData({ms_errormsg: "error"})
    }
    else if (this.data.cost > 100)
    {
      this.setData({ ms_errormsg: "error" })
    }
    else if(this.data.cost > this.data.account_balance)
    {
      this.setData({ ms_errormsg: "error" })
    }
    else{
      this.setData({
        showModal: false
      });
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
    else{
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
