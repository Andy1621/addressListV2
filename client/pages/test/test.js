// pages/test/test.js
var config = require('../../config')
const util = require('../../utils/util');



Page({

  data:{
    news:[{}],
  },

  //1.获取用户信息
  getUserInfo: function () {
    console.log("发出一个getUserInfo请求");
    wx.request({
      url: config.service.userInfoUrl,
      data: {
        userId: 'buaasoft1621'
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        util.showSuccess('操作成功');
      },
      fail: function (res) {
        util.showModel('操作失败');
      },
    })
  },

  //2.修改用户信息
  changeUserInfo: function () {
    console.log("发出一个changeUserInfo请求");
    wx.request({
      url: config.service.userInfoUrl,
      data: {
        userId: 'buaasoft1621',
        intro: 'byebye',
        userName: 'superMan',
        email: '1621@163.com',
        phoneNum: '78987864221',
        department: 'soft',
        major: 'design',
        city: 'beijing',
        wxNum: 'nowxin',
        qqNum: '???'
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        util.showSuccess('操作成功');
      },
      fail: function (res) {
        util.showModel('操作失败');
      },
    })
  },

  //3.添加新用户
  addUser: function () {
    console.log("发出一个addUser请求");
    wx.request({
      url: config.service.addUserUrl,
      data: {
        userId: 'buaasoft1621',
        intro: 'hello',
        userName: 'superMan',
        email: '1621@qq.com',
        phoneNum: '12345678912',
        department: 'soft',
        major: 'design',
        city: 'beijing',
        wxNum: 'nowxin',
        qqNum: '654654',
        imgUrl: 'D:\\'
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        util.showSuccess('操作成功');
      },
      fail: function (res) {
        util.showModel('操作失败');
      },
    })
  },

  //4.获取群基本信息
  getGroupInfo: function () {
    console.log("发出一个getGroupInfo请求");
    wx.request({
      url: config.service.groupInfoUrl,
      data: {
        groupId: 1
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        util.showSuccess('操作成功');
      },
      fail: function (res) {
        util.showModel('操作失败');
      },
    })
  },

  //5.获取群消息内容
  getGroupMessage: function () {
    var that = this;
    console.log("发出一个groupMessageId请求");
    wx.request({
      url: config.service.groupMessageUrl,
      data: {
        groupMessageId: 1
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          groupMessage: res.data
        })
        util.showSuccess('操作成功');
      },
      fail: function (res) {
        util.showModel('操作失败');
      },
    })
  },

  //6. 随机获取数个公有群的基本信息
  randGetGroup: function () {
    console.log("发出一个randGetGroup请求");
    wx.request({
      url: config.service.randGetGroupUrl,
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        util.showSuccess('操作成功');
      },
      fail: function (res) {
        util.showModel('操作失败');
      },
    })
  },

  //7.查询公有群
  searchPublic: function () {
    console.log("发出一个searchPublic请求");
    wx.request({
      url: config.service.searchPublicUrl,
      data: {
        str: 'first'
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        util.showSuccess('操作成功');
      },
      fail: function (res) {
        util.showModel('操作失败');
      },
    })
  },

  //8.获取系统通知
  getNews: function () {
    console.log("发出一个getNews请求");
    var that = this;
    wx.request({
      url: config.service.newsUrl,
      data: {
        userId: '0001'
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          news: res.data
        })
        util.showSuccess('操作成功');
      },
      fail: function (res) {
        util.showModel('操作失败');
      },
    })
  },
  
  //9.获取通讯录表
  getAddressList: function () {
    console.log("发出一个getAddressList请求");
    wx.request({
      url: config.service.getAddressListUrl,
      data: {
        userId: 'buaasoft1621'
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        util.showSuccess('操作成功');
      },
      fail: function (res) {
        util.showModel('操作失败');
      },
    })
  },

  //10.查询群消息
  searchGroupMessage: function () {
    console.log("发出一个searchGroupMessage请求");
    wx.request({
      url: config.service.searchGroupMessageUrl,
      data: {
        groupId: 1,
        str: '2号'
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        util.showSuccess('操作成功');
      },
      fail: function (res) {
        util.showModel('操作失败');
      },
    })
  },

  //11.申请加群
  addGroupRequest: function () {
    console.log("发出一个addGroupRequest请求");
    wx.request({
      url: config.service.addGroupRequestUrl,
      data: {
        groupId: 1,
        userId: 'buaaSoft1621'
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        util.showSuccess('操作成功');
      },
      fail: function (res) {
        util.showModel('操作失败');
      },
    })
  },

  //12.处理加群
  dealAddGroupRequest: function () {
    console.log("发出一个dealAddGroupRequest请求");
    wx.request({
      url: config.service.dealAddGroupRequestUrl,
      data: {
        op: 'no',
        groupId: 1,
        userId: 'buaaSoft1621',
        sysInfoId: 26
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        util.showSuccess('操作成功');
      },
      fail: function (res) {
        util.showModel('操作失败');
      },
    })
  },

  //13.申请建群
  createGroupRequest: function () {
    console.log("发出一个createGroupRequest请求");
    wx.request({
      url: config.service.createGroupRequestUrl,
      data: {
        groupName: 'machine',
        groupType: 'public',
        groupIntro: 'a group of machine',
        userId: 'buaasoft1621'
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        util.showSuccess('操作成功');
      },
      fail: function (res) {
        util.showModel('操作失败');
      },
    })
  },

  //14.处理建群
  dealCreateGroupRequest: function () {
    console.log("发出一个dealCreateGroupRequest请求");
    wx.request({
      url: config.service.dealCreateGroupRequestUrl,
      data: {
        op: 'yes',
        groupType: 'public',
        groupId: 30,
        userId: 'buaasoft1621',
        sysInfoId: 43
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        util.showSuccess('操作成功');
      },
      fail: function (res) {
        util.showModel('操作失败');
      },
    })
  },

  //15.发布群消息
  sendGroupMessage: function () {
    console.log("发出一个sendGroupMessage请求");
    wx.request({
      url: config.service.groupMessageUrl,
      data: {
        groupId: 1,
        userId: '0002',
        content: '测试特殊关心'
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        util.showSuccess('操作成功');
      },
      fail: function (res) {
        util.showModel('操作失败');
      },
    })
  },

  //16.发布留言
  sendLeaveMessage: function () {
    console.log("发出一个sendLeaveMessage请求");
    wx.request({
      url: config.service.leaveMessageUrl,
      data: {
        groupId: 1,
        groupMessageId: 8,
        userId: '0004',
        content: '测试留言'
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        util.showSuccess('操作成功');
      },
      fail: function (res) {
        util.showModel('操作失败');
      },
    })
  },

  //17.删除群消息
  deleteGroupMessage: function () {
    console.log("发出一个deleteGroupMessage请求");
    wx.request({
      url: config.service.groupMessageUrl,
      data: {
        groupMessageId: 7
      },
      method: 'DELETE',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        util.showSuccess('操作成功');
      },
      fail: function (res) {
        util.showModel('操作失败');
      },
    })
  },

  //18.删除留言
  deleteLeaveMessage: function () {
    console.log("发出一个deleteLeaveMessage请求");
    wx.request({
      url: config.service.leaveMessageUrl,
      data: {
        leaveMessageId: 21
      },
      method: 'DELETE',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        util.showSuccess('操作成功');
      },
      fail: function (res) {
        util.showModel('操作失败');
      },
    })
  },

  //19.成员删群
  deleteGroup: function() {
    console.log("发出一个deleteGroup请求");
    wx.request({
      url: config.service.deleteGroupUrl,
      data: {
        userId: 'buaasoft1621',
        groupId: 10
      },
      method: 'DELETE',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        util.showSuccess('操作成功');
      },
      fail: function (res) {
        util.showModel('操作失败');
      },
    })
  },

  //20.删除名片
  deleteCard: function () {
    console.log("发出一个deleteCard请求");
    wx.request({
      url: config.service.deleteCardUrl,
      data: {
        userS_id: 'buaasoft1621',
        userB_id: '0001'
      },
      method: 'DELETE',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        util.showSuccess('操作成功');
      },
      fail: function (res) {
        util.showModel('操作失败');
      },
    })
  },

  //21.删除通知
  deleteNews: function () {
    console.log("发出一个deleteNews请求");
    wx.request({
      url: config.service.newsUrl,
      data: {
        sysInfoId: 12
      },
      method: 'DELETE',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        util.showSuccess('操作成功');
      },
      fail: function (res) {
        util.showModel('操作失败');
      },
    })
  },

  //22.删除群成员
  deleteMember: function () {
    console.log("发出一个deleteMember请求");
    wx.request({
      url: config.service.deleteMemberUrl,
      data: {
        groupId: 10,
        userId: 'buaasoft1621'
      },
      method: 'DELETE',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        util.showSuccess('操作成功');
      },
      fail: function (res) {
        util.showModel('操作失败');
      },
    })
  },
  
  //23.时间格式转换,以获取news为例
  timetrans:function(){
    this.getNews();
    var that =this;
    //异步的原因
    setTimeout(function () {
      var anew = that.data.news;
      anew.forEach(function(value,index,array){
        console.log();
        var t1 = new Date(array[index].time).format("yyyy-MM-dd hh:mm:ss");
        array[index].time = t1;
      })
      that.setData({
        news:anew
      })
      console.log(that.data.news[0].time);
    }, 500);
  },       
})