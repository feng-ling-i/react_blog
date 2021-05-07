let ipUrl = 'http://localhost:7001/admin/'

let servicePath = {
    checkLogin: ipUrl + 'checkLogin',  //  检测用户名和密码
    getTypeInfo: ipUrl + 'getTypeInfo',//获取文章类别
    addArticle: ipUrl + 'addArticle',
    updateArticle: ipUrl + 'updateArticle',
    getArticleList: ipUrl + 'getArticleList',//文章列表
    delArticle: ipUrl + 'delArticle/',
    getArticleById: ipUrl + 'getArticleById/',
}
export default servicePath;