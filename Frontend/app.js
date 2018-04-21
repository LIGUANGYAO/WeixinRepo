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
    productState: ["待发货", "待收货","交易成功"],
    eventState: ["进行中", "已完成", "已取消"],
    userRole: ['无', '场馆主', '个人'],
    eventType: ['足球', '篮球', '排球', '毛球', '乒乓球', '台球', '网球', '保龄球', '健身馆', '家', '游泳', '射击', '跆拳道', '休闭', '滑冰', '滑雪', '涌动装备', '其他'],
    memberState: ['使用中', '已过期'],
    exchangeState: ['代发货', '代收货', '交易成功'],
    bindingState: ['提现中', '提现成功', '提现失败'],
    mainURL: 'http://192.168.31.216/Backend/index.php/',
    smsURL: 'http://192.168.31.216/sms/',
    uploadURL: 'http://192.168.31.216/Backend/uploads/',
    honey_info: { 
      total_honey: 0,
      honeybox_array: [{ x: 0, y: 0, honey: 50, start_time: 1522330291885 }, { x: 8, y: 3, honey: 100, start_time: 1522330299885 }],
      },
    daily_honey: [0,0], //second is total honey of this day and first is total honey of map
    currentpage: "index",
    isactivetime: 1,
    rule: ''
  },
  onLaunch: function () {
    var _this = this
    wx.request({
      url: _this.globalData.mainURL + 'api/getRules',
      data: {
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        _this.globalData.rule = res.data.rule
      },
    })
    //wx.setStorageSync("honey_info", _this.globalData.honey_info)
    wx.login({
      success: function () {
        wx.getUserInfo({
          success: function (res) {
            var info = _this.globalData.userInfo;
            info.nickname = res.userInfo.nickName;
            info.avatar = res.userInfo.avatarUrl;
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
                  wx.setStorageSync("honey_info", _this.globalData.honey_info)
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
                    //get honey storage
                   _this.globalData.honey_info = wx.getStorageSync('honey_info')
                  } catch (e) {
                   
                  }
                  var info = _this.globalData.userInfo;
                  info.user_id = res.data.result[0].no;
                  info.phone = res.data.result[0].phone;
                  info.state = res.data.result[0].state;
                  info.forbidden = res.data.result[0].forbidden;
                  info.honey = res.data.result[0].honey;
                  info.role = res.data.result[0].role;
                  if(info.avatar=='')
                  {
                    info.avatar="/image/user-unlogin.png"
                  }
                  if(res.data.member.length!=0 && res.data.member[0]!=0)
                    info.isVIP = 1;
                  _this.globalData.userInfo = info
                }
              },
              fail: function () {

              }
            })
          }
        });
      }
    })
    /*
    var tempdate = new Date()
    if (tempdate.getHours() >= 0 && tempdate.getHours() < 7) {
      this.globalData.isactivetime = 0
      wx.setStorageSync("todayselected", [])
      this.globalData.daily_honey = [0, 0]
      //code for walking step
    }
    */
    setInterval(this.checkDate, 1000)
  },
  onHide:function()
  {
    //wx.setStorageSync('honey_info', this.globalData.honey_info)
  },
  checkDate: function()
  {
    /*
    var tempdate = new Date()
    if(tempdate.getHours() == 0 && tempdate.getMinutes() == 0)
    {
      this.globalData.isactivetime = 0
      wx.setStorageSync("todayselected", [])
      this.globalData.daily_honey = [0,0]
      //code for walking step
    }
    if(tempdate.getHours() == 7 && tempdate.getMinutes() == 0)
    {
      this.globalData.isactivetime = 1
    }
    */
    /*
    for (var iter = 0; iter < this.globalData.honey_info.honeybox_array.length; iter ++){
      if (Date.now() - this.globalData.honey_info.honeybox_array[iter].start_time > 86400000){
        this.globalData.honey_info.honeybox_array.splice(iter, 1)
      }
    }
    */
  },
  
  gainNewHoney: function(newhoney = 100, honeytype)
  {
    var iter;
    var tempx, tempy
    console.log(newhoney)
    if (newhoney + this.globalData.daily_honey[honeytype] > this.globalData.rule[5 + honeytype] * (this.globalData.userInfo.isVIP + 1))
    {
      var sum = 0
      while(sum > newhoney)
      {
        sum += this.globalData.honey_info.honeybox_array[0].honey
        this.globalData.honey_info.honeybox_array.shift();
      }
    }
    while(1)
    {
      tempx = Math.floor((Math.random() * 100) % 9)
      tempy = Math.floor((Math.random() * 100) % 4)
      for (iter = 0; iter < this.globalData.honey_info.honeybox_array.length; iter++)
      {
        if (tempx == this.globalData.honey_info.honeybox_array[iter].x && tempy == this.globalData.honey_info.honeybox_array[iter].y){
          break;
        }
      }
      if (iter == this.globalData.honey_info.honeybox_array.length)
      {
        break;
      }
    }
    this.globalData.daily_honey[0] += newhoney
    this.globalData.daily_honey[1] += newhoney

    this.globalData.honey_info.honeybox_array.push({ x: tempx, y: tempy, honey: newhoney, start_time: Date.now() })
    /*
    wx.setStorageSync('total_honey', this.globalData.total_honey)
    wx.setStorageSync('honeybox_array', this.globalData.honeybox_array)
    */
  }
})