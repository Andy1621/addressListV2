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
  let groupId = ctx.request.body.groupId;
  let userId = ctx.request.body.userId;
  var master, userName, groupName;

  await dbnnn(config.UGship).where({ groupId: groupId, type: 'master'}).select('userId')
    .catch(function (e) {
      console.error(e);
    })
    .then(
    function (data) {
      console.log(data);
      master = data[0].userId;
      console.log("获取群主Id成功");
    });

  await dbnnn(config.MyGroup).where({ groupId: groupId }).select('groupName')
    .catch(function (e) {
      console.error(e);
    })
    .then(
    function (data) {
      console.log(data);
      groupName = data[0].groupName;
      console.log("获取群名成功");
    });

  await dbnnn(config.User).where({ userId: userId }).select('userName')
    .catch(function (e) {
      console.error(e);
    })
    .then(
    function (data) {
      console.log(data);
      userName = data[0].userName;
      console.log("获取申请用户名成功");
    });

  var news = {
    type: 'addRequest',
    content: userName + ' 申请加入您创建的群 ' + groupName + ' %@%' + groupId + '%@%' + userId,
    time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    userId: master
  }

  await dbnnn(config.InfoSentBySys).insert(news)
    .catch(function (e) {
      console.error(e);
    })
    .then(
    function (data) {
      console.log(data);
      console.log("发送加群申请通知成功")
    });
    
  return ctx.response.body = ctx.request.body;
}
