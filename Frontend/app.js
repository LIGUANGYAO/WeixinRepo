//app.js
App({
  globalData: {
    userInfo: {
      'nickname': 'WeiXin',
      'avatar': '',
      'user_id': 0,
      'name': '',
      'phone': '',
      'honey': 0,
      'state': 0,
      'forbidden': 0,
      'isVIP': 0,
      eventData: { "ground_image": "", "act_type": "", "act_status": "", "favourite": 0, "act_name": "", "member_count": 0, "cost": 0, "act_date": " ", "address": "", "ground_name": "", "ground_owner": "", "max_member": 0, "act_intro": "" },
    },
    eventState: ["进行中", "已完成", "已取消"],
    userRole: ['无', '场馆主', '个人'],
    eventType: ['足球', '篮球', '排球', '毛球', '乒乓球', '台球', '网球', '保龄球', '健身馆', '家', '游泳', '射击', '跆拳道', '休闭', '滑冰', '滑雪', '涌动装备', '其他'],
    memberState: ['使用中', '已过期'],
    exchangeState: ['代发货', '代收货', '交易成功'],
    bindingState: ['提现中', '提现成功', '提现失败'],
    mainURL: 'http://192.168.31.231/Backend/',
    smsURL: 'http://192.168.31.231/sms/',
    uploadURL: 'http://192.168.31.231/Backend/uploads/',

    total_honey: 0,
    is_set: 0,
    honeybox_array: [{ x: 0, y: 0, honey: 100, start_time: 1522330291885 }, { x: 8, y: 3, honey: 100, start_time: 1522330299885 }],
  },
  onLaunch: function () {
    var _this = this;
    wx.login({
      success: function () {
        wx.getUserInfo({
          success: function (res) {
            var info = _this.globalData.userInfo;
            info.nickname = res.userInfo.nickName;
            info.avatar = res.userInfo.avatarUrl;
            if (info.avatar == '') {
              info.avatar = '../../image/user-unlogin.png'
            }
            wx.request({
              url: _this.globalData.mainURL + 'api/getUserState',
              data: {
                'nickname': _this.globalData.userInfo.nickname
              },
              method: 'POST',
              header: {
                'content-type': 'application/json'
              },
              success: function (res) {
                if (res.data.status == false) {
                  wx.setStorageSync('total_honey', 0)
                  wx.setStorageSync('honeybox_array', [])
                  wx.request({
                    method: 'POST',
                    header: {
                      'content-type': 'application/json'
                    },
                    url: _this.globalData.mainURL + 'api/addNewUser',
                    data: {
                      'nickname': _this.globalData.userInfo.nickname,
                      'avatar': _this.globalData.userInfo.avatar
                    },
                    success: function (res) {
                      var info = res.data.result;
                      var info = _this.globalData.userInfo;
                      info.user_id = res.data.result;
                    }
                  })
                }
                else {
                  try {
                    _this.globalData.total_honey = wx.getStorageSync('total_honey')
                    //_this.globalData.honeybox_array = wx.getStorageSync('honeybox_array')
                  } catch (e) {
                   
                  }
                  var info = _this.globalData.userInfo;
                  info.user_id = res.data.result[0].no;
                  info.phone = res.data.result[0].phone;
                  info.state = res.data.result[0].state;
                  info.forbidden = res.data.result[0].forbidden;
                  info.honey = res.data.result[0].honey;
                  info.role = res.data.result[0].role;
                  if (res.data.member.length != 0 && res.data.member[0] != 0)
                    info.isVIP = 1;
                }
              },
              fail: function () {

              }
            })
          }
        });
      }
    })
    setInterval(this.checkDate, 1000)
  },
  checkDate: function()
  {
    var tempdate = new Date()
    if(tempdate.getHours() == 0 && this.globalData.is_set == 0)
    {
      //code for walking step
      this.globalData.is_set = 1
    }
    if(tempdate.getHours() == 7)
    {
      this.globalData.is_set = 0
    }
    for (var iter = 0; iter < this.globalData.honeybox_array.length; iter ++){
      if(Date.now() - this.globalData.honeybox_array[iter].start_time > 86400000){
        this.globalData.honeybox_array.splice(iter, 1)
      }
    }
  },
  gainNewHoney: function(newhoney = 100)
  {
    var iter;
    var tempx, tempy
    while(1)
    {
      tempx = Math.floor((Math.random() * 100) % 9)
      tempy = Math.floor((Math.random() * 100) % 4)
      for (iter = 0; iter < this.globalData.honeybox_array.length; iter++)
      {
        if(tempx == this.globalData.honeybox_array[iter].x && tempy == this.globalData.honeybox_array[iter].y){
          break;
        }
      }
      if (iter == this.globalData.honeybox_array.length)
      {
        break;
      }
    }
    this.globalData.total_honey += newhoney
    this.globalData.honeybox_array.push({ x: tempx, y: tempy, honey: newhoney, start_time: Date.now() })
    if (this.globalData.total_honey > 1000)
    {
      for (iter = 0; iter < this.globalData.honeybox_array.length; iter++) {
        if (this.globalData.total_honey - this.globalData.honeybox_array[iter].honey >1000) {
          this.globalData.total_honey -= this.globalData.honeybox_array[iter].honey
          this.globalData.honeybox_array.shift()
        }
        else{
          break;
        }
      }
    }
    wx.setStorageSync('total_honey', this.globalData.total_honey)
    wx.setStorageSync('honeybox_array', this.globalData.honeybox_array)
  }
})