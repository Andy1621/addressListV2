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
    name:"temp",
    intro: "快要被晒干了……gg",
    first_logged: true,

    self_detail_title: [
      "所在大学", "专业", "所在城市"
    ],

    self_detail_ctt: [],

    cont_detail_title: [
      "手机号", "qq号", "微信号", "电子邮箱"
    ],

    cont_detail_ctt: [],

    is_logged: false
  },

  //数据处理完毕后跳到setting
  onClick: function () {
    this.boxingData();
    var temp = JSON.stringify(this.data.userInfo)
    wx.navigateTo({
      url: '/pages/setting/setting?userInfo=' + temp,
    })
  },

  //将当前个人信息的数据内容处理后传到全局变量
  boxingData: function(){
    var str1 = "", str2 = "";
    var len1 = this.data.self_detail_ctt.length;
    var len2 = this.data.cont_detail_ctt.length;
    for (var i = 0; i < len1 - 1; i++)
      str1 += this.data.self_detail_ctt[i] + "#%#";
    str1 += this.data.self_detail_ctt[len1 - 1];
    for (var i = 0; i < len2 - 1; i++)
      str2 += this.data.cont_detail_ctt[i] + "#%#";
    str2 += this.data.cont_detail_ctt[len2 - 1];
    getApp().globalData.name = this.data.name;
    getApp().globalData.intro = this.data.intro;
    getApp().globalData.self_ctt = str1;
    getApp().globalData.cont_ctt = str2;
  },

  //判断该用户是否为初次登录
  dealWithFirstLogged: function () {
    var that = this;
    //此时向数据库传openId，如果发现是新用户，则设置first_logged为true，否则设为false，并且直接对that.data赋值
    wx.request({
      url: config.service.userInfoUrl,
      data: {
        userId: that.data.userInfo.openId
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        //console.log(res.data);
        if(!res.data.existed){
          var temp = JSON.stringify(that.data.userInfo)
          wx.navigateTo({
            url: '/pages/setInfoFirst/setInfoFirst?userInfo=' + temp,
          })
        }
        else{
          getApp().globalData.first_logged = false;
          that.setData({
            first_logged: false,
            name: res.data.info.userName,
            intro: res.data.info.intro,
            self_detail_ctt: [res.data.info.department, res.data.info.major, res.data.info.city],
            cont_detail_ctt: [res.data.info.phoneNum, res.data.info.qqNum, res.data.info.wxNum, res.data.info.email]
          })
          that.boxingData()
          //获取五个列表
          wx.request({
            url: config.service.getAddressListUrl,
            data: {
              userId: 'buaasoft1621' //这里修改为全局openId
            },
            method: 'GET',
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {
              getApp().globalData.cardList = JSON.stringify(res.data.card);
              getApp().globalData.specialList = JSON.stringify(res.data.special);
              getApp().globalData.blackList = JSON.stringify(res.data.black);
              getApp().globalData.addGroupList = JSON.stringify(res.data.add);
              getApp().globalData.createGroupList = JSON.stringify(res.data.create)
            },
            fail: function (res) {
              util.showModel('操作失败');
            }
          })
        }          
        util.showSuccess('操作成功');
      },
      fail: function (res) {
        util.showModel('操作失败');
      },
    })
  },

  bindGetUserInfo: function (e) {
    var that = this
    
    util.showBusy('正在登录')

    // 调用登录接口
    qcloud.login({
      success(result) {
        if (result) {
          util.showSuccess('登录成功');
          getApp().globalData.logged = true;
          getApp().globalData.openId = result.openId;
          that.setData({
            userInfo: result,
            is_logged: true
          });
          that.dealWithFirstLogged()
        } else {
          // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
          qcloud.request({
            url: config.service.requestUrl,
            login: true,
            success(result) {
              util.showSuccess('登录成功')
              getApp().globalData.logged = true;
              getApp().globalData.openId = result.openId;
              that.setData({
                userInfo: result.data.data,
                is_logged: true
              })
              that.dealWithFirstLogged()
            },

            fail(error) {
              util.showModel('请求失败', error)
              //console.log('request fail', error)
            }
          })
        }
      },

      fail(error) {
        util.showModel('登录失败', error)
        //console.log('登录失败', error)
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log('onLoad');
    var that = this;
    // 获取系统信息
    wx.getSystemInfo({
      success: function (res) {
        //console.log(res);
        // 可使用窗口宽度、高度
        //console.log('height=' + res.windowHeight);
        //console.log('width=' + res.windowWidth);
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
    that.setData({
      is_logged: getApp().globalData.logged,
      first_logged: getApp().globalData.first_logged
    });
    //console.log(that.data.is_logged + " " + that.data.first_logged)
    if(that.data.is_logged){
      var str1 = getApp().globalData.self_ctt;
      var str2 = getApp().globalData.cont_ctt;

      that.setData({
        name: getApp().globalData.name,
        intro: getApp().globalData.intro,
        self_detail_ctt: str1.split("#%#"),
        cont_detail_ctt: str2.split("#%#")
      })
    }
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