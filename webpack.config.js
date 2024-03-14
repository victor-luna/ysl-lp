const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const target = process.env.NODE_ENV === 'production' ? 'browserslist' : 'web';
const mode =
  process.env.NODE_ENV === 'production' ? 'production' : 'development';

module.exports = {
  mode,
  entry: {
    bundle: ['./scripts/ysl-lp.js', './styles/ysl-lp.scss'],
  },
  output: {
    path: path.resolve(__dirname),
    filename: 'ysl-lp.js',
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['postcss-preset-env']],
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'ysl-lp.css',
    }),
  ],
  optimization: {
    minimizer: [new TerserPlugin({ extractComments: false })],
  },
  target,
};
