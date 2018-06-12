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
  let user = {
    userId: ctx.request.body.userId,
    intro: ctx.request.body.intro,
    userName: ctx.request.body.userName,
    email: ctx.request.body.email,
    phoneNum: ctx.request.body.phoneNum,
    department: ctx.request.body.department,
    major: ctx.request.body.major,
    city: ctx.request.body.city,
    wxNum: ctx.request.body.wxNum,
    qqNum: ctx.request.body.qqNum,
  }
  //console.log('imgUrl: ' + imgUrl )
  if (ctx.request.body.imgUrl == null){
    user.imgUrl =  '../../images/myInfo/user-unlogin.png';
  }
  else{
    user.imgUrl = ctx.request.body.imgUrl;
  }
  console.log(user);
  await dbnnn(config.User).insert(user)
    .catch(function (e) {
      console.error(e);
    })
    .then(
    function (data) {
      console.log(data);
      console.log("插入用户信息成功")
    });
  return ctx.response.body = ctx.request.body;
}
