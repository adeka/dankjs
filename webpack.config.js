const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const PATHS = {
    js: path.join(__dirname, 'js'),
};

module.exports = {
    context: PATHS.js,
    entry: __dirname + "/js/main.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    resolve: {
        modules: [ 'node_modules'],
        alias: {
            js: path.resolve( __dirname,  'js'),
            assets: path.resolve( __dirname,  'assets'),
            json: path.resolve( __dirname,  'json'),
            ui: path.resolve( __dirname,  'ui')
        },
        extensions: ['.js', '.jsx', '.scss']
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|otf)$/,
                use: 'file-loader'
            },
            {
                test: /.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["es2017", "react"],
                        plugins: [
                            'transform-decorators-legacy',
                            'transform-object-rest-spread',
                            'syntax-class-properties',
                            'transform-class-properties'
                        ]
                    }
                }
            },
            {
                test: /\.hbs$/,
                use: 'handlebars-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    devServer: {
        host: 'localhost',
        port: '8080',
        hot: true,
        inline: true,
        stats: {
            chunks: false,
            chunkModules: false,
            children: false,
            modules: false,
            warnings: false
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: `${ __dirname }/index.hbs`,
            filename: 'index.html',
            inject: true,
            minify: false,
            showErrors: true
        })
    ]
};
