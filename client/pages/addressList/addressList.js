// pages/addressList/addressList.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      is_logged: getApp().globalData.logged,
    list1: [
      {
        // id: 'card_holder',
        // name: '名片夹',
        // open: false,
        // subName: ['火警', '盗警', '急救'],
        // phone: ['119', '110', '120']
        id: 'card_holder',
        name: '名片夹',
        open: false,
        subName: ['火警', '盗警', '急救'],
        phone: ['119', '110', '120']
      }, {
        id: 'special_attention',
        name: '特别关注',
        open: false,
        subName: ['工商银行', '建设银行', '农业银行', '中国银行', '交通银行', '浦发银行', '民生银行', '兴业银行', '中信银行', '深圳发展银行', '华夏银行', '招商银行', '广发银行', '广东农信', '光大银行'],
        phone: ['95588', '95533', '95599', '95566', '95559', '95528', '95568', '95561', '95558', '95501', '95577', '95555', '95508', '96138', '95595']
      }, {
        id: 'blacklist',
        name: '黑名单',
        open: false,
        subName: ['申通快递', 'EMS', '第三人民医院', '顺丰速运', '	圆通速递', '中通速递', '韵达快运', '天天快递', '汇通快运', '速尔快递', '德邦物流', '中铁快运', '鑫飞鸿快递', 'UPS', 'FedEx(联邦快递)'],
        phone: ['4008895543', '4008100999', '400-811-1111', '021-69777888', '021-39777777', '021-39207888', '021-67662333', '021-62963636', '4008822168', '4008305555', '95572', '021-69781999', '4008208388', '4008861888','fuck']
      }
    ],
    list2: [
      {
        id: 'addresslist_holde1r',
        name: '我创建的通讯录',
        open: false,
        subName: ['火警', '盗警', '急救','asdas'],
        phone: ['119', '110', '120','asdasd']
      },
      {
        id: 'addresslist_holder2',
        name: '我加入的通讯录',
        open: false,
        subName: ['火警', '盗警', '急救','asd'],
        phone: ['119', '110', '120','asd']
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
  fLongpress1: function (e) {
    var that = this;
    console.log(e.currentTarget.dataset);
    var id = e.currentTarget.dataset.id
    var index = e.currentTarget.dataset.index, list = this.data.list1;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
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
      }
    }
  },

  fLongpress2: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id
    var index = e.currentTarget.dataset.index, list = this.data.list2;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
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
      }
    }
  },

  // 点击切换选项卡

  navbarTap: function (e) {

    this.setData({

      currentTab: e.currentTarget.dataset.idx

    })

    console.log('最怕空气突然安静(点击)' + e.target.dataset.idx)

  },

  // 点击切换选项卡

  trendsSwiperChange: function (e) {

    var that = this;

    that.setData({

      currentTab: e.detail.current

    });

    console.log('最怕朋友突然的关心(滑动)' + e.detail.current)

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
    wx.navigateTo({
      url: '../detailPage/detailPage',
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
          // rest部分高度 = 利用窗口可使用高度 - first部分高度（这里的高度单位为px，所有利用比例将260rpx转换为px）
          rest_height1: res.windowHeight - res.windowWidth / 750 * 180,
          rest_height2: res.windowHeight - res.windowWidth / 750 * 280
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
        this.setData({
            is_logged: getApp().globalData.logged,
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