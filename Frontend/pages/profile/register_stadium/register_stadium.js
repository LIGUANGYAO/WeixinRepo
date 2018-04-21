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
    method: 'new'
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
        if(res.data.status==true)
        {
            that.setData({
               icon_path: app.globalData.uploadURL + res.data.result[0].site_icon,
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
              image_path: image,
              select: select_buf,
              selected: select,
              method: 'change'
            })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

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
    var tempFilePath =[];
    tempFilePath[0] = that.data.icon_path;
    for(var index = 0; index< that.data.selected; index++)
    {
      tempFilePath[index + 1] = that.data.image_path[index];
    }
    wx.uploadFile({
      url: requestURL,
      filePath: tempFilePath,
      formData:{
        'introduction': that.data.introduction,
        'service': that.data.service,
        'user_id': app.globalData.userInfo.user_id
      },
      success: function(res)
      {
        if(res.data.status == true)
        {
          wx.showToast({
            title: '保存成功',
            icon: 'none'
          })
        }
      }
    })
  }
})