// pages/addGroupPlease/addGroupPlease.js
var config = require('../../config')
const util = require('../../utils/util');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTopTips: false,
    groupId:0,
    reason:"",
    userId:"",
    textLength:0,
  },

  showTopTips: function () {
    var that = this;
    this.setData({
      showTopTips: true
    });
    setTimeout(function () {
      that.setData({
        showTopTips: false
      });
    }, 3000);
  },

  onClick: function (e) {
      console.log(e);
      var that = this;
      if (e.detail.value.reason != "") {
        that.setData({
            reason:e.detail.value.reason,
        })
        console.log(that.data.groupId);
        console.log(that.data.reason);

        console.log("发出一个addGroupRequest请求");
        wx.request({
            url: config.service.addGroupRequestUrl,
            data: {
                groupId: that.data.groupId,
                userId: that.data.reason,//'buaasoft1621',
                reason: that.data.reason
            },
            method: 'POST',
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function (res) {
                console.log(res.data);
                util.showSuccess('操作成功');
                setTimeout(function () {
                    wx.navigateBack({
                        delta: 1,
                    })
                }, 2000)
            },
            fail: function (res) {
                util.showModel('操作失败');
            },
        })
      }
      else this.openAlert();//"错误提示"
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

  inputTyping:function(e){
      console.log(e);
    this.setData({
        textLength:e.detail.value.length,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
        groupId:options,
    })
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
          userId: getApp().globalData.openId,
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

  bindAgreeChange: function (e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
  }


})