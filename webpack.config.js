const path = require('path');
const webpack = require('webpack');
const htmlPlugin = require('html-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');
const extractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
  //入口文件的配置项
  entry:{
    home:'./src/js/main.js',
    jquery:'./src/js/jquery.js'
  },
  //出口文件的配置项
  output:{
    path:path.resolve(__dirname,'dist'),
    publicPath:'/',
    // filename:'[name]-[hash:5].js'
    filename:'js/[name].js'
  },
  //模块：例如解读CSS,图片如何转换，压缩
  module: {
    rules: [
      {
        test: /\.css$/,
        use: extractTextPlugin.extract(
          {
            fallback:'style-loader',
            use:[
              {
                loader:"css-loader",
                options:{
                  importLoaders:1
                }
              },
              'postcss-loader'
            ]
          }
        )
      }
    ]
  },
  //插件，用于生产模版和各项功能
  plugins:[
    // new webpack.ProvidePlugin({
    //   $:'jquery'
    // }),
    new htmlPlugin({
        minify:{
          removeAttributeQuotes:true,
          removeComments:true,  //移除HTML中的注释
          collapseWhitespace:true  ////删除空白符与换行符
        },
        hash:true,
        template:'./src/index.html'
    }),
    //抽出css文件
    new extractTextPlugin('css/[name].css'),
    //拷贝静态资源
    new copyWebpackPlugin([{
        from:__dirname+'/src/public',//打包的静态资源目录地址
        to:'./public' //打包到dist下面的public
    }]),
    //抽离公告库
    new webpack.optimize.CommonsChunkPlugin({
      name:['jquery'],  //对应入口文件的jquery(单独抽离)
      filename:'js/[name].js',  //抽离到哪里
      minChunks:2   //抽离几个文件
    }),
    //压缩js
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        warnings:false
      }
    }),
    new webpack.BannerPlugin("blue版权所有")
  ],
  //配置webpack开发服务功能
  devServer:{
    contentBase:path.resolve(__dirname,'dist'),
    host:'localhost',
    compress:true,
    port:8089
  },
  //自动打包webpack --watch
  watchOptions:{
    poll:1000, //检测修改的时间（ms）
    aggregateTimeout:500, //防止重复按钮
    ignored:/node_modules/  //不监测
  }
}