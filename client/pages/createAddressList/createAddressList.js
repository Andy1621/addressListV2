// pages/creatAddressList/creatAddressList.js
var config = require('../../config')
const util = require('../../utils/util');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTopTips: false,
    groupName: '',
    groupType: '',
    groupIntro: '',
    userId: '',
    textLength:0,
    radioItems: [
      { name: 'private', value: '私人' },
      { name: 'public', value: '共享' },
    ],
    file: [],
    imgUrl: '',
  },

  onLoad: function(){
    this.setData({
      userId: getApp().globalData.openId,
    })
  },

  radioChange: function (e) {
    //console.log('radio发生change事件，携带value值为：', e.detail.value);

    var radioItems = this.data.radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }
    this.setData({
      radioItems: radioItems
    });
    if(this.data.radioItems[0].checked==1)
    {
        this.setData({
            groupType:"private",
        })
    }
    else
    {
        this.setData({
            groupType: "public",
        })
    }
    //console.log(this.data.groupType);
  },

  chooseImage: function (e) {
    var that = this;

    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          file: res.tempFilePaths
        });
        wx.uploadFile({
          url: config.service.uploadUrl,
          filePath: that.data.file[0],
          name: 'file',
          success: function (res) {
            res = JSON.parse(res.data)
            var url = res.data.imgUrl;
            var url1 = url.replace('https', 'http')
            that.setData({
              imgUrl: url1
            })
          },
          fail: function (e) {
            util.showModel('上传图片失败')
          }
        })
      }
    })
  },

  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.file // 需要预览的图片http链接列表
    })
  },

  onClick: function (e) {
    //console.log(e);
    var that=this;
    if(e.detail.value.groupName!="")
    {
        if(e.detail.value.groupIntro!="")
        {
            if(that.data.groupType.length>0)
            {
                that.setData({
                    groupName: e.detail.value.groupName,
                    groupIntro: e.detail.value.groupIntro,
                })
                // console.log(that.data.userId);
                // console.log(that.data.groupName);
                // console.log(that.data.groupType);
                // console.log(that.data.groupIntro);

                // console.log("发出一个createGroupRequest请求");
                wx.request({
                    url: config.service.createGroupRequestUrl,
                    data: {
                        groupName: that.data.groupName,
                        groupType: that.data.groupType,
                        groupIntro: that.data.groupIntro,
                        userId: that.data.userId,//'buaasoft1621'
                        imgUrl: that.data.imgUrl
                    },
                    method: 'POST',
                    header: {
                        'content-type': 'application/json' // 默认值
                    },
                    success: function (res) {
                        console.log(res.data);
                        util.showSuccess('操作成功');
                        setTimeout(function(){
                            wx.navigateBack({
                                delta: 1,
                            })
                        },2000)
                    },
                    fail: function (res) {
                        util.showModel('操作失败');
                    },
                })
            }
            else this.openAlert();//"错误提示：类型"
        }
        else this.openAlert();//"错误提示：简介"
    }
    else this.openAlert();//"错误提示：名字"
  },

  openAlert: function () {
      wx.showModal({
          content: '信息未填写完毕',
          showCancel: false,
          success: function (res) {
              if (res.confirm) {
                  console.log('用户点击确定')
              }
          }
      });
  },

  inputTyping: function (e) {
      console.log(e);
      this.setData({
          textLength: e.detail.value.length,
      })
  },


})