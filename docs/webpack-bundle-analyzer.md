### 方案一：

1. 先增加依赖

```bash
// npm
$ npm install --save-dev webpack-bundle-analyzer

// or yarn
$ yarn add webpack-bundle-analyzer -D
```

2. 配置文件 `vue.config.js` 增加 `configureWebpack.plugins` 参数

```
const path = require('path')
const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

function resolve (dir) {
  return path.join(__dirname, dir)
}

// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      // 依赖大小分析工具
      new BundleAnalyzerPlugin(),
    ]
  },


  ...
}
```

3. 启动 `cli` 的 `build` 命令进行项目编译，编译完成时，会自动运行一个 http://localhost:8888 的地址，完整显示了支持库依赖

### 方案二（推荐）：

直接运行 `yarn report` 即可。生成的 dist 文件会额外有 `report.html`文件，用浏览器打开可以看到具体分析报告。
