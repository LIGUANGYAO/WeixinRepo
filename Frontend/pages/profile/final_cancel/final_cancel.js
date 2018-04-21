//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    image_cancel_success_src: '../../../image/success@2x.png',
    cancel_sucess_text: "取消成功，钱款将在1-3个工作日退回",
    
    
    
    reg_pay_method: 1,   // 1: online pay, 0: offline pay
    reg_member_phone_number: "13456767847",
    join_play_member: "共5人，合计100元",
    all_reg_members: 10,

    reg_pay_method_online: "线上支付",
    reg_pay_method_offline: "线下支付",
  }
})
