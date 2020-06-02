const path = require('path')

const PostcssPresetEnv = require('postcss-preset-env'); 
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {  // path = 以webpack 做相對位置, 反之則以根目錄做相對位置
    
    entry:{
        index: path.resolve(__dirname, '../dev/index.js'),
    },
    
    output: {
        filename: 'dist_index.js',
        path: path.resolve(__dirname, '../dist/')
    },
 
    mode: 'development',
    
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },

            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: [ 
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                ]
            },

            {
                test: /\.css$/,
                include: [
                    // path.resolve(__dirname, '../dev/components'),
                    path.resolve(__dirname, '../dev'),
                ],
                use: [
                    {
                        loader: 'style-loader', options: {

                        }
                    },
                    {
                        loader: 'css-loader', options: { 
                            url: false,
                        }
                    },
                    {
                        loader: 'postcss-loader', options: {
                            ident: 'postcss',
                            plugins: (loader) => [
                                PostcssPresetEnv()
                            ]
                        }
                    },
                    // {
                    //     loader: 'sass-loader' 
                    // }
                ]
            },
        
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader',
                query: {
                    limit: 8192000000000,
                    name: 'image/[name].[ext]',
                }
            },
            
            {
                test: /\.(jpg|jpeg|png|gif|mp3|wav|woff2?)(\?[a-z0-9=&.]+)?$/,
                include: path.resolve(__dirname, '../dev/'),
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                        },
                    },
                ],
            },        

        ],
    },
    
    resolve: { 
        alias: { 
            'vue': 'vue/dist/vue.js' 
        } 
    },
    
    devtool: 'inline-source-map',    
    
    plugins: [
        new VueLoaderPlugin()
    ],



}