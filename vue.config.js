const webpack = require('webpack');

// options: https://github.com/vuejs/vue-cli/blob/dev/docs/config.md
module.exports = {
    // default baseUrl of '/' won't resolve properly when app js is being served from non-root location
    outputDir: 'dist',
    configureWebpack: {
        plugins: [
            new webpack.DefinePlugin({
                // allow access to process.env from within the vue app
                'process.env': {
                    NODE_ENV: JSON.stringify(process.env.NODE_ENV)
                }
            })
        ]
    }
};