const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const nodeEnv = process.env.NODE_ENV || 'development'

const isProd = nodeEnv === 'production'

module.exports = {
  optimization: isProd
    ? {
        minimizer: [
          new TerserPlugin({
            parallel: true,
            terserOptions: {
              ecma: 6,
            },
          }),
        ],
      }
    : {},
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      filename: './index.html',
    }),
  ],
  entry: [path.resolve(__dirname, 'src/index.tsx')],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: `bundle${isProd ? `.min` : ''}.js`,
  },
  devServer: {
    contentBase: './dist',
    disableHostCheck: true,
    historyApiFallback: true,
    hot: true,
    port: 8080,
  },
  resolve: {
    alias: {
      reducerTypes: path.resolve(__dirname, 'src/interfaces/redux/reducers/'),
      actionTypes: path.resolve(__dirname, 'src/interfaces/redux/actions/'),
      utilTypes: path.resolve(__dirname, 'src/interfaces/utils'),
      api: path.resolve(__dirname, 'src/api/'),
      consts: path.resolve(__dirname, 'src/consts'),
      components: path.resolve(__dirname, 'src/components/'),
      contextApi: path.resolve(__dirname, 'src/contextApi'),
      customHooks: path.resolve(__dirname, 'src/custom-hooks'),
      helpers: path.resolve(__dirname, 'src/helpers'),
      actions: path.resolve(__dirname, 'src/redux/actions/'),
      reducers: path.resolve(__dirname, 'src/redux/reducers/'),
      selectors: path.resolve(__dirname, 'src/redux/selectors/'),
    },
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
  },
}
