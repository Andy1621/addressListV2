/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
  prefix: '/weapp'
})
const controllers = require('../controllers')

// 从 sdk 中取出中间件
// 这里展示如何使用 Koa 中间件完成登录态的颁发与验证
const { auth: { authorizationMiddleware, validationMiddleware } } = require('../qcloud')

// --- 登录与授权 Demo --- //
// 登录接口
router.get('/login', authorizationMiddleware, controllers.login)
// 用户信息接口（可以用来验证登录态）
router.get('/user', validationMiddleware, controllers.user)

// --- 图片上传 Demo --- //
// 图片上传接口，小程序端可以直接将 url 填入 wx.uploadFile 中
router.post('/upload', controllers.upload)

// --- 信道服务接口 Demo --- //
// GET  用来响应请求信道地址的
router.get('/tunnel', controllers.tunnel.get)
// POST 用来处理信道传递过来的消息
router.post('/tunnel', controllers.tunnel.post)

// --- 客服消息接口 Demo --- //
// GET  用来响应小程序后台配置时发送的验证请求
router.get('/message', controllers.message.get)
// POST 用来处理微信转发过来的客服消息
router.post('/message', controllers.message.post)

// GET 获取用户基本信息
router.get('/userInfo', controllers.userInfo.get)
// post 老用户修改基本信息
router.post('/userInfo', controllers.userInfo.change)
// post 创建新用户
router.post('/addUser', controllers.addUser)

//GET 获取群基本信息
router.get('/groupInfo', controllers.groupInfo)

//GET 获取群消息内容
router.get('/groupMessage', controllers.groupMessage.get)
//POST 发布群消息
router.post('/groupMessage', controllers.groupMessage.send)
//DELETE 发布群消息内容
router.delete('/groupMessage', controllers.groupMessage.deleteM)

//GET 随机获取数个公有群的基本信息
router.get('/randGetGroup', controllers.randGetGroup)

//GET 查询公有群
router.get('/searchPublic', controllers.searchPublic)

//GET 获取系统通知
router.get('/news', controllers.news.get)
//DELETE 获取系统通知
router.delete('/news', controllers.news.deleteM)

//POST 发布留言
router.post('/leaveMessage', controllers.leaveMessage.send)
//DELETE 删除留言
router.delete('/leaveMessage', controllers.leaveMessage.deleteM)

//GET 查询群消息
router.get('/searchGroupMessage', controllers.searchGroupMessage)

//DELETE 成员删群
router.delete('/deleteGroup', controllers.deleteGroup)

//DELETE 删除名片
router.delete('/deleteCard', controllers.deleteCard)

//DELETE 删除群成员
router.delete('/deleteMember', controllers.deleteMember)

//POST 申请加群
router.post('/addGroupRequest', controllers.addGroupRequest)

//POST 处理加群
router.post('/dealAddGroupRequest', controllers.dealAddGroupRequest)

//POST 申请建群
router.post('/createGroupRequest', controllers.createGroupRequest)

//POST 处理建群
router.post('/dealCreateGroupRequest', controllers.dealCreateGroupRequest)

//GET 获取通讯录表
router.get('/getAddressList', controllers.getAddressList)

//POST 修改用户关系
router.post('/changeUUship', controllers.changeUUship)

//GET 删除全部通知
router.get('/deleteAllNews', controllers.deleteAllNews)

//GET 删除全部通知
router.get('/totallyDeleteGroup', controllers.totallyDeleteGroup)

module.exports = router
