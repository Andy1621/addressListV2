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
      openId: '',
      intro: "",
      name:"",
      self_ctt: "#%##%##%##%##%#", //个人信息内容
      cont_ctt: "#%##%##%##%##%#" , //联系方式内容
      cardList: "", //名片夹
      specialList: "", //特别关注
      blackList: "", //黑名单
      addGroupList: "", //我加入的群
      createGroupList: "" //我创建的群
  }
})

Date.prototype.format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1,                 //月份 
    "d+": this.getDate(),                    //日 
    "h+": this.getHours(),                   //小时 
    "m+": this.getMinutes(),                 //分 
    "s+": this.getSeconds(),                 //秒 
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
    "S": this.getMilliseconds()             //毫秒 
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
}  