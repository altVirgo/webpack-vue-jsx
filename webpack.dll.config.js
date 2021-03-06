const webpack = require('webpack')
const library = '[name]_lib'
const path = require('path')

module.exports = {
    entry: {
        vendors: [
            'vue/dist/vue.js',
            'vue-router',
            'element-ui',
            'jquery'
        ]
    },
    output: {
        filename: '[name].dll.js',
        path: path.join(__dirname, './static/dll'),
        library: '[name]_[hash]'
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, './static/dll/[name]-manifest.json'),
            // This must match the output.library option above
            name: '[name]_[hash]',
            context: __dirname
        })
    ]
}