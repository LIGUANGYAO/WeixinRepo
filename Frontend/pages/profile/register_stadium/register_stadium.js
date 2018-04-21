// pages/profile/register_stadium/register_stadium.js
const app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    icon_path: "",                       //path of icon
    image_path: ["", "", "", "", ""],    //path of images
    selected:0,                          //the index of image the user might select
    select:[1,0,0,0,0],                  //state of images to view
    display:["display:none;",""],         //style information of images
    introduction: '',                     //introduction of site
    service: '',                           //service comment of site
    method: 'new',
    image_buf:[],
    icon_buf: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.globalData.mainURL+"api/getSiteStatus",
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
        if(res.data.status==true)
        {
            that.setData({
               icon_path: app.globalData.uploadURL + res.data.result[0].site_icon,
               icon_buf: app.globalData.uploadURL + res.data.result[0].site_icon,
               introduction: res.data.result[0].site_introduction,
               service: res.data.result[0].site_service
            });
            var select_buf = that.data.select;
            var image = that.data.image_path;
            var select = 0;
            for(var index=0; index<res.data.picture.length; index++)
            {
              select_buf[index+1] = 1;
              select++;
              image[index] = app.globalData.uploadURL + res.data.picture[index].picture;
            }
            that.setData({
              image_buf: image,
              image_path: image,
              select: select_buf,
              selected: select,
              method: 'change'
            })
        }
      }
    })
  },
  on_click_selectavatar: function(){
    var that = this;
    wx.chooseImage({
      success: function (res) {
        that.setData({ icon_path: res.tempFilePaths[0] })
      },
    })
  },
  on_click_image: function (e) {
    var that = this;
    var id = e.target.id;
    if(id>=that.data.selected)
    wx.chooseImage({
      success: function (res) {
        var image = that.data.image_path;
        console.log(res)
        image[that.data.selected] = res.tempFilePaths[0];
        that.setData({ image_path: image, selected: that.data.selected+1 })
        var select_buf = that.data.select;
        select_buf[that.data.selected] = 1;
        that.setData({ select: select_buf })
      },
    })
  },
  on_click_delete:function(event)
  {
    var that = this;
    var image = that.data.image_path;
    var select_buf = that.data.select;
    var id=event.target.id;
    if(id<4){
      var index = 0;
      for(index = id; index<4; index++)
      {
        image[index] = image[1*index+1];
        select_buf[index] = select_buf[1 *index+1];
      }
      image[4] = '';
      select_buf[4] = 0;
    }
    else{
      image[4] = '';
      select_buf[4] = 1;
    }
    that.setData({
      image_path: image,
      select: select_buf,
      selected: that.data.selected-1
    })
  },
  blur_on_introduction: function(event){
    this.setData({ introduction: event.detail.value })
  },
  blur_on_service: function(event)
  {
    this.setData({ service: event.detail.value })
  },
  on_click_save: function()
  {
    var that = this;
    var requestURL = app.globalData.mainURL+'api/';
    if(that.data.method=='new'){
      requestURL += 'addSiteInfo';
    }
    else{
      requestURL += 'editSiteInfo';
    }
    console.log(requestURL)
    var tempFilePath = that.data.icon_path;
    if(tempFilePath != that.data.icon_buf){
      wx.uploadFile({
        url: requestURL,
        filePath: tempFilePath,
        name: 'file',
        formData:{
          'introduction': that.data.introduction,
          'service': that.data.service,
          'user_id': app.globalData.userInfo.user_id
        }
      })
    }
    else {
      var path = that.data.icon_path.split('/');
      tempFilePath = path[path.length - 1];
      wx.request({
        url: requestURL+'1',
        method: 'POST',
        header: {
          'content-type': 'application/json'
        },
        data: {
          'site_icon': tempFilePath,
          'introduction': that.data.introduction,
          'service': that.data.service,
          'user_id': app.globalData.userInfo.user_id
        }
      })
    }
    console.log(that.data.image_path);
    console.log(that.data.image_buf)
    for (var index = 0; index < that.data.image_path.length; index++) {
      tempFilePath = that.data.image_path[index];
      var index_buf = 0
      if(tempFilePath != ''){
        if (that.data.method != 'new') {
          for (; index_buf < that.data.image_buf.length; index_buf++) {
            if (tempFilePath == that.data.image_buf[index_buf]) {
              console.log("same");
              var path = that.data.image_buf[index_buf].split('/');
              tempFilePath = path[path.length - 1];
              console.log(tempFilePath)
              wx.request({
                url: app.globalData.mainURL + 'api/addSitePictureURL',
                method: 'POST',
                header: {
                  'content-type': 'application/json'
                },
                data: {
                  'user_id': app.globalData.userInfo.user_id,
                  'image': tempFilePath
                }
              })
              break;
            }
          }
          if (index_buf==that.data.image_buf.length) {
            console.log(index_buf)
            wx.uploadFile({
              url: app.globalData.mainURL + 'api/addSitePicture',
              filePath: tempFilePath,
              name: 'file',
              formData: {
                'user_id': app.globalData.userInfo.user_id
              }
            })
          }
        }
        else {
          console.log(tempFilePath)
          wx.uploadFile({
            url: app.globalData.mainURL + 'api/addSitePicture',
            filePath: tempFilePath,
            name: 'file',
            formData: {
              'user_id': app.globalData.userInfo.user_id
            }
          })
        }
      }
    }
    wx.redirectTo({
      url: './register_stadium',
    })
  }
})