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
  let op = ctx.request.body.op;
  let groupType = ctx.request.body.groupType;
  let groupId = ctx.request.body.groupId;
  let userId = ctx.request.body.userId;
  let sysInfoId = ctx.request.body.sysInfoId;
  var groupName;

  var temp;
  await dbnnn(config.MyGroup).where({ groupId: groupId }).select()
    .catch(function (e) {
      console.error(e);
    })
    .then(
    function (data) {
      console.log(data);
      temp = data
      console.log("获取群成功")
    });

var sameId;
  await dbnnn(config.InfoSentBySys).where({ sysInfoId: sysInfoId }).select('sameId')
    .catch(function (e) {
      console.error(e);
    })
    .then(
    function (data) {
      sameId = data[0].sameId
      console.log("获取通知sameId")
    });


  await dbnnn(config.InfoSentBySys).where({ sameId: sameId }).update({ type: 'createOver' })
    .catch(function (e) {
      console.error(e);
    })
    .then(
    function (data) {
      console.log(data);
      console.log("修改通知为已处理成功")
    });

  if (temp.length == 0 || temp[0].groupType != 'wait'){
    ctx.response.body = 'fail';
  }

  else {
    ctx.response.body = 'success';

    await dbnnn(config.MyGroup).where({ groupId: groupId }).select('groupName')
      .catch(function (e) {
        console.error(e);
      })
      .then(
      function (data) {
        console.log(data);
        groupName = data[0].groupName;
        console.log("获取群名字成功");
      });

    if (op == 'yes') {
      await dbnnn(config.MyGroup).where({ groupId: groupId }).update({ groupType: groupType })
        .catch(function (e) {
          console.error(e);
        })
        .then(
        function (data) {
          console.log(data);
          console.log("同意建群成功")
        });

      var news = {
        type: 'createResult',
        content: '您申请创建群 ' + groupName + ' 的请求已被管理员通过',
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
          console.log("发送通过建群申请通知成功")
        });

      await dbnnn(config.UGship).insert({userId: userId, groupId: groupId, type: 'master'})
        .catch(function (e) {
          console.error(e);
        })
        .then(
        function (data) {
          console.log(data);
          console.log("用户建群成功")
        });
    }
    else if (op == 'no') {
      await dbnnn(config.MyGroup).where({ groupId: groupId }).del()
        .catch(function (e) {
          console.error(e);
        })
        .then(
        function (data) {
          console.log(data);
          console.log("拒绝建群成功")
        });

      var news = {
        type: 'createResult',
        content: '您申请创建群 ' + groupName + ' 的请求已被管理员拒绝',
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
          console.log("发送拒绝建群申请通知成功")
        });
    }
  }

  return ctx.response.body;
}
