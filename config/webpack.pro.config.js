const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WebpackBar           = require('webpackbar')
const CopyWebpackPlugin    = require('copy-webpack-plugin')
const merge                = require('webpack-merge')
const CssNaNo              = require('cssnano')
const PostCssPresetEnv     = require('postcss-preset-env')
const PostcssPxToViewport  = require('postcss-px-to-viewport')
const path                 = require('path')
const base                 = require('./webpack.config')
const {
    basePath,
    srcDir,
    theme
} = require('./project.config')

const production = {
    output: {
        filename: 'js/[name].[chunkhash:5].js'
    },
    mode   : 'production',
    devtool: false,
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
                            PostcssPxToViewport({
                                'viewportWidth': 750,
                                'unitPrecision': 3,
                                'minPixelValue': 1
                            })
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
    optimization: {
        sideEffects: false,
        splitChunks: {
            chunks     :'all',
            minSize    : 30000,
            minChunks  : 1,
            cacheGroups: {
                vendor: {
                    name    : 'vendor',
                    test    : /[\\/]node_modules[\\/]/,
                    chunks  : 'all',
                    priority: -10,
                    enforce : true
                }
            }
        }
    },
    plugins: [
        new WebpackBar({
            minimal: false
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[chunkhash:5].css',
            chunkFilename: "css/[name].[contenthash].css"
        }),
        new CopyWebpackPlugin([{
            from: path.resolve(basePath, 'dll'),
            to  : path.resolve(basePath, 'dist', 'dll')
        }])
    ]
}

module.exports = merge(base, production)
