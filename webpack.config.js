const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const Dotenv = require('dotenv');
const webpack = require('webpack');

const envFiles = {
  local: './.env.local',
  test: './.env.test.local',
  production: './.env.production.local'
};

const modeMap = {
  local: 'development',
  test: 'development',
  production: 'development'
};

const currentEnv = process.env.NODE_ENV || 'development';

Dotenv.config({ path: envFiles[currentEnv] });

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'images',
            publicPath: 'images'
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env)
    })
  ],
  devServer: {
    static: path.join(__dirname, 'public'),
    compress: true,
    port: 3000,
    hot: true,
    historyApiFallback: true,
    open: true
  },
  mode: modeMap[currentEnv]
};
