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
  let groupId = ctx.request.query.groupId;

  var data1, data2, groupName;

  await dbnnn(config.MyGroup).where({ groupId: groupId }).select('groupName')
    .catch(function (e) {
      console.error(e);
    })
    .then(
    function (data) {
      console.log(data);
      groupName = data[0].groupName;
      console.log("获取群名字成功")
    });

  await dbnnn(config.GroupMessage).where({ groupId: groupId }).select('groupMessageId')
    .catch(function (e) {
      console.error(e);
    })
    .then(
    function (data) {
      console.log(data);
      data1 = data;
      console.log("获取群消息id成功")
    });

  for (var i in data1) {
    await dbnnn(config.LeaveMessage).where({ groupMessageId: data1[i].groupMessageId }).del()
      .catch(function (e) {
        console.error(e);
      })
      .then(
      function (data) {
        console.log(data);
        console.log("删除留言成功")
      });
  }

  await dbnnn(config.GroupMessage).where({ groupId: groupId }).del()
    .catch(function (e) {
      console.error(e);
    })
    .then(
    function (data) {
      console.log(data);
      data1 = data;
      console.log("删除群消息成功")
    });

  await dbnnn(config.UGship).where({ groupId: groupId }).select('userId')
    .catch(function (e) {
      console.error(e);
    })
    .then(
    function (data) {
      console.log(data);
      data2 = data;
      console.log("获取群成员成功")
    });

  for (var i in data2) {
    var news = {
      type: 'dismiss',
      content: '您所在的群 ' + groupName + ' 已被群主解散',
      time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      userId: data2[i].userId
    }
    await dbnnn(config.InfoSentBySys).insert(news)
      .catch(function (e) {
        console.error(e);
      })
      .then(
      function (data) {
        console.log(data);
        console.log("发送散群通知通知成功")
      });
  }

  await dbnnn(config.UGship).where({ groupId: groupId }).del()
    .catch(function (e) {
      console.error(e);
    })
    .then(
    function (data) {
      console.log(data);
      console.log("删除群成员成功")
    });

  await dbnnn(config.MyGroup).where({ groupId: groupId }).del()
    .catch(function (e) {
      console.error(e);
    })
    .then(
    function (data) {
      console.log(data);
      console.log("删除群成功")
    });

  return ctx.response.body = ctx.request.body;
}
