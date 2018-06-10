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
  let str = ctx.request.query.str;
  await dbnnn(config.GroupMessage).where({ groupId: groupId }).where('content ', 'like', '%' + str + '%').select()
    .catch(function (e) {
      console.error(e);
    })
    .then(
    function (data) {
      console.log(data);
      ctx.response.body = data;
      console.log("查询群消息成功")
    });
  return ctx.response.body;
}
