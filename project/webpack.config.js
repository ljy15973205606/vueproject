const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {
    entry:['./src/js/index.js', './src/index.html'],
    output:{
        filename:'js/built.js',
        path:resolve(__dirname,'build')
    },
    module:{
        rules:[
              {
                  test:/\.css$/,
                  use:[
                    /*  'style-loader', */
                      MiniCssExtractPlugin.loader,
                      'css-loader'
                  ]
              },

              {
                  test:/\.less$/,
                  use:[
                      'style-loader',
                      'css-loader',
                      'less-loader'
                  ]
              },

              {
                  test:/\.(jpg|png|gif)$/,
                  loader:'url-loader',
                 options:{
                     limit: 8 * 1024,
                     name:'[hash:10].[ext]',
                     outputPath:'img',
                     esModule:false
                 },
                
              },

             {
                 test:/\.(eot|svg|woff|woff2|ttf)$/,
                 loader:'file-loader'
             },

             {
                 test:/\.html$/,
                 loader:'html-loader',
                
             },
             
           /*   {
                 exclude:/\.(css|less|html|jpg|png|gif|js)$/,
                 loader:'file-loader',
                 options:{
                     name:'[hash:10].[ext]',
                     outputPath:'media' 
                 },
                
             }, */

             {
                 test:/\.js$/,
                 exclude:/node_modules/,
                 loader:'babel-loader',
                 options:{
                    presets:[
                       [
                        '@babel/preset-env',
                        {
                            useBuiltIns: 'usage',
                            corejs:{
                                    version: 3
                            },
                            targets: {
                                chrome: '60',
                                     ie:'9',
                                    edge:'17'
                            }

                        }
                       ]
                     ]
                 }
             },

             {
                 test:/\.vue$/,
                 loader:'vue-loader'
             }
        ]
    },
    plugins:[
             new HtmlWebpackPlugin({
                 template:'./src/index.html'
             }),
             new MiniCssExtractPlugin({
                 filename:'css/built.css'
             }),
             new VueLoaderPlugin()
    ],
    mode:'development',
    devServer:{
        contentBase:resolve(__dirname,'build'),
        compress:true,
        port:5000,
        open:true,
        hot: true,
        host:'127.0.0.1'
    },
    devtool:'source-map'
}