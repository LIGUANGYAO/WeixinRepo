//index.js
/*
개인이 자기가 현재 예약한 경기에 대한 페지로서 우선 우의 경기그림과 
경기상태와
장사, 경기에 대한 소개에 대한 정보를 받아야 한다.
*/
//获取应用实例
const app = getApp()

Page({
  data: {
    tempData: { "ground_image": "../../../image/temp.jpg", "act_type": "football", "act_status": "running", "favourite": 200, "act_name": "soccer", "member_count": 10, "cost": 10, "act_date": "2018.3", "address": "asdfasdf", "ground_name": "asdf", "ground_owner": "avnd", "max_member": 10, "act_intro": "asdf" },
    param: {
      user_photo_src: '../../../image/temp.jpg',
      img_black_start_src: '../../../image/star_n@2x.png',
      img_yellow_start_src: '../../../image/star_s@2x.png',
      star_img_position: 25,
      count_yellowStar: 3,
      comment_time: "2017-12-22 11:29",
      comment_user_name: "布拉德皮蛋",
      comment_content: "这里是一条评论这里是一条评论。",
      comment_user_number: 10,
    }
  },
  onLoad: function () {
    var image_array = ["../../../image/temp.jpg", "../../../image/Home_s@3x.png", "../../../image/my_attention@3x.png", "../../../image/my_s@3x.png"]
    this.setData({ image_array: image_array })
  },
  btn_Clicked_Personal_Input: function()
  {
    wx.navigateTo({
      url: 'personal_input',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})
