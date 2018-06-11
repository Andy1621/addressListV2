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
    cGroupArr: null,
    aGroupArr: null,
    cardArr:null,
    specialArr: null,
    blackArr: null,

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

    wx.showModal({
      title: '提示',
      content: '确定要删除此名片吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('点击确定了');
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
    var id = e.currentTarget.dataset.id
    var list = that.data.list2;

    wx.showModal({
      title: '提示',
      content: '确定要退出此通讯录吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('点击确定了');
        } else if (res.cancel) {
          console.log('点击取消了');
          return false;
        }
        that.setData({
          list2: list
        });
      }
    })
  },

  getAddressList: function () {
    var that = this;
    var temp_cards = this.data.list1;
    var temp_groups = this.data.list2;
    console.log("发出一个getAddressList请求");
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
        console.log(res.data);

        that.setData({
          cGroupArr: res.data.create,
          aGroupArr: res.data.add,
          cardArr: res.data.card,
          specialArr: res.data.special,
          blackArr: res.data.black
        })

        temp_cards[0].cards = that.data.cardArr;
        temp_cards[1].cards = that.data.specialArr;
        temp_cards[2].cards = that.data.blackArr;
        temp_groups[0].groups = that.data.cGroupArr;
        temp_groups[1].groups = that.data.aGroupArr;

        that.setData({
            list1: temp_cards,
            list2: temp_groups
        })

        getApp().globalData.cardList = JSON.stringify(that.data.cardArr);
        getApp().globalData.specialList = JSON.stringify(that.data.specialArr);
        getApp().globalData.blackList = JSON.stringify(that.data.blackArr);
        getApp().globalData.addGroupList = JSON.stringify(that.data.aGroupArr);
        getApp().globalData.createGroupList = JSON.stringify(that.data.cGroupArr)
      },
      fail: function (res) {
        util.showModel('操作失败');
      },

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