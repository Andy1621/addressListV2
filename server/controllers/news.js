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

async function get(ctx, next) {
  let userId = ctx.request.query.userId;
  await dbnnn(config.InfoSentBySys).where({ userId: userId }).select().orderBy('time', 'desc')
    .catch(function (e) {
      console.error(e);
    })
    .then(
    function (data) {
      console.log(data);
      ctx.response.body = data;
      console.log("获取系统通知成功")
    });
  return ctx.response.body;
}

async function deleteM(ctx, next) {
  let sysInfoId = ctx.request.body.sysInfoId;
  await dbnnn(config.InfoSentBySys).where({ sysInfoId: sysInfoId }).delete()
    .catch(function (e) {
      console.error(e);
    })
    .then(
    function (data) {
      console.log(data);
      console.log("删除系统通知成功")
    });
  return ctx.response.body = ctx.request.body;
}

module.exports = {
  get,
  deleteM
}