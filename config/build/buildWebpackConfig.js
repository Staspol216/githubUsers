const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const buildLoaders = require('./buildLoaders');

function buildWebpackConfig(options) {
    const { paths, mode, isDev } = options;

    const devServer = {
        static: './build',
        open: true,
        hot: true,
    };

    const plugins = [
        new HtmlWebpackPlugin({
            template: paths.html,
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
        }),
        new VueLoaderPlugin(),
    ];

    return {
        mode,
        entry: paths.entry,
        output: {
            filename: '[name].[contenthash].js',
            path: paths.build,
            clean: true,
        },
        module: {
            rules: buildLoaders(options),
        },
        plugins,
        resolve: {
            extensions: ['.js', '.vue', '.json'],
            alias: {
                '@': paths.src,
            },
        }, 
        optimization: isDev ? undefined : {
            minimize: true,
            minimizer: [
                new CssMinimizerPlugin(),
                '...',
            ],
        },
        devtool: isDev ? 'inline-source-map' : 'eval',
        devServer: isDev ? devServer : undefined,
    };
}

module.exports = buildWebpackConfig;