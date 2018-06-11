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
  // 获取几个群
  const num = 10;
  await dbnnn(config.MyGroup).where({groupType: 'public'}).orderByRaw('RAND()').limit(num).select()
    .catch(function (e) {
      console.error(e);
    })
    .then(
    function (data) {
      console.log(data);
      ctx.response.body = data;
      console.log("随机获取群成功")
    });
  return ctx.response.body;
}
