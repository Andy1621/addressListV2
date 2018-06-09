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
  await dbnnn(config.UUship).where({ userS_id: userS_id, userB_id: userB_id }).delete()
    .catch(function (e) {
      console.error(e);
    })
    .then(
    function (data) {
      console.log(data);
      console.log("删除名片成功")
    });
  return ctx.response.body = ctx.request.body;
}
