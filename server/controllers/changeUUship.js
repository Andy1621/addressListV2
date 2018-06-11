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
  let userS_id = ctx.request.body.userS_id;
  let userB_id = ctx.request.body.userB_id;
  let type = ctx.request.body.type;

  if (type == 'normal') {
    await dbnnn(config.UUship).insert({ userS_id: userS_id, userB_id: userB_id, type: 'normal' })
      .catch(function (e) {
        console.error(e);
      })
      .then(
      function (data) {
        console.log(data);
        console.log("添加到名片夹成功")
      });
  }
  else if (type == 'special') {
    await dbnnn(config.UUship).where({ userS_id: userS_id, userB_id: userB_id }).update({ type: 'special' })
      .catch(function (e) {
        console.error(e);
      })
      .then(
      function (data) {
        console.log(data);
        console.log("添加到特殊关心成功")
      });
  }
  else if (type == 'black') {
    var temp;
    await dbnnn(config.UUship).where({ userS_id: userS_id, userB_id: userB_id }).select()
      .catch(function (e) {
        console.error(e);
      })
      .then(
      function (data) {
        console.log(data);
        temp = data;
        console.log("获取关系成功")
      });
    if (temp.length == 0) {
      await dbnnn(config.UUship).insert({ userS_id: userS_id, userB_id: userB_id, type: 'black' })
        .catch(function (e) {
          console.error(e);
        })
        .then(
        function (data) {
          console.log(data);
          console.log("添加到黑名单成功")
        });
    }
    else{
      await dbnnn(config.UUship).where({ userS_id: userS_id, userB_id: userB_id }).update({ type: 'black' })
        .catch(function (e) {
          console.error(e);
        })
        .then(
        function (data) {
          console.log(data);
          console.log("添加到黑名单成功")
        });
    }
  }


  return ctx.response.body = ctx.request.body;
}
