
//获取应用实例
const app = getApp()

Page({
  data: {
    currentstatus: 2,
    tempData: { "ground_image":"../../../image/temp.jpg","act_type": "football", "act_status":"running","favourite": 200, "act_name": "soccer", "member_count":10, "cost": 10,"act_date":"2018.3","address":"asdfasdf" ,"ground_name":"asdf", "ground_owner":"avnd", "max_member": 10, "act_intro":"asdf"},
    param: {
      user_photo_src: '../../../image/temp.jpg',
      img_black_start_src: '../../../image/star_n@2x.png',
      img_yellow_start_src: '../../../image/star_s@2x.png',
      star_img_position: 25,
      count_yellowStar: 3,
      comment_time: "2017-12-22 11:29",
      comment_user_name: "布拉德皮蛋",
      comment_content: "这里是一条评论这里是一条评论。",
      comment_user_number: 10
    },
    param1:{
      name: "郭德纲刚",
      costway: "线上支付",
      phonenumber:"13456767847",
      membercount: 5,
      total: 100
    }
  },
})
