//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    param:{
      user_photo_src: '../../resources/cat.png',
      reg_pay_method: 1,   // 1: online pay, 0: offline pay
      reg_member_phone_number: "13456767847",
      reg_member_name: "布拉德皮蛋",
      join_play_member: "共5人，合计100元",
      all_reg_members: 10,
      reg_pay_method_online: "线上支付",
      reg_pay_method_offline: "线下支付",
    }
  }
})
