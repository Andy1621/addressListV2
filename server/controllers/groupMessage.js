const { mysql: config } = require('../config')
const moment = require('moment')
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
  let groupMessageId = ctx.request.query.groupMessageId;
  //data1为群消息基本内容，data2为对应留言, data3为最终结果
  var data1, data2, data3={}, name;
  await dbnnn(config.GroupMessage).where({ groupMessageId: groupMessageId }).select()
    .catch(function (e) {
      console.error(e);
    })
    .then(
    function (data) {
      console.log(data);
      data1 = data;
      console.log("获取群消息成功")
    });

  await dbnnn(config.User).where({ userId: data1[0].userId }).select('userName')
    .catch(function (e) {
      console.error(e);
    })
    .then(
    function (data) {
      console.log(data);
      name = data[0].userName;
      console.log("获取发布消息者名字成功")
    });

  data3.userId = data1[0].userId;
  data3.name = name;
  data3.content =  data1[0].content;
  data3.time = data1[0].time;
  data3.imagePath = data1[0].imagePath;

  await dbnnn(config.LeaveMessage).where({ groupMessageId: groupMessageId }).select('userId', 'content')
    .catch(function (e) {
      console.error(e);
    })
    .then(
    function (data) {
      console.log(data);
      data2 = data;
      console.log("获取留言成功")
    });

  data3.leaveMessage = []

  var len = data2.length;
  for(var i = 0; i < len; i++){
    await dbnnn(config.User).where({ userId: data2[i].userId }).select('userName')
      .catch(function (e) {
        console.error(e);
      })
      .then(
      function (data) {
        console.log(data);
        name = data[0].userName;
        console.log("获取留言消息者名字成功");
        data3.leaveMessage[i]={};
        data3.leaveMessage[i].name = name;
        data3.leaveMessage[i].content = data2[i].content;
      });
  }

  return ctx.response.body = data3;
}

async function send(ctx, next) {
  var groupId = ctx.request.body.groupId;
  var userId = ctx.request.body.userId;
  var imagePath = null
  if (ctx.request.body.imagePath){
    imagePath = ctx.request.body.imagePath;
  }
  await dbnnn(config.GroupMessage).insert({
    groupId: groupId,
    userId: userId,
    content: ctx.request.body.content,
    time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    imagePath: imagePath
  })
    .catch(function (e) {
      console.error(e);
    })
    .then(
    function (data) {
      console.log(data);
      console.log("发布群消息成功")
    });

  //---通知特殊关心---
  var special=[], name, mem;
  //获取该用户名字
  await dbnnn(config.User).where({ userId: userId }).select('userName')
    .catch(function (e) {
      console.error(e);
    })
    .then(
    function (data) {
      console.log(data);
      name = data[0].userName;
      console.log("获取用户名字成功")
    });  
  //获取特别关心该用户的用户
  var temp;
  await dbnnn(config.UUship).where({ userB_id: userId, type: 'special' }).select('userS_id')
    .catch(function (e) {
      console.error(e);
    })
    .then(
    function (data) {
      console.log(data);
      temp = data;
      console.log("获取特殊关心该用户的用户成功")
    });
  var len1 = temp.length;
  for(var i = 0; i < len1; i++){
    special[i] = temp[i].userS_id;
  }
  if(len1 > 0){
    //获取在该群且特殊关心该用户的用户
    await dbnnn(config.UGship).where({ groupId: groupId }).havingIn('userId', special).select('userId')
      .catch(function (e) {
        console.error(e);
      })
      .then(
      function (data) {
        console.log(data);
        mem = data;
        console.log("获取在该群且特殊关心该用户的用户成功")
      });
    //特殊关心通知
    var len2 = mem.length;
    for (var i = 0; i < len2; i++) {
      var news = {
        type: 'special',
        content: '您特殊关心的 ' + name + ' 发布了一条消息，点击去看看吧%@%' + groupId,
        time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        userId: mem[i].userId
      }
      await dbnnn(config.InfoSentBySys).insert(news)
        .catch(function (e) {
          console.error(e);
        })
        .then(
        function (data) {
          console.log(data);
          console.log("发送特别关心通知成功")
        });
    }

  }
  return ctx.response.body = ctx.request.body;
}

async function deleteM(ctx, next) {
  let groupMessageId = ctx.request.body.groupMessageId;
  await dbnnn(config.LeaveMessage).where({ groupMessageId: groupMessageId }).del()
    .catch(function (e) {
      console.error(e);
    })
    .then(
    function (data) {
      console.log(data);
      data1 = data;
      console.log("删除相关留言成功")
    });
  await dbnnn(config.GroupMessage).where({ groupMessageId: groupMessageId }).del()
    .catch(function (e) {
      console.error(e);
    })
    .then(
    function (data) {
      console.log(data);
      data1 = data;
      console.log("删除群消息成功")
    });
}

module.exports = {
  get,
  send,
  deleteM
}