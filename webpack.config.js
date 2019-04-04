const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

const getAbsPath = pathStr => path.resolve(__dirname, pathStr)

module.exports = {
  mode: 'production',
  entry: {
    404: getAbsPath('src/404.ts')
  },
  output: {
    path: getAbsPath('dist'),
    filename: '[name].bundle.[chunkhash].js',

    // Prefix path for all the relative-url assets required inside the source code.
    // Eg. if you have a .css file that has background-image: url('a.png') <<Nno absolute path>>
    // and your public path is set to http://cdn.example.com, the bundled
    // file will have background-image: url(http://cdn.example.com/a.png).

    // TODO: webpack default is '' but i have to explicitely set it to './'
    // because of a webfonts-loader issue
    // https://github.com/jeerbl/webfonts-loader/issues/28
    publicPath: './'
  },

  devtool: 'source-map',

  module: {
    rules: [
      // TYPESCRIPT
      { test: /\.tsx?$/,
        include: getAbsPath('src'),
        use: ['ts-loader']
      },

      // SCSS
      {
        test: /\.s?css$/,
        include: getAbsPath('src'),
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },

      // IMAGES
      {
        test: /\.(png|jpg|svg)$/,
        include: getAbsPath('src'),
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[hash].[ext]'
          }
        }
      },

      // SVG ICONS
      {
        test: /[\\\/]_fonts[\\\/].*[\\\/]font\.js$/,
        include: getAbsPath('src'),
        use: ExtractTextPlugin.extract({
          use: [
            // NOTE: We disable the url handling here so that css-loader doesn't
            // try to search for the font files inside source font dirs
            { loader: 'css-loader', options: { url: false } },
            'webfonts-loader'
          ]
        }),
      },

      // PUG
      {
        test: /\.pug$/,
        include: getAbsPath('src'),
        use: ['pug-loader']
      }
    ],
  },

  plugins: [
    // contentash is the file's checksum, useful for caching purposes
    new MiniCssExtractPlugin('[name].[contenthash].css'),
    new HtmlWebpackPlugin({
      inject: 'body',
      template: getAbsPath('src/404.pug'),
      inlineSource: '\.(js|css)$',
      filename: '404.html'
    }),
    new HtmlWebpackInlineSourcePlugin()
  ],

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],

    // Where to look when using things like "import 'lodash';"
    modules: [getAbsPath('node_modules')]
  }
};
