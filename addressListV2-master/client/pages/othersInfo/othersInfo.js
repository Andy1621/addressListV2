// pages/othersInfo/othersInfo.js
var util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    category: 0,  //设置页面类型，以便确定按钮种类    
    rest_height: 0,  //用于设置scroll-view高度
    //下面是用户的信息
    userId: "",
    name: "temp",
    intro: "快要被晒干了……gg",
    imgUrl: "",

    self_detail_title: [
      "所在大学", "专业", "所在城市"
    ],

    self_detail_ctt: [
      "信息1", "信息2", "信息3"
    ],

    cont_detail_title: [
      "手机号", "qq号", "微信号", "电子邮箱"
    ],

    cont_detail_ctt: [
      "方式1", "方式2", "方式3", "方式4"
    ]
  },

  onClick_tjmp: function(){
      //对全局变量的好友关系进行更改
      //向后端发送request修改数据库值
      //跳转回之前页面
      util.showSuccess('成功添加名片');
      setTimeout(function () {
        wx.navigateBack({

        });
      }, 850);
  },

  onClick_jrtbgz: function () {
      //对全局变量的好友关系进行更改
      //向后端发送request修改数据库值
      //跳转回之前页面
      util.showSuccess('成功加入特别关注');
      setTimeout(function () {
        wx.navigateBack({

        });
      }, 850);
  },

  onClick_jrhmd: function () {
      //对全局变量的好友关系进行更改
      //向后端发送request修改数据库值
      //跳转回之前页面
      util.showSuccess('成功加入黑名单');
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
    /* 依据跳转来源界面设置页面种类，从而控制按钮种类
          未加好友：0 添加名片 加入黑名单
          普通好友：1 加入特别关注 加入黑名单
          特别关注或黑名单：233 什么都没有
    */
    that.setData({
      category: options.category
    })
    //获取用户数据

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