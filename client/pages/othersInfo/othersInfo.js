// pages/othersInfo/othersInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rest_height: 0,
    userInfo: {},
    name: "temp",
    intro: "快要被晒干了……gg",

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

  //数据处理完毕后跳到setting
  onClick: function () {
    this.boxingData();
    wx.navigateTo({
      url: '/pages/setting/setting',
    })
  },

  //将当前个人信息的数据内容处理后传到全局变量
  boxingData: function () {
    var str1 = "", str2 = "";
    var len1 = this.data.self_detail_ctt.length;
    var len2 = this.data.cont_detail_ctt.length;
    for (var i = 0; i < len1 - 1; i++)
      str1 += this.data.self_detail_ctt[i] + "#%#";
    str1 += this.data.self_detail_ctt[len1 - 1];
    for (var i = 0; i < len2 - 1; i++)
      str2 += this.data.cont_detail_ctt[i] + "#%#";
    str2 += this.data.cont_detail_ctt[len2 - 1];
    getApp().globalData.name = this.data.name;
    getApp().globalData.intro = this.data.intro;
    getApp().globalData.self_ctt = str1;
    getApp().globalData.cont_ctt = str2;
  },

  //判断该用户是否为初次登录
  dealWithFirstLogged: function () {
    var that = this;
    //此时向数据库传openId，如果发现是新用户，则设置first_logged为true，否则设为false，并且直接对that.data赋值
    if (that.data.first_logged)
      wx.navigateTo({
        url: '/pages/setInfoFirst/setInfoFirst',
      })
    else
      this.boxingData()
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
          rest_height: res.windowHeight - res.windowWidth / 750 * 260
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
    var that = this;
    if (getApp().globalData.name == "")
      getApp().globalData.name = that.data.userInfo.nickName

    var str1 = getApp().globalData.self_ctt;
    var str2 = getApp().globalData.cont_ctt;

    that.setData({
      name: getApp().globalData.name,
      intro: getApp().globalData.intro,
      self_detail_ctt: str1.split("#%#"),
      cont_detail_ctt: str2.split("#%#")
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