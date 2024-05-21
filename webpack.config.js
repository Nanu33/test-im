const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const { dependencies } = require("./package.json");
const webpack = require('webpack');
const path = require('path');
const Dotenv = require("dotenv-webpack");
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { GenerateSW } = require('workbox-webpack-plugin');


module.exports = {
  entry: "./src/index",
  mode: "development",
  devServer :{
    port: 3000,
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, "public"),
    },
  },
  output: {
    filename: '[name].bundle.js', 
    path: path.resolve(__dirname, 'build'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-react", "@babel/preset-env",],
              plugins: ["@babel/plugin-transform-runtime"]
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif|pdf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name][hash].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader',
        ],
      },
      { test: /\.xlsx$/, loader: "webpack-xlsx-loader" },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(sa|sc)ss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
              importLoaders: 1,
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "Host",
      remotes: {
        // Remote: `Remote@https://gva-ui.intainva.intainabs.com/moduleEntry.js`,
        Remote: `Remote@http://localhost:4000/moduleEntry.js`,
    },
  
      shared: {  
        ...dependencies,
        react: {
          singleton: true,
          requiredVersion: dependencies["react"],
        },
        "react-dom": {
          singleton: true,
          requiredVersion: dependencies["react-dom"],
        },
      }
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "./index.html",
      favicon: "./public/favicon.ico",

      minify: { // Minify HTML for production
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    }),
    new WebpackManifestPlugin(),
    new Dotenv(),
    // new GenerateSW({
    //   // Workbox GenerateSW plugin configuration
    //   clientsClaim: true,
    //   skipWaiting: true,
    //   maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
    // }),
  ],
  resolve: {
    extensions: [".js", ".jsx", ".scss", ".css"],
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
    },
  },
  optimization: { // Add optimization settings
   
    minimize: true, // Minimize JavaScript
    minimizer: [
      new TerserPlugin({}), // You may need to install terser-webpack-plugin
      new CssMinimizerPlugin(), // You may need to install css-minimizer-webpack-plugin
    ],
    splitChunks: {
      chunks: 'all',
    },
  },
  target: "web",
};
