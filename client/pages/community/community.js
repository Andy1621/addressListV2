// pages/community/community.js
var config = require('../../config')
const util = require('../../utils/util');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    groupArr: null,//群信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.randGetGroup();
    this.setData({
      //设置图片地址
      list: "/images/tab/list.png"
    });
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

  search: function (e) {
    wx.navigateTo({
      url: '../searchDetail/searchDetail',
    })
  },

  randGetGroup: function () {
    console.log("发出一个randGetGroup请求");
    var that = this;
    wx.request({
      url: config.service.randGetGroupUrl,
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          groupArr: res.data,
        });
        //util.showSuccess('操作成功');
      },
      fail: function (res) {
        util.showModel('操作失败');
      },
    })
  },

  jumpToAddresslist: function (e) {
    console.log(e);
    var num = e.currentTarget.id;
    var passInfo = this.data.groupArr[num];
    /*var groupId = this.data.groupArr[num].groupId;
    var groupName = this.data.groupArr[num].groupName;
    var groupIntro = this.data.groupArr[num].groupInfo;
    var groupMaster = this.data.groupArr[num].groupMaster;*/
    let str = JSON.stringify(passInfo);
    wx.navigateTo({
      url: '/pages/detailPage/detailPage?jsonStr=' + str,
    })
  },
})
