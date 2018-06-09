var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

App({
  onLaunch: function () {
    qcloud.setLoginUrl(config.service.loginUrl)
  },

  globalData: {
      //个人状态和信息
      logged: false,
      first_logged: true,
      openID: '',
      intro: "",
      name:"",
      self_ctt: "#%##%##%##%##%#", //个人信息内容
      cont_ctt: "#%##%##%##%##%#"  //联系方式内容
  }
})