// pages/news/news.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_logged:false,
    list: 
    [
      { sysInfoId: 1, 
        systype: "createRequest", 
        content: "\u7533\u8bf7\u5efa\u7fa4", 
        time: "2018-06-06 00:00:00", 
        userId: "0001" },
      { sysInfoId: 2, systype: "createRequest", content: "\u7533\u8bf7\u5efa\u7fa4", time: "2018-06-06 00:00:00", userId: "0003" },
      { sysInfoId: 3, systype: "createRequest", content: "\u7533\u8bf7\u5efa\u7fa4", time: "2018-06-06 00:00:00", userId: "0004" },
      { sysInfoId: 4, systype: "addRequest", content: "\u7533\u8bf7\u52a0\u7fa4", time: "2018-06-06 00:00:00", userId: "0002" },
      { sysInfoId: 5, systype: "addRequest", content: "\u7533\u8bf7\u52a0\u7fa4", time: "2018-06-06 00:00:00", userId: "0005" },
      { sysInfoId: 6, systype: "createResult", content: "\u7533\u8bf7\u5efa\u7fa4\u7ed3\u679c", time: "2018-06-06 00:00:00", userId: "0002" },
      { sysInfoId: 7, systype: "createResult", content: "\u7533\u8bf7\u5efa\u7fa4\u7ed3\u679c", time: "2018-06-06 18:25:00", userId: "0001" },
      { sysInfoId: 8, systype: "addResult", content: "\u7533\u8bf7\u52a0\u7fa4\u7ed3\u679c", time: "2018-06-06 00:00:00", userId: "0005" },
      { sysInfoId: 9, systype: "addResult", content: "\u7533\u8bf7\u52a0\u7fa4\u7ed3\u679c", time: "2018-06-06 00:00:00", userId: "0002" },
      { sysInfoId: 10, systype: "special", content: "\u7279\u6b8a\u5173\u5fc3\u901a\u77e5", time: "2018-06-06 00:00:00", userId: "0002" },
      { sysInfoId: 11, systype: "leaveMessage", content: "\u7559\u8a00\u901a\u77e5", time: "2018-06-06 00:00:00", userId: "0004" },
      { sysInfoId: 12, systype: "special", content: "asddas", time: "2018-06-06 18:13:00", userId: "buaasoft1621" }
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
  onClick:function(e){
    console.log(e.currentTarget.dataset);
    var systype = e.currentTarget.dataset.type
    if (systype == 'addRequest' || systype == 'createRequest')
      wx.navigateTo({
          url: '/pages/dealApplication/dealApplication',
      });
    else if (systype == 'special' || systype =='leaveMessage'){
      wx.navigateTo({
        url: '/pages/detailPage/detailPage',
      })
    }
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