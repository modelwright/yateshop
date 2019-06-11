const path = require('path')

const NODE_ENV = process.env.NODE_ENV || 'development'

module.exports = {
    theme      : {
        'primary-color'       : '#495060',
        'menu-dark-bg'        : '#495060',
        'menu-dark-submenu-bg': '#363e4f',
        'normal-color'        : '#262a30',
        'text-color'          : '#262a30',
        'border-radius-base'  : '2px',
        'border-radius-sm'    : '2px',
        'font-family'         : 'Microsoft YaHei'
    },
    env        : NODE_ENV,
    basePath   : path.resolve(__dirname, '../'),
    srcDir     : path.resolve(__dirname, '../src'),
    outDir     : path.resolve(__dirname, '../dist'),
    publicPath : NODE_ENV === 'development' ? './' : './',
    esLint     : true,
    vendor     : ['vue', 'vue-router', 'vuex'],
    mobile     : true
    // 当 (dll不存在) (vendor被改变) (包的版本被更换) 时，请 npm run dll。
}
