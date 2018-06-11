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
  var res;
  await dbnnn(config.GroupMessage).where({ groupId: groupId }).where('content ', 'like', '%' + str + '%').orderBy('time', 'desc').select()
    .catch(function (e) {
      console.error(e);
    })
    .then(
    function (data) {
      console.log(data);
      res = data;
      console.log("查询群消息成功")
    });

  var len = res.length;
  for(var i = 0; i < len; i++){
    await dbnnn(config.User).where({ userId: res[i].userId }).select('userName', 'imgUrl')
      .catch(function (e) {
        console.error(e);
      })
      .then(
      function (data) {
        console.log(data);
        res[i].name = data[0].userName;
        res[i].imgUrl = data[0].imgUrl;
        console.log("获取发布消息者信息成功")
      });
  }
  
  return ctx.response.body = res;
}
