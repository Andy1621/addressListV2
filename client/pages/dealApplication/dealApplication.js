// pages/dealApplication/dealApplication.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        application_type:2,//1 for person,2 for group
        apply_reason:"This is apply reason.这是申请原因。",
        addresslist_name:"This is addresslist name.这是通讯录名称",
        addresslist_info:"This is addresslist information.这是通讯录信息",
    },

    agreeToast: function () {
        wx.showToast({
            title: '已同意申请',
            icon: 'success',
            duration: 2000
        });
        setTimeout(function(){
            wx.navigateBack({
                delta: 1,
            });
        },2000);
    },
    
    refuseToast: function () {
        wx.showToast({
            title: '已拒绝申请',
            icon: 'success',
            duration: 2000
        });
        setTimeout(function (){
            wx.navigateBack({
                delta: 1,
            });
        },2000);
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

    },
})