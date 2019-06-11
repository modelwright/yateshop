const webpack              = require('webpack')
const merge                = require('webpack-merge')
const path                 = require('path')
const base                 = require('./webpack.config')
const PostcssPxToViewport  = require('postcss-px-to-viewport')
// use : [{
//     loader: 'style-loader/url'
// }, { 
//     loader: "file-loader" 
// }, {
//     loader : 'postcss-loader',
//     options: {
//         plugins: [
//             mobile ? PostcssPxToViewport({
//                 'viewportWidth': 750,
//                 'unitPrecision': 3,
//                 'minPixelValue': 1
//             }) : ''
//         ]
//     }
// }, {
//     loader : 'less-loader',
//     options: {
//         javascriptEnabled: true,
//         paths: [srcDir],
//         // plugins: [ new LessFunc() ],
//         modifyVars: theme
//     }
// },{
//     loader: 'style-resources-loader',
//     options: {
//         patterns: path.resolve(basePath, 'src/assets/styles/base.less')
//     }
// }]
const {
    srcDir,
    theme,
    basePath,
    mobile
} = require('./project.config')

const development = {
    entry: {
        main: ['webpack-hot-middleware/client?path=./__webpack_hmr']
    },
    mode   : 'development',
    devtool: 'cheap-module-eval-source-map',
    module : {
        rules: [
            {
                test: /(\.css)$/,
                use : [{
                    loader: 'style-loader'
                }, {
                    loader: 'vue-style-loader'
                }, {
                    loader: 'css-loader'
                }]
            },{
                test: /(\.less)$/,
                use : [{
                    loader: 'style-loader'
                }, {
                    loader: 'vue-style-loader'
                }, {
                    loader: 'css-loader'
                }, {
                    loader : 'postcss-loader',
                    options: {
                        plugins: [
                            mobile ? PostcssPxToViewport({
                                'viewportWidth': 750,
                                'unitPrecision': 3,
                                'minPixelValue': 1
                            }) : ''
                        ]
                    }
                }, {
                    loader : 'less-loader',
                    options: {
                        javascriptEnabled: true,
                        paths: [srcDir],
                        // plugins: [ new LessFunc() ],
                        modifyVars: theme
                    }
                },{
                    loader: 'style-resources-loader',
                    options: {
                        preProcessor: 'less',
                        patterns: path.resolve(basePath, 'src/assets/styles/mixin.less')
                    }
                }],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
}

module.exports = merge(base, development)
