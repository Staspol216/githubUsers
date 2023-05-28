const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function buildLoaders({isDev}) {
    
    const vueLoader = {
        test: /\.vue$/,
        loader: 'vue-loader',
    };

    const babelLoader = {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: [
                    ['@babel/preset-env', { targets: 'defaults' }]
                ]
            }
        }
    };

    const cssLoaders = {
        test: /\.(sa|sc|c)ss$/,
        use: [
            isDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader, 
            'css-loader',
            'sass-loader',
        ],
    };
    
    return [
        vueLoader,
        babelLoader,
        cssLoaders,
    ];
}

module.exports = buildLoaders;