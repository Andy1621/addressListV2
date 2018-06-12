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
  await dbnnn(config.UGship).where({ userId: userId, groupId: groupId }).delete()
    .catch(function (e) {
      console.error(e);
    })
    .then(
    function (data) {
      console.log(data);
      console.log("删除用户成功")
    });

  var groupName;
  await dbnnn(config.MyGroup).where({ groupId: groupId }).select('groupName')
    .catch(function (e) {
      console.error(e);
    })
    .then(
    function (data) {
      console.log(data);
      groupName = data[0].groupName;
      console.log("获取群信息成功")
    });

  var news = {
    type: 'kick',
    content: '您已被群主踢出群 ' +  groupName,
    time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    userId: userId
  }
  await dbnnn(config.InfoSentBySys).insert(news)
    .catch(function (e) {
      console.error(e);
    })
    .then(
    function (data) {
      console.log(data);
      console.log("发送踢群通知成功")
    });

  return ctx.response.body = ctx.request.body;
}
