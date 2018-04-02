//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    img_note_src: '../../../../image/t@2x.png',
    realname:"",
    cardnum: 0,
    idnumber:0,
    phonenumber:"",
    bankname:"",
    error: ""
   },
  input_Realname:function(e)
  {
    this.setData({realname: e.detail.value})
  },
  input_Bankcardnumber: function (e) {
    this.setData({ cardnum: e.detail.value })
  },
  input_Idcardnumber: function (e) {
    this.setData({ idnumber : e.detail.value })
  },
  input_Phonenumber: function (e) {
    this.setData({ phonenumber: e.detail.value })
  },
  input_Bankname: function (e) {
    this.setData({ bankname: e.detail.value })
  },
  on_Clicked_OK: function()
  {
    var that = this;
     var x=0
     if(this.data.realname.length > 5 || this.data.realname.length < 1)
     {
       x++
       that.setData({ error: "注：银行卡只支持一次绑定，绑定成功后不能修改，请注意填写正确信息！" })
     }
     if (that.data.cardnum.toString().length > 21 || that.data.cardnum.toString().length < 16)
     {
       x++
       that.setData({ error: "注：银行卡只支持一次绑定，绑定成功后不能修改，请注意填写正确信息！" })
     }
     if (that.data.phonenumber.length != 11) {
       x++
       that.setData({ error: "注：银行卡只支持一次绑定，绑定成功后不能修改，请注意填写正确信息！" })
     }

     if (that.data.bankname.length != 10) {
       x++
       that.setData({ error: "注：银行卡只支持一次绑定，绑定成功后不能修改，请注意填写正确信息！" })
     }
     if(x == 0)
     {
       this.setData({ error: "" })
        wx.request({
          url: app.globalData.mainURL + 'api/addBindingInfo',
          method: 'POST',
          header:{
            'content-type': 'application/json'
          },
          data:{
            user_id: app.globalData.userInfo.user_id,
            receiver: that.data.realname,
            credit_no: that.data.cardnum,
            id_no: that.data.idnumber,
            bank_phone: that.data.phonenumber,
            bank: that.data.bankname
          },
          success: function(res)
          {
            wx.redirectTo({
              url: '../my_purse',
            })
          }
        })
     }
     else{
       wx.showToast({
         title: that.data.error,
         icon: 'none',
         duration: 1000
       })
     }
  }
})
