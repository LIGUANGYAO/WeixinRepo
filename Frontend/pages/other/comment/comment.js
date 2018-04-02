//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    img_black_start_src: '../../../image/star_n@2x.png',
    img_yellow_start_src: '../../../image/star_s@2x.png',
    star_img_position: 25,
    rating:[],
    method: 'event'
  },
  onLoad:function(param)
  {
    var that = this;
    var id = param.id;
    var kind = param.kind;
    if(kind=='event'){
      wx.request({
        url: app.globalData.mainURL + 'api/getRatingByEvent',
        method: 'POST',
        header:{
          'content-type': 'application/json'
        },
        data:{
          'event_id': id
        },
        success: function(res){
          console.log(id);
          console.log(res);
          var ratings = res.data.result;
          if(ratings!=null){
            for(var index=0; index<ratings.length; index++){
              ratings[index].avatar = app.globalData.uploadURL + ratings[index].avatar;
            }
            that.setData({
              rating: ratings,
              method: kind
            })
          }
        }
      })
    }
    else{
      wx.request({
        url: app.globalData.mainURL + 'api/getRatingBySite',
        method: 'POST',
        header: {
          'content-type': 'application/json'
        },
        data: {
          'boss_id': id
        },
        success: function (res) {
          var ratings = res.data.result;
          if(ratings!=null){
            for (var index = 0; index < ratings.length; index++) {
              ratings[index].avatar = app.globalData.uploadURL + ratings[index].avatar;
            }
            that.setData({
              rating: ratings,
              method: kind
            })
            console.log(ratings);
          }
        }
      })
    }
  }
})
