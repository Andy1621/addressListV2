// pages/setting/setting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rest_height: 0,
    intro:"",

    self_detail_title: [
      "个人信息1", "个人信息2", "个人信息3", "个人信息4", "个人信息5", "个人信息6"
    ],

    cont_detail_title: [
      "联系方式1", "联系方式2", "联系方式3", "联系方式4", "联系方式5"
    ],

    self_detail_ctt:[],
    cont_detail_ctt:[]
  },

  onClick:function(){
      var that = this;
      var str1 = "", str2 = "";
      var len1 = that.data.self_detail_ctt.length;
      var len2 = that.data.cont_detail_ctt.length;
      for (var i = 0; i < len1 - 1; i++)
        str1 += that.data.self_detail_ctt[i] + "#%#";
      str1 += that.data.self_detail_ctt[len1 - 1];
      for (var i = 0; i < len2 - 1; i++)
        str2 += that.data.cont_detail_ctt[i] + "#%#";
      str2 += that.data.cont_detail_ctt[len2 - 1];
      getApp().globalData.intro = that.data.intro;
      getApp().globalData.self_ctt = str1;
      getApp().globalData.cont_ctt = str2;
      wx.switchTab({
        url: '/pages/myInfo/myInfo',
      })
  },

  formSubmit: function (e) {
      var that = this;
      console.log('form发生了submit事件，携带数据为：', e.detail.value["info" + 1]);
      that.data.intro = e.detail.value["intro"];
      var len1 = that.data.self_detail_ctt.length;
      var len2 = that.data.cont_detail_ctt.length;
      for (var i = 0; i < len1; i++)
          that.data.self_detail_ctt[i] = e.detail.value["info" + i];
      for (var i = 0; i < len2; i++)
          that.data.cont_detail_ctt[i] = e.detail.value["cont" + i];
      console.log(that.data.self_detail_ctt);
      console.log(that.data.cont_detail_ctt);
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
          // rest部分高度 = 利用窗口可使用高度 - first部分高度（这里的高度单位为px，所有利用比例将140rpx转换为px）
          rest_height: res.windowHeight - res.windowWidth / 750 * 140
        })
      }
    });
    //获取个人信息
    var str1 = getApp().globalData.self_ctt.split("#%#");
    var str2 = getApp().globalData.cont_ctt.split("#%#");
    that.setData({
        intro: getApp().globalData.intro,
        self_detail_ctt: str1,
        cont_detail_ctt: str2
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