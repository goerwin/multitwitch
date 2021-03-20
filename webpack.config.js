const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const getAbsPath = (pathStr) => path.resolve(__dirname, pathStr);

module.exports = {
  mode: 'production',
  entry: {
    index: getAbsPath('src/index.ts'),
    404: getAbsPath('src/404.ts'),
  },
  output: {
    path: getAbsPath('dist'),
    filename: '[name].bundle.[chunkhash].js',
  },

  devtool: 'source-map',

  devServer: {
    host: '0.0.0.0',
    historyApiFallback: {
      rewrites: [
        { from: /multitwitch\/.*/, to: '/404.html' },
        { from: /./, to: '/index.html' },
      ],
    },
  },

  module: {
    rules: [
      // TYPESCRIPT
      { test: /\.tsx?$/, include: getAbsPath('src'), use: ['ts-loader'] },

      // SCSS
      {
        test: /\.css$/,
        include: getAbsPath('src'),
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['postcss-nested', {}]],
              },
            },
          },
        ],
      },

      // IMAGES
      {
        test: /\.(png|jpg|svg)$/,
        include: getAbsPath('src'),
        use: {
          loader: 'url-loader',
          options: {
            name: '[name].[hash].[ext]',
          },
        },
      },

      // PUG
      {
        test: /\.pug$/,
        include: getAbsPath('src'),
        use: ['pug-loader'],
      },
    ],
  },

  plugins: [
    // contentash is the file's checksum, useful for caching purposes
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: getAbsPath('src/404.pug'),

      chunks: ['404'],
      filename: '404.html',
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: getAbsPath('src/index.pug'),

      chunks: ['index'],
      filename: 'index.html',
    }),
  ],

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],

    // Where to look when using things like "import 'lodash';"
    modules: [getAbsPath('node_modules')],
  },
};
