// pages/news/news.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_logged:false,
    list:[
      {
        id: 0,
        title: "消息1",
        content: "消息1内容",
        date: "2018.5.23",
        othermsg: "点击查看详情",
      },
      {
        id: 1,
        title: "消息2",
        content: "消息2内容",
        date: "2018.5.23",
        othermsg: "点击查看详情",
      },
      {
        id: 2,
        title: "消息3",
        content: "消息3内容",
        date: "2018.5.23",
        othermsg: "点击查看详情",
      },
      {
        id: 3,
        title: "消息4",
        content: "消息4内容",
        date: "2018.5.23",
        othermsg: "点击查看详情",
      },
    ]
  },
  newsLongpress: function () {
    wx.showActionSheet({
      itemList: ['删除', '清空'],
      success: function (res) {
        if (!res.cancel) {
          console.log(res.tapIndex)
        }
      }
    });
  },

/* 点击查看详情跳转到处理申请*/
  onClick:function(){
      wx.navigateTo({
          url: '/pages/dealApplication/dealApplication',
      });
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
        is_logged:getApp().globalData.logged,
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