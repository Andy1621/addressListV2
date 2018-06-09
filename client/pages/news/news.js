// pages/news/news.js
var config = require('../../config')
const util = require('../../utils/util');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_logged:false,
    list:[]
  },
  newsLongpress: function () {
    wx.showActionSheet({
      itemList: ['删除', '清空'],
      success: function (res) {
        if (!res.cancel) {
          console.log(res.tapIndex)
        }
      }
    });
  },

/* 点击查看详情跳转到处理申请*/
  onClick:function(e){
    console.log(e.currentTarget.dataset);
    var systype = e.currentTarget.dataset.type
    if (systype == 'addRequest')
      wx.navigateTo({
          url: '/pages/dealApplication/dealApplication?application_type=1',
      });
    else if (systype == 'createRequest')
        wx.navigateTo({
            url: '/pages/dealApplication/dealApplication?application_type=2',
        });
    else if (systype == 'special' || systype =='leaveMessage'){
      wx.navigateTo({
        url: '/pages/detailPage/detailPage',
      })
    }
  },

  getNews:function(){
    var that = this;
    console.log("发出一个getNews请求");
    wx.request({
      url: config.service.newsUrl,
      data: {
        userId: '0001'
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          list: res.data,
        });
        util.showSuccess('刷新成功');
      },
      fail: function (res) {
        util.showModel('刷新失败');
      },
    })
    //时间处理
    setTimeout(function () {
      var anew = that.data.list;
      anew.forEach(function (value, index, array) {
        console.log();
        var t1 = new Date(array[index].time).format("yyyy-MM-dd hh:mm:ss");
        array[index].time = t1;
      })
      that.setData({
        list: anew
      })
    }, 100);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNews();
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
    this.setData({
        is_logged:getApp().globalData.logged,
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
    this.getNews();
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