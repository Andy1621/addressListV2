// pages/searchDetail/searchDetail.js
var config = require('../../config')
const util = require('../../utils/util');

Page({
  data: {
    inputShowed: false,
    inputVal: ""
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      //设置图片地址
      list: "/images/tab/list.png"
    });
  },
  searchPublic: function () {

    var that = this;
    console.log("发出一个searchPublic请求");
    wx.request({
      url: config.service.searchPublicUrl,
      data: {
        str: that.data.inputVal
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          groupArr: res.data,
        });
        util.showSuccess('操作成功');
      },
      fail: function (res) {
        util.showModel('操作失败');
      },
    })
  },
});