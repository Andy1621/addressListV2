// pages/myInfo/myInfo.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    rest_height: 0,
    userInfo: {},
    intro: "快要被晒干了……gg",

    self_detail_title: [
      "个人信息1", "个人信息2", "个人信息3", "个人信息4", "个人信息5", "个人信息6"
    ],

    self_detail_ctt: [
      "信息1", "信息2", "信息3", "信息4", "信息5", "信息6"
    ],

    cont_detail_title: [
      "联系方式1", "联系方式2", "联系方式3", "联系方式4", "联系方式5"
    ],

    cont_detail_ctt: [
      "方式1", "方式2", "方式3", "方式4", "方式5"
    ],

    is_logged: false
  },

  onClick: function () {
    var that = this;
    var str1 = "", str2 = "";
    var len1 = that.data.self_detail_ctt.length;
    var len2 = that.data.cont_detail_ctt.length;
    for (var i = 0; i < len1 - 1; i++)
      str1 += that.data.self_detail_ctt[i] + "#%#";
    str1 += that.data.self_detail_ctt[len1 - 1];
    for (var i = 0; i < len2 - 1; i++)
      str2 += that.data.cont_detail_ctt[i] + "#%#";
    str2 += that.data.cont_detail_ctt[len2 - 1];
    getApp().globalData.intro = that.data.intro;
    getApp().globalData.self_ctt = str1;
    getApp().globalData.cont_ctt = str2;
    wx.navigateTo({
      url: '/pages/setting/setting',
    })
  },

  bindGetUserInfo: function (e) {
    if (this.data.logged) return;

    util.showBusy('正在登录');

    var that = this;
    var userInfo = e.detail.userInfo;

    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {

          // 检查登录是否过期
          wx.checkSession({
            success: function () {
              // 登录态未过期
              util.showSuccess('登录成功');
              getApp().globalData.logged = true;
              that.setData({
                userInfo: userInfo,
                is_logged: getApp().globalData.logged
              })
            },

            fail: function () {
              qcloud.clearSession();
              // 登录态已过期，需重新登录
              var options = {
                encryptedData: e.detail.encryptedData,
                iv: e.detail.iv,
                userInfo: userInfo
              }
              that.doLogin(options);
            },
          });
        } else {
          util.showModel('用户未授权', e.detail.errMsg);
        }
      }
    });
  },

  doLogin: function (options) {
    var that = this;

    wx.login({
      success: function (loginResult) {
        var loginParams = {
          code: loginResult.code,
          encryptedData: options.encryptedData,
          iv: options.iv,
        }
        qcloud.requestLogin({
          loginParams, success() {
            util.showSuccess('登录成功');
            getApp().globalData.logged = true;
            that.setData({
              userInfo: options.userInfo,
              is_logged: getApp().globalData.logged
            })
          },
          fail(error) {
            util.showModel('登录失败', error)
            console.log('登录失败', error)
          }
        });
      },
      fail: function (loginError) {
        util.showModel('登录失败', loginError)
        console.log('登录失败', loginError)
      },
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad');
    var that = this;
    // 获取系统信息
    wx.getSystemInfo({
      success: function (res) {
        console.log(res);
        // 可使用窗口宽度、高度
        console.log('height=' + res.windowHeight);
        console.log('width=' + res.windowWidth);
        // 计算主体部分高度,单位为px
        that.setData({
          // rest部分高度 = 利用窗口可使用高度 - first部分高度（这里的高度单位为px，所有利用比例将260rpx转换为px）
          rest_height: res.windowHeight - res.windowWidth / 750 * 260
        })
      }
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
    var that = this;
    var str1 = getApp().globalData.self_ctt;
    var str2 = getApp().globalData.cont_ctt;
    that.setData({
      is_logged: getApp().globalData.logged
    });

    if (str1 != "")
      that.setData({
        intro: getApp().globalData.intro,
        self_detail_ctt: str1.split("#%#"),
        cont_detail_ctt: str2.split("#%#")
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

  }
})