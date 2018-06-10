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
  var card = [], special = [], black = [], create = [], add = [];
  var len, temp; 

  await dbnnn(config.UUship).where({ userS_id: userId, type: 'normal'}).select('userB_id')
    .catch(function (e) {
      console.error(e);
    })
    .then(
    function (data) {
      console.log(data);
      temp = data;
      console.log("获取名片夹id成功")
    });
  len = temp.length;
  for(var i = 0; i < len; i++){
    await dbnnn(config.User).where({ userId: temp[i].userB_id }).select()
      .catch(function (e) {
        console.error(e);
      })
      .then(
      function (data) {
        console.log(data);
        card[i] = data[0];
        console.log("获取用户信息成功")
      });
  }

  await dbnnn(config.UUship).where({ userS_id: userId, type: 'special' }).select('userB_id')
    .catch(function (e) {
      console.error(e);
    })
    .then(
    function (data) {
      console.log(data);
      temp = data;
      console.log("获取特殊关心id成功")
    });
  len = temp.length;
  for (var i = 0; i < len; i++) {
    await dbnnn(config.User).where({ userId: temp[i].userB_id }).select()
      .catch(function (e) {
        console.error(e);
      })
      .then(
      function (data) {
        console.log(data);
        special[i] = data[0];
        console.log("获取用户信息成功")
      });
  }

  await dbnnn(config.UUship).where({ userS_id: userId, type: 'black' }).select('userB_id')
    .catch(function (e) {
      console.error(e);
    })
    .then(
    function (data) {
      console.log(data);
      temp = data;
      console.log("获取黑名单id成功")
    });
  len = temp.length;
  for (var i = 0; i < len; i++) {
    await dbnnn(config.User).where({ userId: temp[i].userB_id }).select()
      .catch(function (e) {
        console.error(e);
      })
      .then(
      function (data) {
        console.log(data);
        black[i] = data[0];
        console.log("获取用户信息成功")
      });
  }

  await dbnnn(config.UGship).where({ userId: userId, type: 'master' }).select('groupId')
    .catch(function (e) {
      console.error(e);
    })
    .then(
    function (data) {
      console.log(data);
      temp = data;
      console.log("获取创建的群id成功")
    });
  len = temp.length;
  for (var i = 0; i < len; i++) {
    await dbnnn(config.MyGroup).where({ groupId: temp[i].groupId }).select()
      .catch(function (e) {
        console.error(e);
      })
      .then(
      function (data) {
        console.log(data);
        create[i] = data[0];
        console.log("获取群信息成功")
      });
  }

  await dbnnn(config.UGship).where({ userId: userId, type: 'member' }).select('groupId')
    .catch(function (e) {
      console.error(e);
    })
    .then(
    function (data) {
      console.log(data);
      temp = data;
      console.log("获取加入的群id成功")
    });
  len = temp.length;
  for (var i = 0; i < len; i++) {
    await dbnnn(config.MyGroup).where({ groupId: temp[i].groupId }).select()
      .catch(function (e) {
        console.error(e);
      })
      .then(
      function (data) {
        console.log(data);
        add[i] = data[0];
        console.log("获取群信息成功")
      });
  }

  var res = {
    card: card,
    special: special,
    black: black,
    create: create,
    add: add
  }

  return ctx.response.body = res;
}
