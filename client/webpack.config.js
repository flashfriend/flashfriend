const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: ['./src/index.tsx'],
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.css', '.scss'],
  },
  output: {
    path: path.join(__dirname, '/public'),
    filename: '[name].bundle.js',
    clean: true,
    publicPath: '/',
  },
  devServer: {
    port: 8080,
    static: {
      directory: path.join(__dirname, 'src'),
      publicPath: '/',
    },
    historyApiFallback: true,
    proxy: {
      '/login': 'http://localhost:3000/',
      '/auth/': 'http://localhost:3000/',
      '/api/': 'http://localhost:3000/'
    }
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
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env"
                  ],
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.(jpg|png)$/,
        use: {
          loader: 'file-loader',
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
    new MiniCssExtractPlugin({
      filename: "index.css",
      chunkFilename: "index.css"
    }),
  ],
};
