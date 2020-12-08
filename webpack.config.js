const path = require('path');
// const HandlebarsPlugin = require('handlebars-webpack-plugin');
// const HtmlWebpackRootPlugin = require('html-webpack-root-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    resolve: {
        fallback: {
            fs: false,
            assert: false
        }
    },
    devServer: {
        contentBase: './dist',
        hot: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Трава у дома',
            template: 'template.html'
        })
        // new HandlebarsPlugin({
        //     // path to hbs entry file(s). Also supports nested directories if write path.join(process.cwd(), "app", "src", "**", "*.hbs"),
        //     entry: path.join(process.cwd(), 'app', 'src', '*.hbs'),
        //     // output path and filename(s). This should lie within the webpacks output-folder
        //     // if ommited, the input filepath stripped of its extension will be used
        //     output: path.join(process.cwd(), 'build', '[name].html'),
        //     // add it as filepath to rebuild data on change using webpack-dev-server
        //     data: path.join(__dirname, 'app/data/project.json'),
        //     // globbed path to partials, where folder/filename is unique
        //     partials: [
        //         path.join(process.cwd(), 'app', 'src', 'components', '*', '*.hbs')
        //     ],
        //     // register custom helpers. May be either a function or a glob-pattern
        //     helpers: {
        //         nameOfHbsHelper: Function.prototype,
        //         projectHelpers: path.join(process.cwd(), 'app', 'helpers', '*.helper.js')
        //     },
        //     // hooks
        //     // getTargetFilepath: function (filepath, outputTemplate) {},
        //     // getPartialId: function (filePath) {}
        //     onBeforeSetup: function (Handlebars) {},
        //     onBeforeAddPartials: function (Handlebars, partialsMap) {},
        //     onBeforeCompile: function (Handlebars, templateContent) {},
        //     onBeforeRender: function (Handlebars, data, filename) {},
        //     onBeforeSave: function (Handlebars, resultHtml, filename) {},
        //     onDone: function (Handlebars, filename) {}
        // })

    ],
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-runtime']
                    }
                }
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.svg$/,
                loader: 'url-loader',
                options: {
                    mimetype: 'image/svg+xml'
                }
            },
            {
                test: /\.(woff2?|jpg|png|ico|webp|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader'
            },
            {
                test: /\.(handlebars|hbs)$/,
                loader: 'handlebars-loader',
                exclude: /(node_modules)/
            }
        ]
    }
};
