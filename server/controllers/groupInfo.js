const { mysql: config } = require('../config')
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
  //data1群成员Id，data2群成员基本信息，data3群消息Id,data4最终结果
  var data1, data2 = [], data3 = [], data4 = {};
  data4.member = new Array();
  data4.groupMessage = new Array();

  await dbnnn(config.UGship).where({ groupId: groupId }).select('userId')
    .catch(function (e) {
      console.error(e);
    })
    .then(
    function (data) {
      console.log(data);
      data1 = data;
      console.log("获取群成员Id成功");
    });

  var len1 = data1.length;
  for (var i = 0; i < len1; i++) {
    await dbnnn(config.User).where({ userId: data1[i].userId }).select()
      .catch(function (e) {
        console.error(e);
      })
      .then(
      function (data) {
        console.log(data);
        data2[i] = data;
        console.log("获取用户信息成功")
      });
  }

  var temp;
  await dbnnn(config.GroupMessage).where({ groupId: groupId }).select('groupMessageId').orderBy('time', 'desc')
    .catch(function (e) {
      console.error(e);
    })
    .then(
    function (data) {
      console.log(data);
      temp = data;
      console.log("获取群消息Id成功")
    });
  var len2 = temp.length;
  for(var i = 0; i <len2; i++){
    data3[i] = temp[i].groupMessageId;
  }

  data4.member = data2;
  data4.memberNum = len1;
  data4.groupMessage = data3;
  data4.groupMessageNum = len2;
  return ctx.response.body = data4;
}
