var config = require('../../config')
const util = require('../../utils/util');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    application_type: 2,//1 for person,2 for group
    apply_reason: "This is apply reason.这是申请原因。",
    addresslist_type: "公有群",
    addresslist_name: "This is addresslist name.这是通讯录名称",
    addresslist_info: "This is addresslist information.这是通讯录信息",
    userInfo: '',
    sysId: '',
    groupId: '',
    groupType: '',
  },

  agreeToast: function () {
    var that = this;
    if (this.data.application_type == 1) {
      wx.request({
        url: config.service.dealAddGroupRequestUrl,
        data: {
          op: 'yes',
          groupId: that.data.groupId,
          userId: that.data.userInfo.userId,
          sysInfoId: that.data.sysId
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
    } else {
      wx.request({
        url: config.service.dealCreateGroupRequestUrl,
        data: {
          op: 'yes',
          groupType: that.data.groupType,
          groupId: that.data.groupId,
          userId: that.data.userInfo.userId,
          sysInfoId: that.data.sysId
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
    }
    wx.showToast({
      title: '已同意申请',
      icon: 'success',
      duration: 2000
    });
    setTimeout(function () {
      wx.navigateBack({
        delta: 1,
      });
    }, 2000);
  },

  refuseToast: function () {
    var that = this;
    if (this.data.application_type == 1) {
      wx.request({
        url: config.service.dealAddGroupRequestUrl,
        data: {
          op: 'no',
          groupId: that.data.groupId,
          userId: that.data.userInfo.userId,
          sysInfoId: that.data.sysId
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
    } else {
      wx.request({
        url: config.service.dealCreateGroupRequestUrl,
        data: {
          op: 'no',
          groupType: that.data.groupType,
          groupId: that.data.groupId,
          userId: that.data.userInfo.userId,
          sysInfoId: that.data.sysId
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
    }
    wx.showToast({
      title: '已拒绝申请',
      icon: 'success',
      duration: 2000
    });
    setTimeout(function () {
      wx.navigateBack({
        delta: 1,
      });
    }, 2000);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);//navigateTo参数
    options.content = JSON.parse(options.content);
    options.sysInfoId = JSON.parse(options.sysInfoId);
    this.setData({
      application_type: options.application_type,
      sysId: options.sysInfoId,
      groupId: options.content[options.content.length - 2]
    });
    if (options.application_type == 1) {
      this.setData({
        apply_reason: options.content[1],
      })
    } else {
      this.setData({
        groupType: options.content[2]
      })
      if (options.content[3] == 'public') {
        options.content[3] = '共享'
      } else {
        options.content[3] = '私人'
      }
      this.setData({
        addresslist_name: options.content[1],
        addresslist_info: options.content[2],
        addresslist_type: options.content[3]
      })
    }
    //获取用户信息
    var that = this;
    wx.request({
      url: config.service.userInfoUrl,
      data: {
        userId: options.content[options.content.length - 1]
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          userInfo: res.data.info
        })
        util.showSuccess('操作成功');
      },
      fail: function (res) {
        util.showModel('操作失败');
      },
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