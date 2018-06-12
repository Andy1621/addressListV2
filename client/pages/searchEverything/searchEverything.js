// pages/searchEverything/searchEverything.js
var app = getApp()
var config = require('../../config')
const util = require('../../utils/util');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",
    isbindconfirm:0,
    listtxlresult:[],
    listpeople:[]
  },

  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false,
      listtxlresult:[],
      listpeople:[],
      isbindconfirm:0
    });
  },

  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },

  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },

  //需添加searchEverything事件

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      //设置图片地址
      list: "/images/tab/list.png",
      people: "/images/tab/me.png"
    });
  },

  //查找通讯录和名片
  searchEverything: function () {
    var that = this;
    that.data.isbindconfirm= 1;
    that.data.listtxlresult = []; 
    that.data.listpeople = []; 
    var card = JSON.parse(getApp().globalData.cardList);//名片夹
    var special = JSON.parse(getApp().globalData.specialList);//特别关心
    var black = JSON.parse(getApp().globalData.blackList);//黑名单
    var addGroup = JSON.parse(getApp().globalData.addGroupList);//我加入的群
    var createGroup = JSON.parse(getApp().globalData.createGroupList);//我建的群
    console.log(createGroup);
    console.log(card);
    //查找通讯录
    for (var i = 0; i < createGroup.length; i++) {
      if (createGroup[i]['groupName'].toLowerCase().indexOf(this.data.inputVal.toLowerCase()) != -1) {
        that.data.listtxlresult.push(createGroup[i]);
      }
    }
    for (var i = 0; i < addGroup.length; i++) {
      if (addGroup[i]['groupName'].toLowerCase().indexOf(this.data.inputVal.toLowerCase()) != -1) {
        that.data.listtxlresult.push(addGroup[i]);
      }
    }
    console.log(that.data.listtxlresult);

    //查找人
    for (var i = 0; i < card.length; i++) {
      if (card[i]['userName'].toLowerCase().indexOf(this.data.inputVal.toLowerCase()) != -1) {
        that.data.listpeople.push(card[i]);
      }
    }
    for (var i = 0; i < special.length; i++) {
      if (special[i]['userName'].toLowerCase().indexOf(this.data.inputVal.toLowerCase()) != -1) {
        that.data.listpeople.push(special[i]);
      }
    }
    for (var i = 0; i < black.length; i++) {
      if (black[i]['userName'].toLowerCase().indexOf(this.data.inputVal.toLowerCase()) != -1) {
        that.data.listpeople.push(black[i]);
      }
    }

    that.setData({
      listtxlresult: that.data.listtxlresult,
      isbindconfirm: that.data.isbindconfirm,
      listpeople: that.data.listpeople
      //listpeople: that.data.listpeopleresult
    })
  },

   jumpToAddresslist: function (e) {
    console.log(e);
    var num = e.currentTarget.id;
    var passInfo = this.data.listtxlresult[num];
    var groupId = passInfo.groupId;
    console.log(groupId);
    /*var groupId = this.data.groupArr[num].groupId;
    var groupName = this.data.groupArr[num].groupName;
    var groupIntro = this.data.groupArr[num].groupInfo;
    var groupMaster = this.data.groupArr[num].groupMaster;*/
    let str = JSON.stringify(passInfo);
    wx.navigateTo({
      //url: '/pages/detailPage/detailPage?jsonStr=' + str,
      url: '/pages/detailPage/detailPage?groupId=' + groupId,
    })
  },

  //跳转到其它用户资料
   jumpToInfo: function (e) {
     //先判断该用户与这位名片用户的关系，来设置category
     var otherId = this.data.listpeople[e.currentTarget.id].userId;
     wx.navigateTo({
       url: '/pages/othersInfo/othersInfo?userId=' + otherId,
       success: function (res) { },
       fail: function (res) { },
       complete: function (res) { },
     })

   },

})