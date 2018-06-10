//peoplePage.js
//var util = require('../../utils/util.js'); 
var config = require('../../config')
const util = require('../../utils/util');

Page({
  data: {
    groupInfo: [],
    is_logged: true,
    is_member: true,//false为未加群，true为已加群
    index: 0,
    nameindex: 0,
    replyindex: 0,
    addressListName: "通讯录名",
    memberInfo: "人数",
    originator: "群主",
    detail: "群信息",
    listpeople: [
      {
        userName: "Name1",
        city: "Man",
        phone_num: "phone_num1",
      },
    ],
    listpeopletemp:[],
    listpeopleresult:[],
    listmsgtemp:[],

    listmsg: [
      /*{
          userId:"Name1",
          time:"2018/6/8 14:00",
          content:"MessaggeTest1",
          leaveMessage: [
              {
                  userId: "Reply1-1",
                  content: "replytest1",
              },
              {
                  userId: "Reply1-2",
                  content: "replytest2",
              },
              {
                  userId: "Reply1-3",
                  content: "replytest3",
              },
          ],
      },*/
    ],
    groupMessageId: [],
    groupMessageNum: 0,
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    //SearchBar
    inputShowed: false,
    inputVal: "",
    //navbar
    tabs: ["通讯录", "消息"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    peopleShow: 1,
    releaseFocus: false,
    //messaege
    messageVal: "",
    msgName: "Tom",
    timetmp: "",
    //msgCount: 0,
  },

  //Search Bar
  showInput: function () {
    this.setData({
      inputShowed: true,
      //peopleShow: 0
    });
  },
  hideInputtxl: function () {
    this.setData({
      inputVal: "",
      inputShowed: false,
      peopleShow: 1,
      listpeople:this.data.listpeopletemp
    });
  },

  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false,
      peopleShow: 1,
      listmsg: this.data.listmsgtemp,
    });
  },

  clearInput: function () {
    this.setData({
      inputVal: "",
      peopleShow: true,
    });
  },

  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value,
    });
    if (this.data.inputVal == "") {
      this.setData({ peopleShow: 1 });
    }
    else {
      this.setData({ peopleShow: 0 });
    }
  },
  //navbar
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id,
      releaseFocus: false,
    });
  },

  clickView: function (e) {
    if (this.data.releaseFocus == true) {
      this.setData({
        releaseFocus: false,
        messageVal: ""
      });
    }
  },

  //Reply
  bindReply: function (e) {
    console.log(e)
    this.setData({
      index: e.target.id,
      releaseFocus: true,
      messageVal: "",
    });
  },

  inputReplying: function (e) {
    this.setData({
      messageVal: e.detail.value,
    });
  },
  /*发送留言 */
  bindSend: function (e) {
    var param = {};
    var obj = {};
    obj.userId = "Test1";
    obj.time = util.formatTime(new Date);
    obj.content = this.data.messageVal;
    this.data.listmsg[this.data.index].leaveMessage.push(obj);
    var all = this.data.listmsg[this.data.index].leaveMessage;
    var str = "listmsg[" + this.data.index + "].leaveMessage";
    param[str] = all;
    this.setData(param),
      this.setData({
        releaseFocus: false,
        messageVal: "",
        msgCount: this.data.listmsg[0].leaveMessage.length,
      })
  },

  bindCancel: function (e) {
    this.setData({
      releaseFocus: false,
      messageVal: ""
    })
  },

  deleteMessage: function (e) {
    this.setData({
      index: e.target.id,
    });
    var that = this;
    wx.showActionSheet({
      itemList: ["删除消息"],
      success: function (res) {
        if (res.tapIndex == 0) {
          console.log(that.data.index);
          var obj = that.data.listmsg;
          obj.splice(that.data.index, 1);
          that.setData({
            listmsg: obj,
          });
        }
      },
    });
  },

  deleteReply: function (e) {
    var getnum = e.currentTarget.id;
    var num = getnum.split("+");
    this.setData({
      index: num[0],
      replyindex: num[1],
    });
    var that = this;
    wx.showActionSheet({
      itemList: ["删除留言"],
      success: function (res) {
        if (res.tapIndex == 0) {
          console.log(that.data.index);
          var param = {};
          var str = "listmsg[" + that.data.index + "].leaveMessage";
          var obj = that.data.listmsg[that.data.index].leaveMessage;
          obj.splice(that.data.replyindex, 1);
          param[str] = obj;
          that.setData(param);
        }
      },
    });
  },

  deleteMember: function (e) {
    this.setData({
      nameindex: e.currentTarget.id,
    });
    var that = this;
    wx.showActionSheet({
      itemList: ["删除成员"],
      success: function (res) {
        if (res.tapIndex == 0) {
          var obj = that.data.listpeople;
          obj.splice(that.data.nameindex, 1);
          that.setData({
            listpeople: obj,
          });
        }
      },
    });
  },

  jumpToInfo: function (e) {
    //先判断该用户与这位名片用户的关系，来设置category
    wx.navigateTo({
      url: '/pages/othersInfo/othersInfo?category=1',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  jumpToAdd: function (e) {
    wx.navigateTo({
      url: '/pages/addGroupPlease/addGroupPlease',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  //参数接受
  onLoad: function (options) {
    this.setData({
      is_logged: getApp().globalData.logged,
    })
    console.log(this.data.is_logged);
    let object = JSON.parse(options.jsonStr);
    console.log(object);
    this.setData({
      groupInfo: object,
    });
    var that = this;
     that.setData({
      groupId: object.groupId
    });
    //获取群主姓名
    wx.request({
      url: config.service.userInfoUrl,
      data: {
        userId: object.groupMaster
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          addressListName: object.groupName,
          originator: "群主：" + res.data.info.userName,
          detail: object.groupIntro,
        });
        //util.showSuccess('操作成功');
      },
      fail: function (res) {
        util.showModel('操作失败');
      },
    });
    //获取群信息
    wx.request({
      url: config.service.groupInfoUrl,
      data: {
        groupId: object.groupId,
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          memberInfo: "人数：" + res.data.memberNum,
          listpeople: res.data.member,
          groupMessageId: res.data.groupMessage,
          groupMessageNum: res.data.groupMessageNum,
        });
        //获取消息界面信息
        for (var i = 0; i < that.data.groupMessageNum; i++) {
          that.getGroupMessage(that.data.groupMessageId[i]);
        };
        //util.showSuccess('操作成功');
      },
      fail: function (res) {
        util.showModel('操作失败');
      },
    });
    console.log(this.data.listpeople.length);
    console.log(this.data.listmsg.length);
  },

  onShareAppMessage: function () {
    var passInfo = this.data.groupInfo;
    let str = JSON.stringify(passInfo);
    return {

      title: "分享群" + this.data.addressListName,

      desc: '邀请加入群通讯录',

      path: '/pages/detailPage/detailPage?jsonStr=' + str,

    }

  },

 

  onShow: function () {
    this.setData({
      is_logged: getApp().globalData.logged,
    })
  },

  getUserInfo: function (e) {
    console.log("发出一个getUserInfo请求");
    wx.request({
      url: config.service.userInfoUrl,
      data: {
        userId: e
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        //console.log(res.data);
        return res.data;
        util.showSuccess('操作成功');
      },
      fail: function (res) {
        util.showModel('操作失败');
      },
    })
  },

  getGroupMessage: function (e) {
    console.log(e);
    var that = this;
    console.log("发出一个groupMessageId请求");
    wx.request({
      url: config.service.groupMessageUrl,
      data: {
        groupMessageId: e
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        var obj = res.data;
        console.log(obj.time);
        obj.time = util.formatTime(new Date(obj.time));
        that.data.listmsg.push(obj);
        that.setData({
          listmsg: that.data.listmsg,
        })
        //util.showSuccess('操作成功');
      },
      fail: function (res) {
        util.showModel('操作失败');
      },
    })
    console.log(that.data.listmsg);
  },

  //搜索群消息
  searchGroupMessage: function () {
    var that = this;
    console.log("发出一个searchGroupMessage请求");
    console.log(this.data.groupInfo.groupId);
    console.log(this.data.inputVal);

    wx.request({
      url: config.service.searchGroupMessageUrl,
      data:{
        groupId:this.data.groupInfo.groupId, //从哪个群点进
        //groupId:1,
        str: this.data.inputVal
       // str:'2号'
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          listmsgtemp:that.data.listmsg,
          listmsg: res.data,
        })
        util.showSuccess('操作成功');
      },
      fail: function (res) {
        util.showModel('操作失败');
      },
    })
  },

  //搜索通讯录
  searchGroup: function () {

    var that = this;
    that.data.listpeopleresult=[];
    for(var i=0;i<that.data.listpeople.length;i++)
    {
      if (that.data.listpeople[i]['userName'].indexOf(this.data.inputVal)!=-1)
      {
        that.data.listpeopleresult.push(that.data.listpeople[i]);
      }
    }
    console.log(that.data.listpeopleresult);

    that.setData({
      // listmsgtemp: that.data.listmsg,
      // listmsg: res.data,
      listpeopletemp: that.data.listpeople,
      listpeople: that.data.listpeopleresult
    })
    
    // that.data.listpeopletemp = that.data.listpeople;
    //  that.data.listpeople=that.data.listpeopleresult;
     console.log(that.data.listpeople);

  },

  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    //模拟加载
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
  },

  //sendMessage
  sendMessage: function () {
    console.log(this.data.listmsg);
    wx.navigateTo({
      url: '/pages/sendMessage/sendMessage'
    })
  },
})