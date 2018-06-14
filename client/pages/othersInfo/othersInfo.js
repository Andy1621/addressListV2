// pages/othersInfo/othersInfo.js
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
  //好友与用户关系
  normal: [],
  special: [],
  black: [], 
  userTotal: {},
  userId: "",

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
      //向后端发送request修改数据库值
      wx.request({
        url: config.service.changeUUshipUrl,
        data: {
          userS_id: getApp().globalData.openId,
          userB_id: that.userId,
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
      //对全局变量的好友关系进行更改
      that.normal.push(that.userTotal);
      getApp().globalData.cardList = JSON.stringify(that.normal);
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
      //向后端发送request修改数据库值
      wx.request({
        url: config.service.changeUUshipUrl,
        data: {
          userS_id: getApp().globalData.openId,
          userB_id: that.userId,
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
      //对全局变量的好友关系进行更改
      that.special.push(that.userTotal);

      var indexNor = that.findIndex(that.normal, that.userTotal);
      var indexBla = that.findIndex(that.black, that.userTotal);
      if (indexNor != -1)
        that.normal.splice(indexNor, 1);
      else if (indexBla != -1)
        that.black.splice(indexBla, 1);

      getApp().globalData.cardList = JSON.stringify(that.normal);
      getApp().globalData.specialList = JSON.stringify(that.special);
      getApp().globalData.blackList = JSON.stringify(that.black);
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
      //向后端发送request修改数据库值
      wx.request({
        url: config.service.changeUUshipUrl,
        data: {
          userS_id: getApp().globalData.openId,
          userB_id: that.userId,
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
      //对全局变量的好友关系进行更改
      that.black.push(that.userTotal);

      var indexNor = that.findIndex(that.normal, that.userTotal);
      var indexSpe = that.findIndex(that.special, that.userTotal);
      if (indexNor != -1)
        that.normal.splice(indexNor, 1);
      else if (indexSpe != -1)
        that.special.splice(indexSpe, 1);

      getApp().globalData.cardList = JSON.stringify(that.normal);
      getApp().globalData.specialList = JSON.stringify(that.special);
      getApp().globalData.blackList = JSON.stringify(that.black);
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
    //向后端发送request修改数据库值
    wx.request({
      url: config.service.changeUUshipUrl,
      data: {
        userS_id: getApp().globalData.openId,
        userB_id: that.userId,
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
    //对全局变量的好友关系进行更改
    that.normal.push(that.userTotal);

    var indexSpe = that.findIndex(that.special, that.userTotal);
    if (indexSpe != -1)
      that.special.splice(indexSpe, 1);
    console.log(indexSpe)

    getApp().globalData.cardList = JSON.stringify(that.normal);
    getApp().globalData.specialList = JSON.stringify(that.special);
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
    //向后端发送request修改数据库值
    wx.request({
      url: config.service.changeUUshipUrl,
      data: {
        userS_id: getApp().globalData.openId,
        userB_id: that.userId,
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
    //对全局变量的好友关系进行更改
    that.normal.push(that.userTotal);

    var indexBla = that.findIndex(that.black, that.userTotal);
    if (indexBla != -1)
      that.black.splice(indexBla, 1);

    getApp().globalData.cardList = JSON.stringify(that.normal);
    getApp().globalData.blackList = JSON.stringify(that.black);
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
    var that = this;

    that.userId = options.userId;
    //获取用户数据
    wx.request({
      url: config.service.userInfoUrl,
      data: {
        userId: that.userId
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        var sim = res.data.info;

        that.userTotal = sim;
        that.setData({
          name: sim.userName,
          intro: sim.intro,
          self_detail_ctt: [sim.department, sim.major, sim.city],
          cont_detail_ctt: [sim.phoneNum, sim.qqNum, sim.wxNum, sim.email],
          imgUrl: sim.imgUrl
        })
      },
      fail: function (res) {
        util.showModel('操作失败');
      },
    })

    // 获取系统信息
    wx.getSystemInfo({
      success: function (res) {
        // 计算主体部分高度,单位为px
        that.setData({
          // rest部分高度 = 利用窗口可使用高度 - first部分高度（这里的高度单位为px，所有利用比例将400rpx转换为px）
          rest_height: res.windowHeight - res.windowWidth / 750 * 400
        })
      }
    });

    that.data.category = 0;
    that.normal = JSON.parse(getApp().globalData.cardList);
    that.special = JSON.parse(getApp().globalData.specialList);
    that.black = JSON.parse(getApp().globalData.blackList);

    //判断该页面目标用户是不是自己
    if (that.userId == getApp().globalData.openId)
      that.setData({
        isMyself: true
      })
    else
      that.setData({
        isMyself: false
      })  

    /* 依据userId判断用户间关系，设置页面种类，从而控制按钮种类
          未加好友：0 添加名片 加入黑名单
          普通好友：1 加入特别关注 加入黑名单
          特别关注：2 取消特别关注 加入黑名单
          黑名单： -1 加入特别关注 移出黑名单
    */
    var len1 = that.normal.length, len2 = that.special.length, len3 = that.black.length;
    for(var i = 0; i < len1; i++)
      if(that.normal[i].userId == that.userId){
        that.setData({
          category: 1
        })
        break;
      }
    if(that.data.category == 0)
      for (var i = 0; i < len2; i++)
        if (that.special[i].userId == that.userId) {
          that.setData({
            category: 2
          })
          break;
        }
    if (that.data.category == 0)
      for (var i = 0; i < len3; i++)
        if (that.black[i].userId == that.userId) {
          that.setData({
            category: -1
          })
          break;
        }
    if (that.data.category == 0)
      that.setData({
        category: 0
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
    getApp().globalData.noShow = true;
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