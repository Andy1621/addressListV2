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
  let groupId = ctx.request.body.groupId;
  let userId = ctx.request.body.userId;
  let sysInfoId = ctx.request.body.sysInfoId;
  var groupName, temp, res;

  await dbnnn(config.UGship).where({ groupId: groupId , userId: userId}).select()
    .catch(function (e) {
      console.error(e);
    })
    .then(
    function (data) {
      temp = data;
      console.log("获取群关系成功");
    });

  if(temp.length == 0){
    res = 'success';

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

    if (op == 'yes') {
      var member = {
        userId: userId,
        groupId: groupId,
        type: 'member'
      }
      await dbnnn(config.UGship).insert(member)
        .catch(function (e) {
          console.error(e);
        })
        .then(
        function (data) {
          console.log(data);
          console.log("同意加群成功")
        });

      var news = {
        type: 'addResult',
        content: '您申请加入群 ' + groupName + ' 的请求已被群主通过',
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
          console.log("发送通过加群申请通知成功")
        });
    }

    else if (op == 'no') {
      var news = {
        type: 'addResult',
        content: '您申请加入群 ' + groupName + ' 的请求已被群主拒绝',
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
          console.log("发送拒绝加群申请通知成功")
        });
    }
  }

  else{
    res = 'fail';
  }
  
  await dbnnn(config.InfoSentBySys).where({ sysInfoId: sysInfoId }).update({ type: 'addOver' })
    .catch(function (e) {
      console.error(e);
    })
    .then(
    function (data) {
      console.log(data);
      console.log("处理加群申请结束")
    });

  return res;
}
