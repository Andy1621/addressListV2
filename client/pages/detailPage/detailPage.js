//peoplePage.js
var util = require('../../utils/util.js'); 

Page({
    data: {
        is_member:true,//false为未加群，true为已加群
        index:0,
        nameindex:0,
        replyindex:0,
        addressListName:"通讯录名",
        memberInfo:"人数",
        originator:"群主",
        detail:"群信息",
        listpeople:[
            {
                name:"Name1",
                sex:"Man",
                company:"Company1",
            },
            {
                name: "Name2",
                sex: "Man",
                company: "Company2",
            },
            {
                name: "Name3",
                sex: "Woman",
                company: "Company3",
            },
            {
                name: "Name4",
                sex: "Woman",
                company: "Company4",
            },
        ],
        listmsg:[
            {
                name:"Name1",
                time:"2018/6/8 14:00",
                msg:"MessaggeTest1",
                listreply: [
                    {
                        name: "Reply1-1",
                        time: "2018/6/8 19:26",
                        reply: "replytest1",
                    },
                    {
                        name: "Reply1-2",
                        time: "2018/6/8 19:26",
                        reply: "replytest2",
                    },
                    {
                        name: "Reply1-3",
                        time: "2018/6/8 19:26",
                        reply: "replytest3",
                    },
                ],
            },
            {
                name: "Name2",
                time: "2018/6/8 14:00",
                msg: "MessaggeTest2",
                listreply: [
                    {
                        name: "Reply2-1",
                        time: "2018/6/8 19:26",
                        reply: "replytest1",
                    },
                    {
                        name: "Reply2-2",
                        time: "2018/6/8 19:26",
                        reply: "replytest2",
                    },
                    {
                        name: "Reply2-3",
                        time: "2018/6/8 19:26",
                        reply: "replytest3",
                    },
                ],
            },
            {
                name: "Name3",
                time: "2018/6/8 14:00",
                msg: "MessaggeTest3",
                listreply: [
                    {
                        name: "Reply3-1",
                        time: "2018/6/8 19:26",
                        reply: "replytest1",
                    },
                    {
                        name: "Reply3-2",
                        time: "2018/6/8 19:26",
                        reply: "replytest2",
                    },
                    {
                        name: "Reply3-3",
                        time: "2018/6/8 19:26",
                        reply: "replytest3",
                    },
                ],
            },
            {
                name: "Name4",
                time: "2018/6/8 14:00",
                msg: "MessaggeTest4",
                listreply: [
                    {
                        name: "Reply4-1",
                        time: "2018/6/8 19:26",
                        reply: "replytest1",
                    },
                    {
                        name: "Reply4-2",
                        time: "2018/6/8 19:26",
                        reply: "replytest2",
                    },
                    {
                        name: "Reply4-3",
                        time: "2018/6/8 19:26",
                        reply: "replytest3",
                    },
                ],
            },
        ],
        
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
        messageVal:"",
        msgName:"Tom",
        msgCount: 0,
    },

//Search Bar
    showInput: function () {
        this.setData({
            inputShowed: true,
            //peopleShow: 0
        });
    },
    hideInput: function () {
        this.setData({
            inputVal: "",
            inputShowed: false,
            peopleShow: 1
        });
    },

    clearInput: function () {
        this.setData({
            inputVal: "",
            peopleShow:true,
        });
    },

    inputTyping: function (e) {
        this.setData({
            inputVal: e.detail.value,
        });
        if(this.data.inputVal==""){
            this.setData({ peopleShow: 1 });
        }
        else{
            this.setData({ peopleShow: 0 });
        }
    },

//navbar
    tabClick: function (e) {
        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.id,
            releaseFocus:false,
        });
    },

    clickView: function (e) {
        if(this.data.releaseFocus==true){
            this.setData({
                releaseFocus:false,
                messageVal:""
            });
        }
    },

//Reply
    bindReply: function (e) {
        console.log(e)
        this.setData({
            index:e.target.id,
            releaseFocus: true,
            messageVal:"",
        });
    },

    inputReplying:function(e){
        this.setData({
            messageVal: e.detail.value,
        });
    },
    /*发送留言 */
    bindSend: function (e) {
        /*console.log(this.data.index);*/
        var param={};
        var obj = {};
        obj.name="Test1";
        obj.time = util.formatTime(new Date);
        /*console.log(obj.time);*/
        obj.reply=this.data.messageVal;
        /*console.log(this.data.messageVal);
        console.log(obj);*/
        this.data.listmsg[this.data.index].listreply.push(obj);
        var all = this.data.listmsg[this.data.index].listreply;
        /*console.log(all);*/
        var str= "listmsg["+this.data.index+"].listreply";
        /*console.log(str);*/
        param[str]=all;
        this.setData(param),
        this.setData({
            releaseFocus: false,
            messageVal:"",
            msgCount: this.data.listmsg[0].listreply.length,
        })
    },

    bindCancel: function (e) {
        this.setData({
            releaseFocus: false,
            messageVal:""
        })
    },

    deleteMessage:function(e){
        //console.log(e);
        //console.log(this.data.index);
        this.setData({
            index:e.target.id,
        });
        var that=this;
        wx.showActionSheet({
            itemList: ["删除消息"],
            success: function(res) {
                //console.log(res.tapIndex);
                if(res.tapIndex==0){
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

    deleteReply:function(e){
        var getnum=e.currentTarget.id;
        var num=getnum.split("+");
        //console.log(num[0]);
        //console.log(e);
        //console.log(this.data.replyindex);
        this.setData({
            index:num[0],
            replyindex:num[1],
        });
        var that = this;
        wx.showActionSheet({
            itemList: ["删除留言"],
            success: function (res) {
                //console.log(res.tapIndex);
                if (res.tapIndex == 0) {
                    console.log(that.data.index);
                    var param={};
                    var str = "listmsg[" + that.data.index + "].listreply";
                    var obj = that.data.listmsg[that.data.index].listreply;
                    obj.splice(that.data.replyindex, 1);
                    param[str]=obj;
                    that.setData(param);
                }
            },
        });
    },

    deleteMember:function(e){
        //console.log(this.data.nameindex);
        //console.log(e.currentTarget.id);
        this.setData({
            nameindex: e.currentTarget.id,
        });
        var that = this;
        wx.showActionSheet({
            itemList: ["删除成员"],
            success: function (res) {
                //console.log(res.tapIndex);
                if (res.tapIndex == 0) {
                    //console.log(that.data.nameindex);
                    var obj = that.data.listpeople;
                    obj.splice(that.data.nameindex, 1);
                    that.setData({
                        listpeople: obj,
                    });
                }
            },
        });
    },

    jumpToInfo:function(e){
        wx.navigateTo({
            url: '/pages/othersInfo/othersInfo',
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
        })
    },

    jumpToAdd:function(e){
        wx.navigateTo({
            url: '/pages/addGroupPlease/addGroupPlease',
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
        })
    },

    onShow:function(){
        this.setData({
            msgCount:this.data.listmsg[0].listreply.length,
        })
    },

    onPullDownRefresh: function () {
      wx.showNavigationBarLoading() //在标题栏中显示加载
      // wx.request({
      //     url: 'https://URL',
      //     data: {},
      //     method: 'GET',
      //     // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      //     // header: {}, // 设置请求的 header
      //     success: function (res) {
      //         // success
      //     },
      //     fail: function () {
      //         // fail
      //     },
      //     complete: function () {
      //         // complete
      //         wx.hideNavigationBarLoading() //完成停止加载
      //         wx.stopPullDownRefresh() //停止下拉刷新
      //     },
      // })
      //模拟加载
      setTimeout(function () {
        // complete
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      }, 1500);
    },
  //sendMessage
    sendMessage: function() {
      wx.navigateTo({
        url: '/pages/sendMessage/sendMessage',
      })
    },
})