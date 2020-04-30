
module.exports = {
    publicPath: '/',
    outputDir: './server/public/',
    pages: {
        index: {
            // 应用入口配置，相当于单页面应用的main.js，必需项
            entry: './src/pages/index/index.js',
            // 应用的模版，相当于单页面应用的public/index.html，可选项，省略时默认与模块名一致
            template: './src/pages/sign/sign.html',
            // 编译后在dist目录的输出文件名，可选项，省略时默认与模块名一致
            // filename: 'index.html',
            // 当使用 title 选项时，template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: 'ciki',
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            // chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
        sign: {
            entry: './src/pages/sign/sign.js',
            template: './src/pages/sign/sign.html',
            title: 'ciki',
            // chunks: ['chunk-vendors', 'chunk-common', 'sign']
        },
    },
    devServer: {
        port: 5566,
    },
    chainWebpack: (config) => {
        config.module.rule('worker')
            .test(/\.worker\.js$/i)
            .use('worker-loader')
            .loader('worker-loader')
            .options({
                inline: true
            });
    },
    css: {
        loaderOptions: {
            scss: {
                prependData: `@import "@/assets/style/variable.scss";`
            },
        }
    },
}