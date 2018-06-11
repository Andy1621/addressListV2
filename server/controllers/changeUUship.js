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
    await dbnnn(config.UUship).insert({ userS_id: userS_id, userB_id: userB_id, type: type })
      .catch(function (e) {
        console.error(e);
      })
      .then(
      function (data) {
        console.log(data);
        console.log("增加关系成功")
      });
  }
  else {
    await dbnnn(config.UUship).where({ userS_id: userS_id, userB_id: userB_id }).update({ type: type })
      .catch(function (e) {
        console.error(e);
      })
      .then(
      function (data) {
        console.log(data);
        console.log("修改关系成功")
      });
  }

  return ctx.response.body = ctx.request.body;
}
