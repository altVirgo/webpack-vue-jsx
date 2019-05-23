const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 这个插件的作用是依据一个简单的index.html模板，生成一个自动引用你打包后的JS文件的新index.html
const CopyWebpackPlugin = require('copy-webpack-plugin'); // 将单个文件或整个目录复制到构建目录
const CompressionWebpackPlugin = require('compression-webpack-plugin');  // 提供带 Content-Encoding 编码的压缩版的资源
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin'); // 将使用到的css文件打包至指定文件下，并压缩
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); // 压缩js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; // 可视化分析报告
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 打包前清除目标目录
const PurifycssWebpack = require('purifycss-webpack'); // 消除冗余的css，一个不剩，哎
const glob = require('glob'); // 匹配路径的模块
var fs = require('fs');
var gracefulFs = require('graceful-fs');
gracefulFs.gracefulify(fs);

module.exports = {
    mode: 'development',
    entry: __dirname + '/src/main.js',
    output: {
        path: __dirname + '/dist',
        filename: 'js/bundle.[name].js',
        chunkFilename: 'js/[id].[chunkhash].js'
    },
    // devtool: 'eval-source-map',
    devServer: {
        contentBase: './dist',
        historyApiFallback: true,
        inline: true,
        hot: true
    },
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.js',  // 如果在vue被分离打包到dll文件夹中，路径应与webpack.dll.config.js中的entry.vendors的值保持一致，否则仍然会被打包进bundle中
            '@src': path.resolve(__dirname, 'src'),
            '@node_modules': path.resolve(__dirname, 'node_modules'),
            '@component': path.resolve(__dirname, 'src/app/components'),
            '@static': path.resolve(__dirname, 'static')
        }
    },
    // externals:防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖
    // 使用dll时,有包冲突时，dll文件里的包会失效，import的包仍然会被打进bundle中
    externals: {
        // 'vue': 'Vue',
        // 'vue-router': 'VueRouter',
        // 'element-ui': 'ELEMENT',
        'axios': 'axios',
        // 'jquery': 'window.jQuery'
    },
    module: {
        rules: [
            {
                test: /\.(js|vue|jsx)$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    formatter: require('eslint-friendly-formatter')
                },
                enforce: 'pre'
            },
            {
                test: /(\.jsx|\.js)$/,
                loader: 'babel-loader',
                exclude: /(node_modules|bower_components)/
            },
            {
                test: /\.css$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            modules: true, // 指定启用css modules
                            localIdentName: '[name]__[local]--[hash:base64:5]' // 指定css的类名格式
                        }
                    }]
                })
                // use:  [
                //     {
                //         loader: 'style-loader'
                //     },
                //     {
                //         loader: 'css-loader',
                //         options: {
                //             modules: true, // 指定启用css modules
                //             localIdentName: '[name]__[local]--[hash:base64:5]' // 指定css的类名格式
                //         }
                //     }
                // ]
            },
            {
                test: /\.less$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            modules: true, // 指定启用css modules
                            localIdentName: '[name]__[local]--[hash:base64:5]' // 指定css的类名格式
                        }
                    }, {
                        loader: 'less-loader',
                        options: {
                            modules: true, // 指定启用css modules
                            localIdentName: '[name]__[local]--[hash:base64:5]' // 指定css的类名格式 ，只针对最外层的选择器
                        }
                    }]
                })
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'img/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'media/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'fonts/[name].[hash:7].[ext]'
                }
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: 'commons',   // 就是生成的共享模块bundle的名字
                    chunks: 'initial', // 'async','all'
                    minChunks: 2   // 有共享模块的chunks的最小数目  （也适用于css）
                }
            }
        }
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, 'static'),
            to: 'static',
            ignore: ['.*']
        }]),
        // new CompressionWebpackPlugin({
        //     // asset: '[path].gz[query]',
        //     algorithm: 'gzip',
        //     test: new RegExp(
        //         '\\.(' +
        //         ['js', 'css'].join('|') +
        //         ')$'
        //     ),
        //     threshold: 10240,
        //     minRatio: 0.8
        // }),

        // DLLPlugin(在webpack.dll.config.js中使用) 和 DLLReferencePlugin 配合实现了拆分 bundles，同时还大大提升了构建的速度
        // DllReferencePlugin插件把只有 dll 的 bundle(们)(dll-only-bundle(s)) 引用到需要的预编译的依赖。
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./static/dll/vendors-manifest.json')
        }),
        new BundleAnalyzerPlugin(),
        new UglifyJsPlugin({
            uglifyOptions: {
                compress: {
                    warnings: false
                }
            },
            sourceMap: false,
            parallel: false
        }),
        new HtmlWebpackPlugin({
            // new 一个这个插件的实例，并传入相关的参数
            template: __dirname + '/src/index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextWebpackPlugin({
            filename: 'css/[name].[hash].css',
            allChunks: true     // 会引起报错
        })// 指定css文件路径，并在index.html中插入引入css的地址
        // new PurifycssWebpack({
        //     paths: glob.sync(path.resolve('src/*.html'))// 匹配所有的src下的html文件，删除多余的样式
        // }),

        // new webpack.optimize.splitChunks({
        //     name: '[id].js',
        //     minChunks(module) {
        //         // any required modules inside node_modules are extracted to vendor
        //         return (
        //             module.resource &&
        //             /\.js$/.test(module.resource) &&
        //             module.resource.indexOf(
        //                 path.join(__dirname, '../node_modules')
        //             ) === 0
        //         )
        //     }
        // }),
        // new webpack.ProvidePlugin({ // 下载Jquery库
        //     $: 'jquery',
        //     jQuery: 'jquery',
        //     'window.jQuery': 'jquery'
        // })
    ]
}