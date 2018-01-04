const isPro = Object.is(process.env.NODE_ENV, 'production')

module.exports = {
    baseUrl: isPro ? 'http://lagou.itnote.cn/api/' : 'api/'
}
