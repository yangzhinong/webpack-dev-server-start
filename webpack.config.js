var path = require("path");
let glob = require('glob');

var HtmlWebpackPlugin = require("html-webpack-plugin");
//var ClearwebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");

const HtmlLoaderPlugin = require("html-loader");
const AssetsPlugin = require('hash-assets-webpack-plugin');

var plugins = [
  //new ClearwebpackPlugin(["dist"]),
  // new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
  new HtmlWebpackPlugin(),
  HtmlLoaderPlugin,
  // new AssetsPlugin({
  //   filename: 'webpack.asset.json',
  //   path: 'dist',
  //   prettyPrint: true,
  //   keyTemplate: '[name]',
  //   hashLength: 10
  // }),
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery'
  }),
  // new UglifyJSPlugin({sourceMap:true})
];


var jsEntries = {};
//jsEntries= Object.assign({"vendors":["moment","jsrender","lodash"]}, jsEntries);
jsEntries = Object.assign(jsEntries, getEntry('./src/**/*.ts'));


var mode='development'; //'development', 'production'

module.exports = env => {
  return {
    mode: mode,
    entry: jsEntries, //string | object |array
    devtool: 'cheap-module-eval-source-map',
    // externals: {
    //   jquery: 'jQuery',
    //   $: 'jQuery'
    // },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].js"
      // publicPath: 'dist'
    },
    //watch:true,
    module: {
      rules: [{
        test: /\.tsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader!ts-loader"
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: "html-loader?exportAsEs6Default"
      }
      ]
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.html']
    },
    devServer: {
      contentBase: './dist',
      // hot:true
    },
    plugins: plugins
  };
}



function getEntry(globPath) {
  //获取globPath路径下的所有文件
  let files = glob.sync(globPath);
  let entries = {},
    entry, dirname, basename, pathname, extname;
  //循环
  for (let i = 0; i < files.length; i++) {
    entry = files[i];
    dirname = path.dirname(entry);//返回路径的所在的文件夹名称
    extname = path.extname(entry);//返回指定文件名的扩展名称
    /**
     * path.basename(p, [ext])
     * 返回指定的文件名，返回结果可排除[ext]后缀字符串
     * path.basename('/foo/bar/baz/asdf/quux.html', '.html')=>quux
     */
    basename = path.basename(entry, extname);
    pathname = path.join(dirname, basename);//路径合并
    let key = path.relative('./src', pathname).replace(/\\/g, '/');
    //console.log('Test Key :'  + key);
    if (/(\blib\b)|(test)|(template)|(common)|(html)|(mock)/.test(key) === false) {
      entries[key] = entry;
      //console.log("OK key=" + key);
    }
    //console.log(key);

  }
  //返回map=>{fileName:fileUrl}
  return entries;
}