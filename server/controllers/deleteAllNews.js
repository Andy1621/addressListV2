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
  let userId = ctx.request.query.userId;
  await dbnnn(config.InfoSentBySys).where({ userId: userId}).delete()
    .catch(function (e) {
      console.error(e);
    })
    .then(
    function (data) {
      console.log(data);
      console.log("删除全部消息成功")
    });
  return ctx.response.body = ctx.request.body;
}
