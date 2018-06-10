## 群通讯录V2.0

使用腾讯wafer框架

写代码的时候开发者工具右键——格式化代码，排版美观



### 修改字段与页面

1. 现在想到处理”建群申请“是这样子，咱们在User加个type字段（默认为非管理员），判断是不是管理员
2. 增加一个新用户注册填写信息页面
3. User增加头像地址
4. 增加一个处理通知的页面
5. 删除了MyGroup的成员数量字段





### 页面命名

1. 新用户注册： register
2. 建群申请： showRequest
3. 处理申请： dealRequest
4. 公有通讯录群展示页面：community
5. 查找通讯录群明细页面：searchDetail
6. 通讯录列表页面：addressList
7. 查找所有相关信息页面：searchEverything
8. 创建通讯录界面： createAddressList
9. 通讯录群详情界面：detailPage
10. 消息发布界面：sendMessage
11. 通知页面：news
12. 我的信息：myInfo
13. 设置：setting



### Type定义

- User

  1. 普通——normal
  2. 管理员——super

- UGship

  1. 群主——master
  2. 群成员——member
  3. 屏蔽成员——black

- UUship

  1. 黑名单——black
  2. 特殊关注——special
  3. 普通——normal

- MyGroup

  1. 公共——public
  2. 私有——private
  3. 未创建（等待通过申请）——wait

- InfoSentBySys

  按照郭子的想法，应该每种消息content都有特殊限制，有待郭子补充

  1. 申请加群——addRequest
  2. 申请加群结果——addResult
  3. 申请加群已处理——addOver
  4. 特殊关心通知——special 
  5. 留言通知——leaveMessage
  6. 申请建群——createRequest
  7. 申请建群结果——createResult
  8. 申请建群已处理——createOver



### 接口定义

| 编号 | 接口名字               | 输入                                               | 输出                                                         | 功能                         |
| ---- | :--------------------- | -------------------------------------------------- | ------------------------------------------------------------ | ---------------------------- |
| 1    | getUserInfo            | userId                                             | User表的所有信息                                             | 获取用户信息                 |
| 2    | changeUserInfo         | 修改的user的所有信息                               | 无                                                           | 修改用户信息                 |
| 3    | addUser                | 添加的user的所有信息                               | 无                                                           | 添加新用户                   |
| 4    | getGroupInfo           | groupId                                            | 群基本信息、所有群成员信息，群成员数量，所有群消息id，群消息数量 | 获取群基本信息               |
| 5    | getGroupMessage        | groupMessageId                                     | 群消息内容                                                   | 获取群消息内容               |
| 6    | randGetGroup           | 无                                                 | 数个公有群的基本信息                                         | 随机获取数个公有群的基本信息 |
| 7    | searchPublic           | 字符串                                             | 匹配的公有群的基本信息                                       | 查询公有群                   |
| 8    | getNews                | userId                                             | 所有系统通知                                                 | 获取系统通知                 |
| 9    | getAddressList         | userId                                             | 通讯录页的五个内容                                           | 获取通讯录表                 |
| 10   | searchGroupMessage     | groupId，字符串                                    | 该群里匹配的消息                                             | 查询群消息                   |
| 11   | addGroupRequest        | groupId，申请原因，申请者userId                    | 无                                                           | 申请加群                     |
| 12   | dealAddGroupRequest    | 操作，groupId，申请者userId，申请加群通知sysInfoId | 无                                                           | 处理加群                     |
| 13   | createGroupRequest     | 群名，类型，简介，申请者userId                     | 无                                                           | 申请建群                     |
| 14   | dealCreateGroupRequest | 操作，群类型，申请者userId，申请建群通知sysInfoId  | 无                                                           | 处理建群                     |
| 15   | sendGroupMessage       | userId，groupId，消息内容，图片地址                | 无                                                           | 发布群消息                   |
| 16   | sendLeaveMessage       | userId， groupMessageId，groupId，消息内容         | 无                                                           | 发布留言                     |
| 17   | deleteGroupMessage     | groupMessageId                                     | 无                                                           | 删除群消息                   |
| 18   | deleteLeaveMessage     | leaveMessageId                                     | 无                                                           | 删除留言                     |
| 19   | deleteGroup            | userId，groupId                                    | 无                                                           | 成员删群                     |
| 20   | deleteCard             | 操作者userS_id，名片userB_id                       | 无                                                           | 删除名片                     |
| 21   | deleteNews             | sysInfoId                                          | 无                                                           | 删除通知                     |
| 22   | deleteMember           | groupId，被删的userId                              | 无                                                           | 删除群成员                   |
| 23   | changeUUship           | 关系type，userS_id，userB_id                       | 无                                                           | 修改用户关系                 |

时间格式处理==>https://www.cnblogs.com/yanglf/p/5775224.html

接口11发送通知给群主，通知格式为：**（某人） 申请加入您创建的群 （某群） %@%申请原因%@%groupId%@%申请者userId**

接口12发送通知给申请者，通知格式为：**您申请加入群 （某群） 的申请已被群主通过/拒绝**

接口13发送通知给管理员，建群格式为：**（某人） 申请创建 （某群） ，点击进行处理%@%群名%@%群类型%@%待处理群Id%@%申请者userId**

接口13发送通知给申请者，建群格式为：**您申请创建 群（某群） 的请求已被管理员通过** 

接口15发送消息后，会通知特殊关心该用户的用户，通知格式为：**您特殊关心的 （某人） 发布了一条消息，点击去看看吧%@%groupId**

接口16发送留言后，会通知对应消息的用户，通知格式为：**（某人） 在您发布的消息下留言了，点击去看看吧%@%groupId** 



