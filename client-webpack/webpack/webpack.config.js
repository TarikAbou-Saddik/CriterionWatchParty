const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const projectDirectory = path.join(__dirname, '..');

module.exports = {
  entry: {
    popup: path.join(projectDirectory, './src/index.tsx'),
    background: path.join(projectDirectory, './src/app/background.ts'),
    content: path.join(projectDirectory, './src/app/content.tsx'),
  },
  output: {
    path: path.resolve(projectDirectory, './build'),
    filename: 'static/js/[name].js',
    assetModuleFilename: 'static/media/[name][ext]',
    publicPath: '',
    clean: true,
  },
  resolve: {
    extensions: ['.tsx', '.jsx', '.js', '.ts'],
    modules: ['src', 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        use: {
          loader: 'babel-loader',
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(svg|png)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(projectDirectory, './public'),
          to: path.resolve(projectDirectory, './build'),
        },
      ],
    }),
  ],
};
