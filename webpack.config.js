const path = require('path');
const buildWebpackConfig = require('./config/build/buildWebpackConfig');

module.exports = (env) => {
    const paths = {
        entry: path.resolve(__dirname, 'src', 'index.js'),
        build: path.resolve(__dirname, 'build'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        src: path.resolve(__dirname, 'src'),
    };

    const mode = env.mode || 'development';
    const PORT = env.port || 3000;
    const isDev = mode === 'development';

    const apiUrl = env.API_KEY || 'http://localhost:8000';

    const config = buildWebpackConfig({
        mode,
        paths,
        isDev,
        port: PORT,
        apiUrl
    });

    return config;
};