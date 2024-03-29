const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry:'./src/main.js',
    mode: 'production',
    //devtool: 'inline-source-map',
    output: {
        library: 'openlayers-component',
        libraryTarget: 'umd',
        filename:'main.js',
        path: path.resolve(__dirname,'dist')
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
      },
    devServer:{
        contentBase: './dist',
        watchContentBase: true,
        hot:true,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
        ]
    }
}