const webpack = require('webpack');
const path = require('path');
const ROOT_PATH = path.resolve(__dirname);
const autoprefixer = require('autoprefixer');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

require('dotenv').config({path: '.env'});

//console.log(process.env);


module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost/2018/temmeuvoto-novo/app/api/',
                secure: false,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                },
            }
        }
    },
    mode: 'development',
    cache: true,
    profile: true,
    devtool: 'source-map',
    entry: [
        path.resolve(__dirname, '../src/polyfill.js'),
        'react-hot-loader/patch',
        'webpack-hot-middleware/client',
        path.resolve(__dirname, '../src/index.js')
    ],
    output: {
        path: path.resolve(__dirname, 'static/bundle/'),
        filename: 'app.js',
        publicPath: '/static/'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [
            path.resolve(__dirname, '../src/'),
            path.resolve(__dirname, '../node_modules')
        ]
    },
    module: {
        rules: [
            {
                test: /.*\.(gif|png|jpe?g|svg)$/i,
                loaders: [
                    'file-loader?name=[path]_[name].[ext]?[hash]',
                ]
            },

            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ['babel-loader'],
                include: path.join(__dirname, '../src')
            },
            {test: /\.css$/, loader: 'style-loader!css-loader'},
            {
                test: /\.scss$/,
                use: [

                    {
                        loader: "style-loader" // creates style nodes from JS strings
                    },

                    {
                        loader: "css-loader", // translates CSS into CommonJS
                        options: {sourceMap: true}
                    },
                    {
                        loader: require.resolve('postcss-loader'),
                        options: {
                            sourceMap: true,
                            ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
                            plugins: () => [
                                autoprefixer({
                                    browsers: [
                                        '>1%',
                                        'last 4 versions',
                                        'Firefox ESR',
                                        'not ie < 9', // React doesn't support IE8 anyway
                                    ],
                                    flexbox: 'no-2009',
                                }),
                            ],
                        },
                    },
                    {
                        loader: "sass-loader", // compiles Sass to CSS
                        options: {sourceMap: true}
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    {loader: 'css-loader', options: {importLoaders: 1}},
                    'less-loader'
                ]
            }
        ],
    },
    plugins: [
        //new BundleAnalyzerPlugin(),

        new webpack.HotModuleReplacementPlugin(),

        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("development"),
        }),
    ]
}
;
