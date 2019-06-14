const proxy = {
    '/yt1.0': {
        target: 'http://test.deepinfo.cn:81',
        secure: false,
        changeOrigin: true
    },
    '/yt2.0' : {
        target: 'http://test.deepinfo.cn:81',
        secure: false,
        changeOrigin: true
    }
}
console.log("express代理地址:"+"http://test.deepinfo.cn")
module.exports = proxy
