var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
  entry: "./public/entry.js",
  output: {
    path: __dirname,
    filename: "./public/bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: "style!css"
      },
      {
        test: /\.html$/,
        loader: "raw-loader"
      },
      {
        test: /\.less$/,
        /*
        loaders: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'less-loader' }
        ]
        */
        // loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
        loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader!less-loader"
        })
        // loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })

      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },

      {
        test: /masonry-layout/,
        loader: 'imports-loader?define=>false&this=>window'
      }
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: path.resolve("./public/bower/jquery/dist/jquery.min.js"),
    }),
    new ExtractTextPlugin("./public/[name].css")
    // ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })

  ],


  devServer: {
    inline: true
  }
};