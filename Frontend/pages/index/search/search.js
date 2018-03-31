//index.js
//获取应用实例
var WxSearch = require('wxSearch/wxSearch.js')
var app = getApp()
Page({
  data: {
    txtBackground : '#fff'
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //初始化的时候渲染wxSearchdata
    //WxSearch.init(that, 43, ['weappdev', '小程序', 'wxParse', 'wxSearch', 'wxNotification']);
    //WxSearch.initMindKeys(['weappdev.com','微信小程序开发','微信开发','微信小程序']);
    WxSearch.init(that, 43);
    //WxSearch.initMindKeys(that);
  },
  
  wxSearchFn: function(e){
    var that = this
    WxSearch.wxSearchAddHisKey(that);
    
  },
  wxSearchInput: function(e){
    var that = this
    WxSearch.wxSearchInput(e,that);
  },
  wxSerchFocus: function(e){
    var that = this
    WxSearch.wxSearchFocus(e,that);
  },
  wxSearchBlur: function(e){
    var that = this

    WxSearch.wxSearchBlur(e,that);
  },
  wxSearchKeyTap:function(e){
    var that = this
    WxSearch.wxSearchKeyTap(e,that);
  },
  wxSearchDeleteKey: function(e){
    var that = this
    WxSearch.wxSearchDeleteKey(e,that);
  },
  wxSearchDeleteAll: function(e){
    var that = this;
    WxSearch.wxSearchDeleteAll(that);
  },
  wxSearchCancel: function(e){
    var that = this
    WxSearch.wxSearchCancel(that);
  },
  wxGoNextPage: function(e){
    var that = this
    WxSearch.wxGoNextPage(e, that);
  }
})
