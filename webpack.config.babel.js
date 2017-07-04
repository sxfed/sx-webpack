import webpack from 'webpack';
import path from 'path'
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';
import CompressionPlugin from "compression-webpack-plugin";
import BundleAnalyzerPlugin from 'webpack-bundle-analyzer';
import HtmlWebpackPlugin from 'html-webpack-plugin';
//单入口，多文件，基于路由的代码分割
let plugins = [
    new webpack.BannerPlugin('This file is created by Jerry'),
    new webpack.DefinePlugin({

        'process.env': {
            NODE_ENV: JSON.stringify('production')//实现React切换到产品环境的插件
        },
        //定义全局变量，
        VERSION: JSON.stringify("5fa3b9"),
        DEV: JSON.stringify(process.env.NODE_ENV =='dev' ? 'true': 'false'),
        PRERELEASE: JSON.stringify(process.env.NODE_ENV =='production' ? 'true': 'false')
    }),
    new webpack.LoaderOptionsPlugin({
        ////帮你解决浏览器前缀、IE兼容问题
        options: {
            postcss: function(){
                return [
                    require("autoprefixer")({
                        browsers: ['ie>=8','>1% in CN']
                    })
                ]
            }
        }
    }),
    new BundleAnalyzerPlugin.BundleAnalyzerPlugin({//文件打包分析工具，分析打包后文件引入了哪些文件
        analyzerMode: 'server',
        analyzerHost: '127.0.0.1',
        analyzerPort: 8889,
        reportFilename: 'report.html',
        defaultSizes: 'parsed',
        openAnalyzer: true,
        generateStatsFile: false,
        statsFilename: 'stats.json',
        statsOptions: null,
        logLevel: 'info'
    }),

    new webpack.optimize.CommonsChunkPlugin({
        name:'vendor',
        filename:'[name].[chunkhash:5].js'//抽取代码分割文件的公共部分，减少代码分割引入通用库重复加载浪费
    }),
    new HtmlWebpackPlugin({
        chunks: [ 'main','vendor',],
        filename: 'index.html',
        template: './static/index.html',
        title: 'sx-webpack',
        inject: true,
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true
        },
        // necessary to consistently work with multiple chunks via CommonsChunkPlugin
        chunksSortMode: 'dependency',
    }),
];
if(process.env.NODE_ENV =='production'){
    plugins.push(new UglifyJSPlugin({
        compress:{warnings:false},//代码压缩
    }),)
    plugins.push(new CompressionPlugin({//压缩gzip
        asset: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.(js|html)$/,
        threshold: 10240,
        minRatio: 0.8
    }),)
}
export default {
  entry: {
    main:path.resolve(__dirname, './src/reactApp.jsx'),// 入口文件，所有的页面逻辑起始点
    vendor:['react'],//抽取公共模块react，
  },

  output: {
    path: path.resolve(__dirname, './build'),//打包后放置bundles文件的目标路径
    filename: 'client.bundle.js',//打包文件名称
    chunkFilename: '[name].[chunkhash:5].js',//代码分割每个动态路由对应页面打包js的命名规则
    sourceMapFilename: '[file].map',//sourceMap 是映射文件，映射打包后js与未打包前文件位置对应信息，方便调试代码
    publicPath:'',//公共路径，这是webpack-dev-server服务启动后的访问路径，
  },
  module: {
    rules:[
        //jsx|js Babel转译ES6，JSX和ECMA更新的语法
      {
        test: /\.(jsx|js)?$/,
        exclude:/node_modules/,
        loader: "babel-loader",
        options: {
          "presets": [
            "es2015",
            "stage-0",
            "react"
          ],
          "plugins": [//此插件为了实现antd按需加载样式，
            [
              "import",
              {
                "libraryName": "antd",
                "style": "css",
              }
            ],
            "transform-react-jsx",
            "add-module-exports"
          ]
        },
      },{//处理scss文件从sass-loader到style-loader逐级按顺序处理，开启CSS Module,模块化CSS的引入和导出
        test: /\.(scss|gscss)?$/,
        use: [
          "style-loader", // creates style nodes from JS strings,
          "css-loader?modules&localIdentName=[path][name]---[local]---[hash:base64:5]", // translates CSS into CommonJS
          'postcss-loader',
          "sass-loader", // compiles Sass to CSS
        ],
        include:[
          path.resolve(__dirname,'src'),
        ]
      },
      {//单独处理antd的CSS，它无需CSS模块化处理
        test: /\.css?$/,
        use: [
          "style-loader", // creates style nodes from JS strings,
          'postcss-loader',
          "sass-loader", // compiles Sass to CSS
        ],
        include:[
          path.resolve(__dirname, 'node_modules/antd')
        ]
      },
      {//less语法文件的处理，同sass
        test: /\.less?$/,
        use: [
          "style-loader", // creates style nodes from JS strings,
          "css-loader?modules&localIdentName=[path][name]---[local]---[hash:base64:5]", // translates CSS into CommonJS
          'postcss-loader',
          "less-loader", // compiles Sass to CSS
        ]
      },
      {test: /\.(png|jpg|svg|gif)$/, loader: 'url-loader?limit=25000'},
      {test: /\.(woff|ttf|eot|woff2)$/, loader: 'url-loader?limit=100000'},
      {test: /\.(md|markdown)$/, use: ['html-loader', 'markdown-loader']},
    ],
  },
  resolve: {//配置默认拓展名，省略import引入文件时候添加文件类型后缀，自动匹配
    extensions: [ '.web.js','.js', '.jsx','.scss','css']
  },
  devServer: {
      //webpack-dev-server 配置
    proxy: {
      '/api':{//api转发，配置后台服务地址信息
        target: 'http://172.16.136.70:8080',
        pathRewrite: {"^/api" : ""}
      }
    },
    contentBase: [path.join(__dirname, 'public')],//将项目中static文件夹中文件托管到web-dev-server下
    historyApiFallback: true,//
  },
  plugins: plugins

}

