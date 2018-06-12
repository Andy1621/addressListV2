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
  let userId = ctx.request.body.userId;
  let groupId = ctx.request.body.groupId;
  var userName, groupName, groupMaster;
  await dbnnn(config.User).where({ userId: userId}).select('userName')
    .catch(function (e) {
      console.error(e);
    })
    .then(
    function (data) {
      console.log(data);
      userName = data[0].userName
      console.log("获取用户名字成功")
    });

  await dbnnn(config.MyGroup).where({ groupId: groupId }).select('groupName', 'groupMaster')
    .catch(function (e) {
      console.error(e);
    })
    .then(
    function (data) {
      console.log(data);
      groupName = data[0].groupName;
      groupMaster = data[0].groupMaster;
      console.log("获取群信息成功")
    });

  await dbnnn(config.UGship).where({ userId: userId, groupId: groupId}).delete()
    .catch(function (e) {
      console.error(e);
    })
    .then(
    function (data) {
      console.log(data);
      console.log("删除群成功")
    });

  var news = {
    type: 'quit',
    content: '用户 ' + userName + ' 已退出您创建的群 ' + groupName,
    time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    userId: groupMaster
  }
  await dbnnn(config.InfoSentBySys).insert(news)
    .catch(function (e) {
      console.error(e);
    })
    .then(
    function (data) {
      console.log(data);
      console.log("发送退群通知成功")
    });

  return ctx.response.body = ctx.request.body;
}
