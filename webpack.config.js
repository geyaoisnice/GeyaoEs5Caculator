const HtmlWebpackPlugin = require('html-webpack-plugin')

path = require("path")
module.exports = {
    mode: 'development',
    entry: {
        index: path.resolve(__dirname, "./index.js")
    },
    output: {
        path: path.resolve(__dirname + "/dist"),
        filename: 'js/[name].js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: path.resolve(__dirname, "node_modules"),
        },
        {
            test: /\.css$/,
            use: [
                'style_loader',
                'css_loader'
            ]
        },
        {
            test: /\.scss$/,
            use: [
                {
                    loader: "style-loader" // 将 JS 字符串生成为 style 节点
                }, {
                    loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
                }, {
                    loader: "sass-loader" // 将 Sass 编译成 CSS
                }
            ]
        },
        {
            test: /\.tpl$/,
            use: [
                {
                    loader: 'ejs-loader',
                    options: {
                        esModule: false,
                        variable: 'data',
                    },
                },
            ],
        }
        ]

    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, "./index.html"),
            chunks: ['index'],
            excludeChunks: ['node_modules']
        })
    ],
    devServer: {
        open: true,
        host: "localhost",
        port: "3002"
    }
}