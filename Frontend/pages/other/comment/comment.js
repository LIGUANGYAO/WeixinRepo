//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    img_black_start_src: '../../../image/star_n@2x.png',
    img_yellow_start_src: '../../../image/star_s@2x.png',
    star_img_position: 25,
    comment_array: [{ "user_photo_src": "../../../image/temp.jpg", "comment_user_name": "布拉德皮蛋","comment_time": "2017-12-22 11:29", "comment_content": "这里是一条评论这里是一条评论。", "count_yellowStar": 3}],
    comment_user_number: 3
  },
  onLoad:function()
  {
  }
})
