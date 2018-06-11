// pages/creatAddressList/creatAddressList.js
var config = require('../../config')
const util = require('../../utils/util');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTopTips: false,
    groupName: '',
    groupType: '',
    groupIntro: '',
    userId: '',
    textLength:0,
    radioItems: [
      { name: 'private', value: '私人' },
      { name: 'public', value: '共享' },
    ]
  },

  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var radioItems = this.data.radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }
    this.setData({
      radioItems: radioItems
    });
    if(this.data.radioItems[0].checked==1)
    {
        this.setData({
            groupType:"private",
        })
    }
    else
    {
        this.setData({
            groupType: "public",
        })
    }
    console.log(this.data.groupType);
  },

  onClick: function (e) {
    console.log(e);
    var that=this;
    if(e.detail.value.groupName!="")
    {
        if(e.detail.value.groupIntro!="")
        {
            if(that.data.groupType.length>0)
            {
                that.setData({
                    groupName: e.detail.value.groupName,
                    groupIntro: e.detail.value.groupIntro,
                })
                console.log(that.data.userId);
                console.log(that.data.groupName);
                console.log(that.data.groupType);
                console.log(that.data.groupIntro);

                console.log("发出一个createGroupRequest请求");
                wx.request({
                    url: config.service.createGroupRequestUrl,
                    data: {
                        groupName: that.data.groupName,
                        groupType: that.data.groupType,
                        groupIntro: that.data.groupIntro,
                        userId: that.data.userId//'buaasoft1621'
                    },
                    method: 'POST',
                    header: {
                        'content-type': 'application/json' // 默认值
                    },
                    success: function (res) {
                        console.log(res.data);
                        util.showSuccess('操作成功');
                        setTimeout(function(){
                            wx.navigateBack({
                                delta: 1,
                            })
                        },2000)
                    },
                    fail: function (res) {
                        util.showModel('操作失败');
                    },
                })
            }
            else this.openAlert();//"错误提示：类型"
        }
        else this.openAlert();//"错误提示：简介"
    }
    else this.openAlert();//"错误提示：名字"
  },

  openAlert: function () {
      wx.showModal({
          content: '信息未填写完毕',
          showCancel: false,
          success: function (res) {
              if (res.confirm) {
                  console.log('用户点击确定')
              }
          }
      });
  },

  inputTyping: function (e) {
      console.log(e);
      this.setData({
          textLength: e.detail.value.length,
      })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
      console.log(getApp().globalData.openId);
        this.setData({
            userId:getApp().globalData.openId,
        })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },


})