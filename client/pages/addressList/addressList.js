// pages/addressList/addressList.js
var app = getApp()
var config = require('../../config')
const util = require('../../utils/util');

Page({

  /**
   * 页面的初始数据
   */
  data: {
      is_logged: getApp().globalData.logged,
    groupArr: null,
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
        subName: [],
        intro: [],
        Userid:[],
      }, {
        id: 'special_attention',
        name: '特别关注',
        open: false,
        subName: [],
        intro: [],
        Userid: [],
      }, {
        id: 'blacklist',
        name: '黑名单',
        open: false,
        subName: [],
        intro: [],
        Userid: [],
      }
    ],
    list2: [
      {
        id: 'addresslist_holde1r',
        name: '我创建的通讯录',
        open: false,
        subName: [],
        intro: []
      },
      {
        id: 'addresslist_holder2',
        name: '我加入的通讯录',
        open: false,
        subName: [],
        intro: []
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
    var userBid = e.currentTarget.dataset.userbid;
    var index = e.currentTarget.dataset.index, list = this.data.list1;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        wx.showModal({
          title: '提示',
          content: '确定要删除此名片吗？',
          success: function (res) {
            if (res.confirm) {
              wx.request({
                url: config.service.deleteCardUrl,
                data: {
                  userS_id: 'buaasoft1621',
                  userB_id: userBid
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
              console.log('点击确定了');
              that.onShow();
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

  getAddressList: function () {
    var that = this;
    var list = this.data.list2;
    var listC = this.data.list1;
    console.log("发出一个getAddressList请求");
    wx.request({
      url: config.service.getAddressListUrl,
      data: {
        userId: 'buaasoft1621'
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        util.showSuccess('操作成功');
        //好友数据
        var listCN = [], listCI = [];
        var len = res.data.card.length;
        for (var i = 0; i < len; i++) {
          listCN[i] = res.data.card[i].userName;
          listCI[i] = res.data.card[i].intro;
        }
        var listSN = [], listSI = [];
        var len = res.data.special.length;
        for (var i = 0; i < len; i++) {
          listSN[i] = res.data.special[i].userName;
          listSI[i] = res.data.special[i].intro;
        }
        var listBN = [], listBI = [];
        var len = res.data.special.length;
        for (var i = 0; i < len; i++) {
          listBN[i] = res.data.black[i].userName;
          listBI[i] = res.data.black[i].intro;
        }
        listC[0].subName = listCN;
        listC[0].intro = listCI;
        listC[1].subName = listSN;
        listC[1].intro = listSI;
        listC[2].subName = listBN;
        listC[2].intro = listBI;

        //通讯录数据
        var listNC = [], listIC = [];
        var len = res.data.create.length;
        for (var i = 0; i < len; i++) {
          listNC[i] = res.data.create[i].groupName;
          listIC[i] = res.data.create[i].groupIntro;
        }
        var listNA = [], listIA = [];
        var len = res.data.add.length;
        for (var i = 0; i < len; i++) {
          listNA[i] = res.data.add[i].groupName;
          listIA[i] = res.data.add[i].groupIntro;
        }
        list[0].subName = listNC;
        list[0].intro = listIC;
        list[1].subName = listNA;
        list[1].intro = listIA;

        that.setData({
          list1: listC,
          list2: list,
          cGroupArr: res.data.create,
          aGroupArr: res.data.add,
          cardArr: res.data.card,
          specialArr: res.data.special,
          blackArr: res.data.black,
          groupArr: res.data.create.concat(res.data.add),
        })
        console.log(that.data.groupArr);

        getApp().globalData.listCard = JSON.stringify(that.data.cardList);
        getApp().globalData.listAddress = JSON.stringify(that.data.specialList);
        getApp().globalData.listAddress = JSON.stringify(that.data.blackList);
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
    console.log(e);
    var num = e.currentTarget.dataset.index;
    var passInfo = this.data.groupArr[num];
    let str = JSON.stringify(passInfo);
    console.log(str);
    wx.navigateTo({
      url: '/pages/detailPage/detailPage?jsonStr=' + str,
    })
  },

  jumpToInfo:function(e){
        //先判断该用户与这位名片用户的关系，来设置category
        wx.navigateTo({
            url: '/pages/othersInfo/othersInfo?category=0',
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
<<<<<<< HEAD
    var that = this;
    var list = this.data.list2;
    var listC = this.data.list1;
    console.log("发出一个getAddressList请求");
    wx.request({
      url: config.service.getAddressListUrl,
      data: {
        userId: 'buaasoft1621'
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        util.showSuccess('操作成功');
        //好友数据
        var listCN = [], listCI = [],listCD=[];
        var len = res.data.card.length;
        for (var i = 0; i < len; i++) {
          listCN[i] = res.data.card[i].userName;
          listCI[i] = res.data.card[i].intro;
          listCD[i] = res.data.card[i].userId;
        }
        var listSN = [], listSI = [],listSD=[];
        var len = res.data.special.length;
        for (var i = 0; i < len; i++) {
          listSN[i] = res.data.special[i].userName;
          listSI[i] = res.data.special[i].intro;
          listSD[i] = res.data.special[i].userId;
        }
        var listBN = [], listBI = [],listBD=[];
        var len = res.data.black.length;
        for (var i = 0; i < len; i++) {
          listBN[i] = res.data.black[i].userName;
          listBI[i] = res.data.black[i].intro;
          listBD[i] = res.data.black[i].userId;
        }
        listC[0].subName = listCN;
        listC[0].intro = listCI;
        listC[0].Userid = listCD;
        listC[1].subName = listSN;
        listC[1].intro = listSI;
        listC[1].Userid = listSD
        listC[2].subName = listBN;
        listC[2].intro = listBI;
        listC[2].Userid = listBD;

        //通讯录数据
        var listNC = [],listIC = [];
        var len = res.data.create.length;
        for (var i = 0; i < len; i++){
          listNC[i] = res.data.create[i].groupName;
          listIC[i] = res.data.create[i].groupIntro;
        }
        var listNA = [], listIA = [];
        var len = res.data.add.length;
        for (var i = 0; i < len; i++) {
          listNA[i] = res.data.add[i].groupName;
          listIA[i] = res.data.add[i].groupIntro;
        }
        list[0].subName = listNC;
        list[0].intro = listIC;
        list[1].subName = listNA;
        list[1].intro = listIA;

        that.setData({
          is_logged: getApp().globalData.logged,
          list1: listC,
          list2: list
        })

        getApp().globalData.listCard = JSON.stringify(that.data.list1);
        getApp().globalData.listAddress = JSON.stringify(that.data.list2);
      },
      fail: function (res) {
        util.showModel('操作失败');
      },
      
    })
=======
    this.getAddressList();
    this.setData({
      is_logged: getApp().globalData.logged,
    });
>>>>>>> 1198cfb4bcc0499b2326f7250339926a5176cd7a

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