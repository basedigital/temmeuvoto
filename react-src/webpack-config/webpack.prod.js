const webpack = require('webpack');
const path = require('path');
const ROOT_PATH = path.resolve(__dirname);
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    mode:'production',
    devtool: 'cheap-module-source-map',
    entry: [
        path.resolve(__dirname, '../src/polyfill.js'),
        path.resolve(__dirname, '../src/index.js')
    ],
    output: {
        path: path.resolve(__dirname, '../../app/bundle/'),
        filename: 'app.js',
        publicPath: 'bundle/', //http://webpack.github.io/docs/configuration.html#output-publicpath
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
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ['babel-loader'],
                include: path.join(__dirname, '../src')
            },
            {
                test: /.*\.(gif|png|jpe?g|svg)$/i,
                loaders: [
                    'file-loader?name=[path][name].[ext]?[hash]',
                    {
                        loader: 'image-webpack-loader',
                        query: {
                            mozjpeg: {
                                progressive: true,
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            optipng: {
                                optimizationLevel: 4,
                            },
                            pngquant: {
                                quality: '80-90',
                                speed: 3,
                            },
                        }
                    }
                ]
            },

            {test: /\.css$/, loader: 'style-loader!css-loader'},
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    //resolve-url-loader may be chained before sass-loader if necessary
                    use: [
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
                    ],
                    publicPath:''

                })
            },
            {
                test: /\.(woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: 'fonts/[hash].[ext]',
                        limit: 5000,
                        mimetype: 'application/font-woff'
                    }
                }
            }, {
                test: /\.(ttf|eot|svg)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'fonts/[hash].[ext]'
                    }
                }
            }
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV":JSON.stringify("production"),
        }),

        //new BundleAnalyzerPlugin(),

        new ExtractTextPlugin({filename: "styles.css", disable: false, allChunks: true}),

        new webpack.optimize.OccurrenceOrderPlugin(),

        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ],
};