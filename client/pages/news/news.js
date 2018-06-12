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
    else if (systype == 'createRequest'){
      console.log('/pages/dealApplication/dealApplication?application_type=2&content=' + JSON.stringify(content) + '&sysInfoId=' + JSON.stringify(sysId))
      wx.navigateTo({
        url: '/pages/dealApplication/dealApplication?application_type=2&content=' + JSON.stringify(content) + '&sysInfoId=' + JSON.stringify(sysId),
      });
    }
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
          else if (newsType == 'dismiss') {
            array[index].name = '散群公示'
          }
          else if (newsType == 'quit') {
            array[index].name = '退群通知'
          }
          else if (newsType == 'kick') {
            array[index].name = '踢群通知'
          }
        })
        that.setData({
          list: anew,
        })
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
    if (this.data.is_logged) {
      this.getNews();
      this.freshList();
    }
  },

  onPullDownRefresh: function () {
    var that = this;
    wx.showNavigationBarLoading() //在标题栏中显示加载
    //模拟加载
    setTimeout(function () {
      if (that.data.is_logged) {
        that.getNews();
        that.freshList();
      }
      // complete
      util.showSuccess('刷新成功');
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
  },

  freshList: function () {
    var that = this;
    wx.request({
      url: config.service.getAddressListUrl,
      data: {
        userId: getApp().globalData.openId,//'buaasoft1621' //这里修改为全局openId
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
        getApp().globalData.createGroupList = JSON.stringify(res.data.create);
      },
      fail: function (res) {
        util.showModel('操作失败');
      }
    });
  },
})