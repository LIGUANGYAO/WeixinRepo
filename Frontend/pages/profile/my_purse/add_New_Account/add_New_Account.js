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
    bankname:""
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
     var x=0
     if(this.data.realname.length > 5 || this.data.realname.length == 1)
     {
       x ++
       this.setData({ms_namemsg: "error"})
     }
     if (this.data.cardnum.toString().length > 21 || this.data.cardnum.toString().length < 16)
     {
       x ++
       this.setData({ms_cardmsg: "error"})
     }
     if (this.data.phonenumber.length != 11) {
       x++
       this.setData({ ms_phonemsg: "error" })
     }

     if (this.data.bankname.length != 10) {
       x++
       this.setData({ ms_banknamemsg: "error" })
     }
     if(x == 0)
     {
       wx.navigateTo({
         url: '../my_purse',
       })
     }
  }
})
