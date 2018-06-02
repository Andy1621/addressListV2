// pages/searchEverything/searchEverything.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: ""
  },

  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },

  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },

  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      //设置图片地址
      list: "/images/tab/list.png",
      people: "/images/tab/me.png"
    });
  }
})