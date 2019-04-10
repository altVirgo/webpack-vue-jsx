const webpack = require('webpack')
const library = '[name]_lib'
const path = require('path')

module.exports = {
    entry: {
        vendors: [
            'vue',
            'vue-router',
            'element-ui',
            'jquery'
        ]
    },

    output: {
        filename: '[name].dll.js',
        path: path.join(__dirname, 'dist/js'),
        library: '[name]_[hash]'
    },

    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, 'dist/js/[name]-manifest.json'),
            // This must match the output.library option above
            name: '[name]_[hash]',
            context: __dirname
        })
    ]
}