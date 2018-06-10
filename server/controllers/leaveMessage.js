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

async function send(ctx, next) {
  var userId = ctx.request.body.userId;
  var groupId = ctx.request.body.groupId;
  await dbnnn(config.LeaveMessage).insert({
    groupMessageId: ctx.request.body.groupMessageId,
    userId: userId,
    content: ctx.request.body.content
  })
    .catch(function (e) {
      console.error(e);
    })
    .then(
    function (data) {
      console.log(data);
      console.log("发布留言成功")
    });

  var userName;
  await dbnnn(config.User).where({ userId: userId }).select('userName')
    .catch(function (e) {
      console.error(e);
    })
    .then(
    function (data) {
      console.log(data);
      userName = data[0].userName;
      console.log("获取用户名字成功");
    });
  var news = {
    type: 'leaveMessage',
    content: userName + ' 在您发布的消息下留言了，点击去看看吧%@%' + groupId,
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
      console.log("发送留言通知成功")
    });

  return ctx.response.body = ctx.request.body;
}

async function deleteM(ctx, next) {
  let leaveMessageId = ctx.request.body.leaveMessageId;
  await dbnnn(config.LeaveMessage).where({ leaveMessageId: leaveMessageId }).del()
    .catch(function (e) {
      console.error(e);
    })
    .then(
    function (data) {
      console.log(data);
      data1 = data;
      console.log("删除留言成功")
    });
  return ctx.response.body = ctx.request.body;
}

module.exports = {
  send,
  deleteM
}