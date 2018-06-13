// pages/setting/setting.js
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
  userInfo: {},

  /**
   * 页面的初始数据
   */
  data: {
    self_detail_title: [
      "所在大学", "专业", "所在城市"
    ],
    cont_detail_title: [
      "手机号", "qq号", "微信号", "电子邮箱"
    ]
  },

  onClick: function () {
    var that = this;
    //修改信息请求
    wx.request({
      url: config.service.userInfoUrl,
      data: {
        userId: that.userInfo.openId,
        intro: that.data.intro,
        userName: that.data.name,
        email: that.data.cont_detail_ctt[3],
        phoneNum: that.data.cont_detail_ctt[0],
        department: that.data.self_detail_ctt[0],
        major: that.data.self_detail_ctt[1],
        city: that.data.self_detail_ctt[2],
        wxNum: that.data.cont_detail_ctt[2],
        qqNum: that.data.cont_detail_ctt[1]
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
    //将该页面数据处理完毕后赋给全局变量
    var str1 = "", str2 = "";
    var len1 = that.data.self_detail_ctt.length;
    var len2 = that.data.cont_detail_ctt.length;
    for (var i = 0; i < len1 - 1; i++)
      str1 += that.data.self_detail_ctt[i] + "#%#";
    str1 += that.data.self_detail_ctt[len1 - 1];
    for (var i = 0; i < len2 - 1; i++)
      str2 += that.data.cont_detail_ctt[i] + "#%#";
    str2 += that.data.cont_detail_ctt[len2 - 1];
    if (that.data.name == "")
      that.data.name = that.userInfo.nickName
    getApp().globalData.name = that.data.name;
    getApp().globalData.intro = that.data.intro;
    getApp().globalData.self_ctt = str1;
    getApp().globalData.cont_ctt = str2;

    wx.switchTab({
      url: '/pages/myInfo/myInfo',
    })
  },
  //获取input（用户输入）数据
  formSubmit: function (e) {
    var that = this;
    that.data.intro = e.detail.value["intro"];
    that.data.name = e.detail.value["name"];
    var len1 = that.data.self_detail_ctt.length;
    var len2 = that.data.cont_detail_ctt.length;
    for (var i = 0; i < len1; i++)
      that.data.self_detail_ctt[i] = e.detail.value["info" + i];
    for (var i = 0; i < len2; i++)
      that.data.cont_detail_ctt[i] = e.detail.value["cont" + i];
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 获取系统信息
    wx.getSystemInfo({
      success: function (res) {
        // 计算主体部分高度,单位为px
        that.setData({
          // rest部分高度 = 利用窗口可使用高度 - first部分高度（这里的高度单位为px，所有利用比例将140rpx转换为px）
          rest_height: res.windowHeight - res.windowWidth / 750 * 140
        })
      }
    });
    //获取个人信息
    var str1 = getApp().globalData.self_ctt.split("#%#");
    var str2 = getApp().globalData.cont_ctt.split("#%#");
    that.setData({
      name: getApp().globalData.name,
      intro: getApp().globalData.intro,
      self_detail_ctt: str1,
      cont_detail_ctt: str2
    })
    that.userInfo = JSON.parse(options.userInfo)
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

  }
})