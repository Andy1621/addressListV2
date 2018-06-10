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
  await dbnnn(config.User).where({ userId: userId }).select()
    .catch(function (e) {
      console.error(e);
    })
    .then(
      function (data) {
        console.log(data);
        ctx.response.body = data[0];
        console.log("获取用户信息成功")
    });
  return ctx.response.body;
}

async function change(ctx, next) {
  let userId = ctx.request.body.userId;
  await dbnnn(config.User).where({ userId: userId }).update({
    intro: ctx.request.body.intro,
    userName: ctx.request.body.userName,
    email: ctx.request.body.email,
    phoneNum: ctx.request.body.phoneNum,
    department: ctx.request.body.department,
    major: ctx.request.body.major,
    city: ctx.request.body.city,
    wxNum: ctx.request.body.wxNum,
    qqNum: ctx.request.body.qqNum
  })
    .catch(function (e) {
      console.error(e);
    })
    .then(
    function (data) {
      console.log(data);
      console.log("修改用户信息成功")
    });
  return ctx.response.body = ctx.request.body;
}

module.exports = {
  get,
  change
}