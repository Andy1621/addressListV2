// pages/addressList/addressList.js
var app = getApp()
var config = require('../../config')
const util = require('../../utils/util');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_logged: false,

    list1: [
      {
        id: 'card_holder',
        name: '名片夹',
        open: false,
        cards: []
      }, {
        id: 'special_attention',
        name: '特别关注',
        open: false,
        cards: []
      }, {
        id: 'blacklist',
        name: '黑名单',
        open: false,
        cards: []
      }
    ],
    list2: [
      {
        id: 'addresslist_holder1',
        name: '我创建的通讯录',
        open: false,
        groups: []
      },
      {
        id: 'addresslist_holder2',
        name: '我加入的通讯录',
        open: false,
        groups: []
      },
    ],
    navbar: ['好友', '通讯录'], //选项卡 导航
    currentTab: 0,//选项卡 索引
    rest_height1: 0,
    rest_height2: 0
  },
  //展开按钮
  widgetsToggle1: function (e) {
    var id = e.currentTarget.id, list = this.data.list1;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open;
      }
    }
    this.setData({
      list1: list
    });
  },

  widgetsToggle2: function (e) {
    var id = e.currentTarget.id, list = this.data.list2;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open;
      }
    }
    this.setData({
      list2: list
    });
  },

  //长按删除
  fLongpress1: function (e) {
    var that = this;    
    var id = e.currentTarget.dataset.id
    var list = that.data.list1;
    console.log(id);
    wx.showModal({
      title: '提示',
      content: '确定要删除此名片吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('点击确定了');
          //删除名片
          console.log("发出一个deleteCard请求");
          wx.request({
              url: config.service.deleteCardUrl,
              data: {
                  userS_id: getApp().globalData.openId,//'buaasoft1621',
                  userB_id: id//'0001'
              },
              method: 'DELETE',
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
          that.freshList();
        } else if (res.cancel) {
          console.log('点击取消了');
          return false;
        }
        that.setData({
          list1: list
        });
      }
    })
  },

  fLongpress2: function (e) {
    var that = this;
    var is_master=false;
    console.log(e);
    var id = e.currentTarget.dataset.id
    var list = that.data.list2;
    var listtmp = that.data.list2[0].groups;
    console.log(listtmp);
    for(var i=0,length=listtmp.length;i<length;i++)
    {
        if(listtmp[i].groupId==id)
        {
            is_master=true;
            break;
        }
    }
    if(is_master==true)
    {
        util.showModel('操作失败','您不能退出自己创建的群');
    }
    else
    {
        wx.showModal({
            title: '提示',
            content: '确定要退出此通讯录吗？',
            success: function (res) {
                if (res.confirm) {
                    console.log('点击确定了');
                    //删除群
                    console.log("发出一个deleteGroup请求");
                    wx.request({
                        url: config.service.deleteGroupUrl,
                        data: {
                            userId: getApp().globalData.openId,
                            groupId: id
                        },
                        method: 'DELETE',
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
                    that.freshList();
                } else if (res.cancel) {
                    console.log('点击取消了');
                    return false;
                }
            }
        })
    }
  },

  freshList: function(){
      var that=this;
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
              getApp().globalData.createGroupList = JSON.stringify(res.data.create)
          },
          fail: function (res) {
              util.showModel('操作失败');
          }
      });
      setTimeout(function () {
          that.getAddressList();
      }, 1000)
  },

  getAddressList: function () {
    var temp_cards = this.data.list1;
    var temp_groups = this.data.list2;

    temp_cards[0].cards = JSON.parse(getApp().globalData.cardList);
    temp_cards[1].cards = JSON.parse(getApp().globalData.specialList);
    temp_cards[2].cards = JSON.parse(getApp().globalData.blackList);
    temp_groups[0].groups = JSON.parse(getApp().globalData.createGroupList);
    temp_groups[1].groups = JSON.parse(getApp().globalData.addGroupList);

    this.setData({
        list1: temp_cards,
        list2: temp_groups
    })
  },

  // 点击切换选项卡
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },

  // 点击切换选项卡
  trendsSwiperChange: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },

  /**
   * button点击事件监听
   */
  jumpToCreate: function (e) {
    wx.navigateTo({
      url: '../createAddressList/createAddressList',
    })
  },

  jumpToDetail: function (e) {
      console.log(e);
      var str = e.currentTarget.dataset.id;
      wx.navigateTo({
          url: '/pages/detailPage/detailPage?groupId=' + str,
      })
  },

  jumpToInfo:function(e){
      console.log(e);
      var clickId = e.currentTarget.dataset.id;
      wx.navigateTo({
          url: '/pages/othersInfo/othersInfo?userId=' + clickId,
      })
  },

  //切换至搜索界面
  search: function (e) {
    wx.navigateTo({
      url: '../searchEverything/searchEverything',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
          rest_height1: res.windowHeight - res.windowWidth / 750 * 180,
          rest_height2: res.windowHeight - res.windowWidth / 750 * 280
        })
      }
    })

    //从数据库获取信息
    
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
    });
    if(this.data.is_logged)
        this.getAddressList();
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