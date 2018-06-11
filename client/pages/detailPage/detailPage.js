//peoplePage.js
//var util = require('../../utils/util.js'); 
var config = require('../../config')
const util = require('../../utils/util');

Page({
  data: {
    groupInfo: [],
    isbindconfirmMessage: 0,//是否按下消息搜索框的回车
    isbindconfirmGroup: 0,//是否按下通讯录搜索框的回车
    myuserId: 0,
    myname:"",
    is_logged: true,
    is_member: false,//false为未加群，true为已加群
    is_master:false,
    index: 0,
    nameindex: 0,
    replyindex: 0,
    addressListName: "通讯录名",
    groupMaster: "",
    detail: "群信息",
    listpeople: [
      {
        userName: "Name1",
        city: "Man",
        phone_num: "phone_num1",
      },
    ],
    listpeopletemp: [],//（搜索用）
    listpeopleresult: [],
    listmsgtemp: [],//（搜索用）
    listmsg: [],
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
    tabs: [],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    peopleShow: 1,
    releaseFocus: false,
    //messaege
    messageVal: "",
    msgName: "Tom",
    timetmp: "",
    groupId: "",
    imgList: [], //所有图片地址
    currentNum: 0,  //当前显示图片数
    plusNum: 5, //每次增加图片数
    isSearch: false, //如果是搜索框显示的不能执行触底刷新
    imgListTemp: [],//图片副本（搜索用）
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
    });
    if (this.data.isbindconfirmGroup == 1) { //按下回车后
      this.setData({
        listpeople: this.data.listpeopletemp,
        isbindconfirmGroup: 0
      });
    }
  },

  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false,
      peopleShow: 1,
      isSearch: false
    });
    if (this.data.isbindconfirmMessage == 1) {//按下回车键后
      this.setData({
        listmsg: this.data.listmsgtemp,
        imgList: this.data.imgListTemp,
        isbindconfirmMessage: 0
      });
    }
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
    console.log(this.data.listmsg[e.currentTarget.id])
    this.setData({
      msgName:this.data.listmsg[e.currentTarget.id].name,
      index: e.currentTarget.id,
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
    obj.name = this.data.myname;
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
      //增加留言
      var that=this;
    console.log("发出一个sendLeaveMessage请求");
    console.log(this.data.listmsg[this.data.index]);
    wx.request({
        url: config.service.leaveMessageUrl,
        data: {
            groupId: that.data.groupId,
            groupMessageId: that.data.listmsg[this.data.index].groupMessageId,
            userId: that.data.myuserId,
            content: obj.content
        },
        method: 'POST',
        header: {
            'content-type': 'application/json' // 默认值
        },
        success: function (res) {
            console.log(res.data);
            //util.showSuccess('操作成功');
        },
        fail: function (res) {
            util.showModel('操作失败');
        },
    })
  },

  bindCancel: function (e) {
    this.setData({
      releaseFocus: false,
      messageVal: ""
    })
  },

  deleteMessage: function (e) {
      console.log(e);
    this.setData({
      index: e.currentTarget.id,
    });
    var that = this;
    console.log(this.data.listmsg[e.currentTarget.id]);
    if (this.data.listmsg[e.currentTarget.id].userId==this.data.myuserId||this.data.is_master==true)
    {
        wx.showActionSheet({
            itemList: ["删除消息"],
            success: function (res) {
                if (res.tapIndex == 0) {
                    //console.log(that.data.index);
                    var obj = that.data.listmsg;
                    obj.splice(that.data.index, 1);
                    that.setData({
                        listmsg: obj,
                    });
                    //删除消息
                    console.log("发出一个deleteGroupMessage请求");
                    wx.request({
                        url: config.service.groupMessageUrl,
                        data: {
                            groupMessageId: that.data.listmsg[e.currentTarget.id].groupMessageId,
                        },
                        method: 'DELETE',
                        header: {
                            'content-type': 'application/json' // 默认值
                        },
                        success: function (res) {
                            console.log(res.data);
                            //util.showSuccess('操作成功');
                        },
                        fail: function (res) {
                            util.showModel('操作失败');
                        },
                    })
                }
            },
        });
    }
    else console.log("Not Master or Messager");
  },

  deleteReply: function (e) {
    var getnum = e.currentTarget.id;
    var num = getnum.split("+");
    this.setData({
      index: num[0],
      replyindex: num[1],
    });
    var that = this;
    console.log(this.data.listmsg[this.data.index].leaveMessage[this.data.replyindex]);
    if (this.data.listmsg[this.data.index].leaveMessage[this.data.replyindex].userId == this.data.myuserId || this.data.groupMaster == this.data.myuserId) 
    {
        wx.showActionSheet({
        itemList: ["删除留言"],
        success: function (res) {
            if (res.tapIndex == 0) {
            //console.log(that.data.index);
            var param = {};
            var str = "listmsg[" + that.data.index + "].leaveMessage";
            var obj = that.data.listmsg[that.data.index].leaveMessage;
            obj.splice(that.data.replyindex, 1);
            param[str] = obj;
            that.setData(param);
            //删除留言
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
            }
        },
        });
    }
    else console.log("No Master or Message Replyer")
  },

  deleteMember: function (e) {
    this.setData({
      nameindex: e.currentTarget.id,
    });
    var that = this;
    console.log(that.data.listpeople[that.data.nameindex]);
    if(this.data.is_master==true)
    {
        if (that.data.groupMaster == that.data.listpeople[that.data.nameindex].userId)
        {
            util.showModel('操作失败', '您不能删除自己');
        }
        else
        {
            wx.showActionSheet({
                itemList: ["删除成员"],
                success: function (res) {
                    if (res.tapIndex == 0) {
                        var obj = that.data.listpeople;
                        obj.splice(that.data.nameindex, 1);
                        that.setData({
                            listpeople: obj,
                        });
                        //删除群员
                        console.log("发出一个deleteMember请求");
                        wx.request({
                            url: config.service.deleteMemberUrl,
                            data: {
                                groupId: that.data.groupId,
                                userId: that.data.listpeople[that.data.nameindex].userId
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
                    }
                },
            });
        }
    }
    else console.log("Not GroupMaster");
  },

  jumpToInfo: function (e) {
    //先判断该用户与这位名片用户的关系，来设置category
      console.log(this.data.listpeople[e.currentTarget.id]);
    var otherId=this.data.listpeople[e.currentTarget.id].userId;
    wx.navigateTo({
      url: '/pages/othersInfo/othersInfo?userId='+otherId,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  jumpToAdd: function (e) {
    wx.navigateTo({
      url: '/pages/addGroupPlease/addGroupPlease?groupId=' + groupId,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  //参数接受
  onLoad: function (options) {
    this.setData({
      is_logged: getApp().globalData.logged,
      myuserId: getApp().globalData.openId,
      groupId: options.groupId,
      myname:getApp().globalData.name,
    })
    var that=this;
    var AddedgroupInfo = JSON.parse(getApp().globalData.addGroupList);
    //console.log(AddedgroupInfo);
    //是否群员
    for(var i=0,length=AddedgroupInfo.length;i<length;i++)
    {
        //console.log(that.data.groupId + " " + AddedgroupInfo[i].groupId)
        if(that.data.groupId==AddedgroupInfo[i].groupId)
        {
            that.setData({
                is_member:true,
            })
        }
    }
  },

  onShow: function () {
    console.log('onShow');
    var that = this;
    that.setData({
      currentNum: 0,
      listmsg: [],
      imgList: []
    });
    //获取群信息
    wx.request({
      url: config.service.groupInfoUrl,
      data: {
        groupId: that.data.groupId,
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var temp = [];
        temp[0] = '通讯录' + '(' + res.data.memberNum + ')';
        temp[1] = '消息';
        that.setData({
          addressListName: res.data.groupName,
          detail: res.data.groupIntro,
          tabs: temp,
          groupMaster: res.data.groupMaster,
          //memberInfo: "人数：" + res.data.memberNum,
          listpeople: res.data.member,
          groupMessageId: res.data.groupMessage,
          groupMessageNum: res.data.groupMessageNum,
        });
        //是否群主
        if(that.data.groupMaster==that.data.myuserId)
        {
            this.setData({
                is_member:true,
                is_master:true,
            })
        }
        //获取群消息
        var cur = that.data.currentNum;
        for (var i = cur; i < cur + that.data.plusNum && i < that.data.groupMessageNum; i++) {
          that.getGroupMessage(that.data.groupMessageId[i]);
          that.setData({
            currentNum: that.data.currentNum + 1
          })
        }
        //util.showSuccess('操作成功');
      },
      fail: function (res) {
       util.showModel('操作失败', '未知错误');
      },
    });
  },

  //触底刷新
  onReachBottom: function () {
    var that = this;
    if (that.data.activeIndex == 1){
      if (that.data.currentNum == that.data.groupMessageNum) {
        util.showModel('操作失败', '消息已全部加载');
      }
      else if (that.data.isSearch == false){
        //获取群消息
        var cur = that.data.currentNum;
        for (var i = cur; i < cur + that.data.plusNum && i < that.data.groupMessageNum; i++) {
          that.getGroupMessage(that.data.groupMessageId[i]);
          that.setData({
            currentNum: that.data.currentNum + 1
          })
        }
      }
    }
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

  getGroupMessage: function (e) {
    //console.log(e);
    var that = this;
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
        //console.log(res.data);
        var obj = res.data;
        //console.log(obj.time);
        obj.time = util.formatTime(new Date(obj.time));
        //将图片字符串转换为数组
        var str = obj.imagePath;
        if (str == null) {
          obj.imgList = [];
        }
        else {
          obj.imgList = str.split(',');
        }
        obj.groupMessageId=e;
        that.data.listmsg.push(obj);
        that.setData({
          listmsg: that.data.listmsg,
          imgList: that.data.imgList.concat(obj.imgList)
        })
        //util.showSuccess('操作成功');
      },
      fail: function (res) {
       util.showModel('操作失败', '未知错误');
      },
    })
    //console.log(that.data.listmsg);
  },

  //搜索群消息
  searchGroupMessage: function () {
    var that = this;
    that.data.isSearch = true;
    that.data.isbindconfirmMessage = 1;
    wx.request({
      url: config.service.searchGroupMessageUrl,
      data: {
        groupId: this.data.groupId, //从哪个群点进
        //groupId:1,
        str: this.data.inputVal
        // str:'2号'
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          imgListTemp: that.data.imgList,
          imgList: []
        })

        var temp = res.data;
        for(var i in temp){
          temp[i].time = util.formatTime(new Date(temp[i].time));
          var str = temp[i].imagePath;
          if (str == null) {
            temp[i].imgList = [];
          }
          else {
            temp[i].imgList = str.split(',');
          }
          that.setData({
            imgList: that.data.imgList.concat(temp[i].imgList)
          })
        }
      
        that.setData({
          listmsgtemp: that.data.listmsg,
          listmsg: temp,
        })
        util.showSuccess('操作成功');
      },
      fail: function (res) {
       util.showModel('操作失败', '未知错误');
      },
    })
  },

  //搜索通讯录
  searchGroup: function () {
    var that = this;
    that.data.isbindconfirmGroup = 1;
    that.data.listpeopleresult = [];
    for (var i = 0; i < that.data.listpeople.length; i++) {
        if (that.data.listpeople[i]['userName'].toLowerCase().indexOf(this.data.inputVal.toLowerCase()) != -1) {
        that.data.listpeopleresult.push(that.data.listpeople[i]);
      }
    }
    //console.log(that.data.listpeopleresult);

    that.setData({
      listpeopletemp: that.data.listpeople,
      listpeople: that.data.listpeopleresult
    })

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
    //console.log(this.data.listmsg);
    var groupId = this.data.groupId;
    wx.navigateTo({
      url: '/pages/sendMessage/sendMessage?groupId=' + groupId,
    })
  },

  //预览图片
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.imgList // 需要预览的图片http链接列表
    })
  }
})