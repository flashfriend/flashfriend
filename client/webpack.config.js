const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['./src/index.tsx'],
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.css', '.scss'],
  },
  output: {
    path: path.join(__dirname, '/public'),
    filename: '[name].bundle.js',
    clean: true,
  },
  devServer: {
    port: 8080,
    static: {
      directory: path.join(__dirname, 'src'),
    },
    proxy: {
      '/graphql': {
        target: 'http://localhost:3000',
        secure: false,
      },
      '/clearCache': {
        target: 'http://localhost:3000',
        secure: false,
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
      {
        test: /\.(js|ts)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader',
          'css-modules-typescript-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(jpg|png)$/,
        use: {
          loader: 'url-loader',
        }
      },
      {
        test:  /\.svg$/,
        use: {
          loader: 'svg-url-loader',
        }
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      cache: false,
    }),
  ],
};
