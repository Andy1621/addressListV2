var config = require('../../config')
const util = require('../../utils/util');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_logged: false,
    list: []
  },
  newsLongpress: function (e) {
    var sysId = e.currentTarget.dataset.sysid;
    var that = this;
    console.log(sysId);
    wx.showActionSheet({

      itemList: ['删除', '清空'],
      success: function (res) {
        if (!res.cancel) {
          console.log(res.tapIndex)
          if (res.tapIndex == 0) {
            wx.request({
              url: config.service.newsUrl,
              data: {
                sysInfoId: sysId
              },
              method: 'DELETE',
              header: {
                'content-type': 'application/json' // 默认值
              },
              success: function (res) {
                console.log(res.data);
                that.getNews();
                util.showSuccess('操作成功');
              },
              fail: function (res) {
                util.showModel('操作失败');
              },
            })
          }
          else if (res.tapIndex == 1){
              wx.request({
                url: config.service.deleteAllNewsUrl,
                data: {
                  userId: getApp().globalData.openId
                },
                method: 'GET',
                header: {
                  'content-type': 'application/json' // 默认值
                },
                success: function (res) {
                  console.log(res.data);
                  that.getNews();
                  util.showSuccess('操作成功');
                },
                fail: function (res) {
                  util.showModel('操作失败');
                },
              })
          }
        }
      }
    });
  },

  /* 点击查看详情跳转到处理申请*/
  onClick: function (e) {
    // console.log(e.currentTarget.dataset);
    var systype = e.currentTarget.dataset.type
    var content = e.currentTarget.dataset.content
    var sysId = e.currentTarget.dataset.sysid;
    // console.log(e.currentTarget);
    if (systype == 'addRequest')
      wx.navigateTo({
        url: '/pages/dealApplication/dealApplication?application_type=1&content=' + JSON.stringify(content) + '&sysInfoId=' + JSON.stringify(sysId),
      });
    else if (systype == 'createRequest')
      wx.navigateTo({
        url: '/pages/dealApplication/dealApplication?application_type=2&content=' + JSON.stringify(content) + '&sysInfoId=' + JSON.stringify(sysId),
      });
    else if (systype == 'special' || systype == 'leaveMessage') {
      wx.navigateTo({
        url: '/pages/detailPage/detailPage?groupId=' + content[1],
      })
    }
  },

  getNews: function () {
    var that = this;
    console.log("发出一个getNews请求");
    wx.request({
      url: config.service.newsUrl,
      data: {
        userId: getApp().globalData.openId
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        //console.log(res.data);
        var anew = res.data;
        anew.forEach(function (value, index, array) {
          var t1 = new Date(array[index].time).format("yyyy-MM-dd hh:mm:ss");
          array[index].time = t1;
          // cnew[index] = JSON.stringify(array[index].content);
          var str = array[index].content;
          array[index].content = str.split('%@%');
          var newsType = array[index].type;
          if (newsType == 'addRequest'){
            array[index].name = '加群申请'
          }
          else if (newsType == 'addResult') {
            array[index].name = '加群申请结果'
          }
          else if (newsType == 'addOver') {
            array[index].name = '加群申请'
          }
          else if (newsType == 'special') {
            array[index].name = '特殊关心'
          }
          else if (newsType == 'leaveMessage') {
            array[index].name = '留言'
          }
          else if (newsType == 'createRequest') {
            array[index].name = '建群申请'
          }
          else if (newsType == 'createResult') {
            array[index].name = '建群申请结果'
          }
          else if (newsType == 'createOver') {
            array[index].name = '建群申请'
          }
        })
        that.setData({
          list: anew,
        })
        util.showSuccess('刷新成功');
      },
      fail: function (res) {
        util.showModel('刷新失败');
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
      is_logged: getApp().globalData.logged,
    })
    if (this.data.is_logged)
      this.getNews();
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