const { mysql: config } = require('../config')
const moment = require('moment')
const dbnnn = require('knex')({
  client: 'mysql',
  connection: {
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.pass,
    database: config.myDb,
    charset: config.char,
    multipleStatements: true
  }
})

module.exports = async (ctx, next) => {
  let groupName = ctx.request.body.groupName;
  let groupIntro = ctx.request.body.groupIntro;
  let groupType = ctx.request.body.groupType;
  let userId = ctx.request.body.userId;
  let imgUrl = ctx.request.body.imgUrl;
  var userName, administartor = [], groupId;

  var group = {
    groupName: groupName,
    groupIntro: groupIntro,
    groupType: 'wait',
    groupMaster: userId
  }
  if(imgUrl == ''){
    group.imgUrl = '../../images/tab/list.png'
  }
  else{
    group.imgUrl = imgUrl
  }
  await dbnnn(config.MyGroup).insert(group)
    .catch(function (e) {
      console.error(e);
    })
    .then(
    function (data) {
      console.log(data);
      groupId = data[0];
      console.log("待通过群创建成功")
    });

  await dbnnn(config.User).where({ userId: userId }).select('userName')
    .catch(function (e) {
      console.error(e);
    })
    .then(
    function (data) {
      console.log(data);
      userName = data[0].userName;
      console.log("获取申请用户名字成功");
    });

  var news = {
    type: 'createRequest',
    content: userName + ' 申请创建群 ' + groupName + ' ，点击进行处理%@%' + groupName + '%@%' + groupIntro + '%@%' + groupType + '%@%' + groupId + '%@%' + userId,
    time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
  }
  
  var temp;
  await dbnnn(config.Administrator).select('userId')
    .catch(function (e) {
      console.error(e);
    })
    .then(
    function (data) {
      console.log(data);
      temp = data;
      console.log("获取管理员Id成功");
    });
  var len = temp.length;
  for(var i = 0; i < len; i++){
    administartor[i] = temp[i].userId;
  }

  for (var i = 0; i < len; i++) {
    news.userId = administartor[i]
    await dbnnn(config.InfoSentBySys).insert(news)
      .catch(function (e) {
        console.error(e);
      })
      .then(
      function (data) {
        console.log(data);
        console.log("发送建群申请通知成功")
      });
  }

  return ctx.response.body = ctx.request.body;
}
