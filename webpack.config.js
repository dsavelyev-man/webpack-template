const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const config = require("dotenv").config();
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: process.env.MODE,
  entry: {
    main: path.join(__dirname, "/src/index.js")
  },
  output: {
    path: path.join(__dirname, "/public"),
    filename: "bundle.js"
  },
  devServer: {
    port: 4000,
    hot: true,
    open: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template:__dirname + "/src/index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "bundle.css"
    }),
    new webpack.DefinePlugin({
      MODE: JSON.stringify(process.env.MODE),
    })
  ],
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ]
      },
      {
        test: /\.css/,
        use: [
          "style-loader",
          "css-loader"
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      },
      {
        test: /\.svg/,
        use: ["@svgr/webpack"]
      }
    ]
  }
}
