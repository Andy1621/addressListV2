// pages/othersInfo/othersInfo.js
var config = require('../../config')
var util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    category: 0,  //设置页面类型，以便确定按钮种类    
    rest_height: 0,  //用于设置scroll-view高度
    isMyself: false,
    //好友与用户关系
    normal:[],
    special:[],
    black:[],
    //下面是用户的信息
    userTotal:{},
    userId: "",
    name: "",
    intro: "",
    imgUrl: "",

    self_detail_title: [
      "所在大学", "专业", "所在城市"
    ],

    self_detail_ctt: [],

    cont_detail_title: [
      "手机号", "qq号", "微信号", "电子邮箱"
    ],

    cont_detail_ctt: []
  },

  //寻找itm在arr中索引
  findIndex: function(arr, itm){
    var len = arr.length;
    for(var i = 0; i < len; i++){
      if(arr[i].userId == itm.userId)
        return i;
    }
    return -1;
  },

  //添加名片
  onClick_tjmp: function(){
      var that = this;
      //对全局变量的好友关系进行更改
      that.data.normal.push(that.data.userTotal);
      getApp().globalData.cardList = JSON.stringify(that.data.normal);
      //向后端发送request修改数据库值
      wx.request({
        url: config.service.changeUUshipUrl,
        data: {
          userS_id: getApp().globalData.openId,
          userB_id: that.data.userId,
          type: 'normal'
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
      //跳转回之前页面
      util.showSuccess('成功添加名片');
      setTimeout(function () {
        wx.navigateBack({
        });
      }, 850);
  },

  //加入特别关注
  onClick_jrtbgz: function () {
      var that = this;
      //对全局变量的好友关系进行更改
      that.data.special.push(that.data.userTotal);

      var indexNor = that.findIndex(that.data.normal, that.data.userTotal);
      var indexBla = that.findIndex(that.data.black, that.data.userTotal);
      if(indexNor != -1)
        that.data.normal.splice(indexNor, 1);
      else if(indexBla != -1)
        that.data.black.splice(indexBla, 1);
      
      getApp().globalData.cardList = JSON.stringify(that.data.normal);
      getApp().globalData.specialList = JSON.stringify(that.data.special);
      getApp().globalData.blackList = JSON.stringify(that.data.black);
      //向后端发送request修改数据库值
      wx.request({
        url: config.service.changeUUshipUrl,
        data: {
          userS_id: getApp().globalData.openId,
          userB_id: that.data.userId,
          type: 'special'
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
      //跳转回之前页面
      util.showSuccess('成功加入关注');
      setTimeout(function () {
        wx.navigateBack({
        });
      }, 850);
  },

  //加入黑名单
  onClick_jrhmd: function () {
      var that = this;
      //对全局变量的好友关系进行更改
      that.data.black.push(that.data.userTotal);

      var indexNor = that.findIndex(that.data.normal, that.data.userTotal);
      var indexSpe = that.findIndex(that.data.special, that.data.userTotal);
      if (indexNor != -1)
        that.data.normal.splice(indexNor, 1);
      else if (indexSpe != -1)
        that.data.special.splice(indexSpe, 1);

      getApp().globalData.cardList = JSON.stringify(that.data.normal);
      getApp().globalData.specialList = JSON.stringify(that.data.special);
      getApp().globalData.blackList = JSON.stringify(that.data.black);
      //向后端发送request修改数据库值
      wx.request({
        url: config.service.changeUUshipUrl,
        data: {
          userS_id: getApp().globalData.openId,
          userB_id: that.data.userId,
          type: 'black'
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
      //跳转回之前页面
      util.showSuccess('成功加入黑名单');
      setTimeout(function () {
        wx.navigateBack({
        });
      }, 850);
  },

  //取消特别关注
  onClick_qxtbgz: function () {
    var that = this;
    //对全局变量的好友关系进行更改
    that.data.normal.push(that.data.userTotal);

    var indexSpe = that.findIndex(that.data.special, that.data.userTotal);
    if (indexSpe != -1)
      that.data.special.splice(indexSpe, 1);
    console.log(indexSpe)

    getApp().globalData.cardList = JSON.stringify(that.data.normal);
    getApp().globalData.specialList = JSON.stringify(that.data.special);
    //向后端发送request修改数据库值
    wx.request({
      url: config.service.changeUUshipUrl,
      data: {
        userS_id: getApp().globalData.openId,
        userB_id: that.data.userId,
        type: 'normal'
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
    //跳转回之前页面
    util.showSuccess('成功取消关注');
    setTimeout(function () {
      wx.navigateBack({
      });
    }, 850);
  },

  //移出黑名单
  onClick_ychmd: function () {
    var that = this;
    //对全局变量的好友关系进行更改
    that.data.normal.push(that.data.userTotal);

    var indexBla = that.findIndex(that.data.black, that.data.userTotal);
    if (indexBla != -1)
      that.data.black.splice(indexBla, 1);

    getApp().globalData.cardList = JSON.stringify(that.data.normal);
    getApp().globalData.blackList = JSON.stringify(that.data.black);
    //向后端发送request修改数据库值
    wx.request({
      url: config.service.changeUUshipUrl,
      data: {
        userS_id: getApp().globalData.openId,
        userB_id: that.data.userId,
        type: 'normal'
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
    //跳转回之前页面
    util.showSuccess('成功移出黑名单');
    setTimeout(function () {
      wx.navigateBack({
      });
    }, 850);
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
          // rest部分高度 = 利用窗口可使用高度 - first部分高度（这里的高度单位为px，所有利用比例将400rpx转换为px）
          rest_height: res.windowHeight - res.windowWidth / 750 * 400
        })
      }
    });
    /* 依据userId判断用户间关系，设置页面种类，从而控制按钮种类
          未加好友：0 添加名片 加入黑名单
          普通好友：1 加入特别关注 加入黑名单
          特别关注：2 取消特别关注 加入黑名单
          黑名单： -1 加入特别关注 移出黑名单
    */
    that.setData({
      userId: options.userId,
      isMyself: false,
      category: 0,
      normal: JSON.parse(getApp().globalData.cardList),
      special: JSON.parse(getApp().globalData.specialList),
      black: JSON.parse(getApp().globalData.blackList)
    })
    var len1 = that.data.normal.length, len2 = that.data.special.length, len3 = that.data.black.length;
    for(var i = 0; i < len1; i++)
      if(that.data.normal[i].userId == that.data.userId){
        that.setData({
          category: 1
        })
        break;
      }
    if(that.data.category == 0)
      for (var i = 0; i < len2; i++)
        if (that.data.special[i].userId == that.data.userId) {
          that.setData({
            category: 2
          })
          break;
        }
    if (that.data.category == 0)
      for (var i = 0; i < len3; i++)
        if (that.data.black[i].userId == that.data.userId) {
          that.setData({
            category: -1
          })
          break;
        }
    //判断该页面目标用户是不是自己
    if(that.data.userId == getApp().globalData.openId)
      that.setData({
        isMyself: true
      })
    //获取用户数据
    wx.request({
      url: config.service.userInfoUrl,
      data: {
        userId: that.data.userId
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          userTotal: res.data.info,
          name: res.data.info.userName,
          intro: res.data.info.intro,
          self_detail_ctt: [res.data.info.department, res.data.info.major, res.data.info.city],
          cont_detail_ctt: [res.data.info.phoneNum, res.data.info.qqNum, res.data.info.wxNum, res.data.info.email],
          imgUrl: res.data.info.imgUrl
        })
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

  }
})