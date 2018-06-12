/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://jdtzxlra.qcloud.la';

var config = {

    // 下面的地址配合云端 Demo 工作
    service: {
        host,

        // 登录地址，用于建立会话
        loginUrl: `${host}/weapp/login`,

        // 测试的请求地址，用于测试会话
        requestUrl: `${host}/weapp/user`,

        // 测试的信道服务地址
        tunnelUrl: `${host}/weapp/tunnel`,

        // 上传图片接口
        uploadUrl: `${host}/weapp/upload`,

        // 获取、修改老用户信息
        userInfoUrl: `${host}/weapp/userInfo`,

        // 增加新用户
        addUserUrl: `${host}/weapp/addUser`,

        // 获取群基本信息
        groupInfoUrl: `${host}/weapp/groupInfo`,

        // 获取、发布、删除群消息
        groupMessageUrl: `${host}/weapp/groupMessage`,

        // 随机获取数个公有群的基本信息
        randGetGroupUrl: `${host}/weapp/randGetGroup`,

        // 查询公有群
        searchPublicUrl: `${host}/weapp/searchPublic`,

        // 获取、删除系统通知
        newsUrl: `${host}/weapp/news`,

        // 发布、删除留言
        leaveMessageUrl: `${host}/weapp/leaveMessage`,

        // 查询群消息
        searchGroupMessageUrl: `${host}/weapp/searchGroupMessage`,

        // 用户删群
        deleteGroupUrl: `${host}/weapp/deleteGroup`,

        // 删除名片
        deleteCardUrl: `${host}/weapp/deleteCard`,

        // 删除群成员
        deleteMemberUrl: `${host}/weapp/deleteMember`,

        // 申请加群
        addGroupRequestUrl: `${host}/weapp/addGroupRequest`,

        // 处理加群
        dealAddGroupRequestUrl: `${host}/weapp/dealAddGroupRequest`,

        // 申请建群
        createGroupRequestUrl: `${host}/weapp/createGroupRequest`,

        // 处理建群
        dealCreateGroupRequestUrl: `${host}/weapp/dealCreateGroupRequest`,

        // 获取通讯录表
        getAddressListUrl: `${host}/weapp/getAddressList`,
        
        // 修改用户关系
        changeUUshipUrl: `${host}/weapp/changeUUship`,

        // 删除全部通知
        deleteAllNewsUrl: `${host}/weapp/deleteAllNews`,

        // 群主删群
        totallyDeleteGroupUrl: `${host}/weapp/totallyDeleteGroup`,
        
    }
};

module.exports = config;
