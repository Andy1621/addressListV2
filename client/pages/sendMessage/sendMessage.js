// pages/sendMessage/sendMessage.js   图片上传以及确定按钮还没实现
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: "",
    ctt_len: 0,
    files: [],
    groupId: '',
    imgUrl: [],
  },

  onClick: function(){

  },

  //获取textarea（用户输入）数据
  formSubmit: function (e) {
    var that = this;
    console.log('form发生了submit事件，携带数据为：', e.detail.value["content"]);
    that.setData({
      content: e.detail.value["content"]
    })
    console.log(that.data.content);
    //console.log(that.data.files)
    var len = that.data.files.length;
    var success = 0;
    if(len == 0){
      that.sendGroupMessage();
    }
    else{
      for (var i = 0; i < len; i++) {
        wx.uploadFile({
          url: config.service.uploadUrl,
          filePath: that.data.files[i],
          name: 'file',
          success: function (res) {
            res = JSON.parse(res.data)
            success++;
            var url = res.data.imgUrl;
            var url1 = url.replace('https', 'http')
            that.data.imgUrl.push(url1)
            if (success == len) {
              that.sendGroupMessage();
            }
          },
          fail: function (e) {
            util.showModel('上传图片失败')
          }
        })
      }
    }
  },

  sendGroupMessage: function () {
    var that = this;
    that.data.isClicked = true;
    getApp().globalData.noShow = false;
    console.log("发出一个sendGroupMessage请求");
    wx.request({
      url: config.service.groupMessageUrl,
      data: {
        groupId: that.data.groupId,
        userId: getApp().globalData.openId,
        content: that.data.content,
        imagePath: that.data.imgUrl.toString()
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        util.showSuccess('发布成功');
      },
      fail: function (res) {
        util.showModel('发布失败');
      },
    })
    wx.navigateBack({
      delta: 1
    })
  },

  //输入时同步字数
  whenInput: function(e){
    this.setData({
      ctt_len: e.detail.value.length
    })
  },

  //图片上传相关
  chooseImage: function (e) {
    var that = this;
    if(that.data.files.length == 9)
      return;

    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });
      }
    })
  },

  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      groupId: options.groupId,
      isClicked: false
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
      if(!this.data.isClicked){
        getApp().globalData.noShow = true
      }
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