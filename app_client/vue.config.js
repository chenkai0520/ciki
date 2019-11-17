module.exports = {
    publicPath: '/',
    outputDir: './server/public/',
    pages: {
        index: {
            // 应用入口配置，相当于单页面应用的main.js，必需项
            entry: 'src/pages/index/index.js',

            // 应用的模版，相当于单页面应用的public/index.html，可选项，省略时默认与模块名一致
            template: 'src/pages/sign/index.html',

            // 编译后在dist目录的输出文件名，可选项，省略时默认与模块名一致
            filename: 'index.html',

            // 标题，可选项，一般情况不使用，通常是在路由切换时设置title
            // 需要注意的是使用title属性template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            // title: 'console page',

            // 包含的模块，可选项
            // chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
        sign: {
            // 应用入口配置，相当于单页面应用的main.js，必需项
            entry: 'src/pages/sign/sign.js',

            // 应用的模版，相当于单页面应用的public/index.html，可选项，省略时默认与模块名一致
            template: 'src/pages/sign/sign.html',

            // 编译后在dist目录的输出文件名，可选项，省略时默认与模块名一致
            filename: 'sign.html',

            // 标题，可选项，一般情况不使用，通常是在路由切换时设置title
            // 需要注意的是使用title属性template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            // title: 'console page',

            // 包含的模块，可选项
            // chunks: ['chunk-vendors', 'chunk-common', 'sign']
        },
        // 只有entry属性时，直接用字符串表示模块入口
        // client: 'src/modules/client/client.js'
    },
    devServer: {
        port: 5566,
    },
    chainWebpack: (config) => {
        config.module.rule('worker')
            .test(/\.worker\.js$/i)
            .use('worker-loader')
            .loader('worker-loader');
    },
}