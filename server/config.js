const CONF = {
    port: '5757',
    rootPathname: '',

    // 微信小程序 App ID
    appId: 'wx7ca9d7f62b37103a',

    // 微信小程序 App Secret
    appSecret: 'dc41843563fc8d6acecb91ce249243e3',

    // 是否使用腾讯云代理登录小程序
    useQcloudLogin: true,

    /**
     * MySQL 配置，用来存储 session 和用户信息
     * 若使用了腾讯云微信小程序解决方案
     * 开发环境下，MySQL 的初始密码为您的微信小程序 appid
     */
    mysql: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        db: 'cAuth',
        pass: 'wx7ca9d7f62b37103a',
        char: 'utf8mb4',
        //库名
        myDb: 'addressList',
        //表名
        InfoSentBySys: 'InfoSentBySys',
        User: 'User',
        UUship: 'UUship',
        UGship: 'UGship',
        MyGroup: 'MyGroup',
        GroupMessage: 'GroupMessage',
        LeaveMessage: 'LeaveMessage',
        Administrator: 'Administrator'
    },

    cos: {
        /**
         * 地区简称
         * @查看 https://cloud.tencent.com/document/product/436/6224
         */
        region: 'ap-guangzhou',
        // Bucket 名称
        fileBucket: 'qcloudtest',
        // 文件夹
        uploadFolder: ''
    },

    // 微信登录态有效期
    wxLoginExpires: 7200,
    wxMessageToken: 'abcdefgh'
}

module.exports = CONF
