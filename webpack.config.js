const path = require('path');

module.exports = {
    entry:'./src/index.js',
    mode: 'production',
    devtool: 'inline-source-map',
    output: {
        filename:'main.js',
        path: path.resolve(__dirname,'dist')
    },
    devServer:{
        contentBase: './dist'
    },
    module: {
        rules: [
        /*     {
                test: /\.(html)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                    }
                },],
            }, */
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }, /* {
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'img',
                        publicPath: 'img'
                    }
                }

                ],
            }, */
         /*    {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts',
                        publicPath: 'fonts'
                    }
                },],
            }, */
        ]
    }
}