<h1 align="center">Antd-Vue2-Admin</h1>
<div align="center">
一个基于 <a href="https://1x.antdv.com/docs/vue/introduce-cn/" target="_blank">Ant Design of Vue</a> 和vue2的中后台应用快速开发工程模板。
</div>

## 简介

本项目基于[ant-design-vue-pro](https://github.com/vueComponent/ant-design-vue-pro)，删减了冗余代码和多余插件，增加一些常用功能及函数。对 vue2 及 ant-design-vue 熟悉的前端开发者可使用本模板快速进行中后台应用的开发。

**vue3 版本**开发规划中：一个基于 vue3，vite4 和 ant-design-vue4 的中后台开发模板——[antd-vue3-admin](https://github.com/Zuojiangtao/antd-vue3-admin)。

## 环境及依赖

- node: 14
- yarn
- webpack: 5
- eslint
- prettier
- @vue/cli

## 新增功能及优化

### 1. 多页签及 keepAlive

- 多页签：在 `src/config/defaultSetting.js` 将 multiTab 改为 true 即可;
- 页签缓存：将多次打开的页签及当前激活页面存储在浏览器，刷新页面还原之前的浏览记录；
- keepAlive: 多页签和 keepAlive 配合使用，将页签打开的页面缓存

### 2. 权限管理优化

- 针对权限系统做出补充及优化，增加颗粒度更细的控制及企业级应用的完善，如 403、404 函数判断。相关文件： `src/permission.js`
- 权限管理(开发中)

### 3. 无感刷新 token

- 对有刷新 token 的业务，提供无感刷新功能，相关文件： `utils/request.js`。此功能需要后端采用**token + 刷新 token**机制。

### 4. 公共组件

- 封装面包屑导航组件，相关文件： `components/Breadcrumb`
- 封装公共 svg 组件，相关文件： `components/SvgIcon`

### 5. CI\CD

- 新增持续集成相关文件，相关文件: `Jenkinsfile, Dockerfile, deploy/`。

### 6. 常用组件混入文件

- 新增表单、表格、图表常用逻辑，相关文件： `mixins/`

### 7. 其他

- 首页面板 demo，相关文件：`views/dashboard`, `core/echarts`, `assets/iconfont/`, `utils/dataCheck.js`
- Git hooks：husky、@commitlint/cli、@commitlint/config-conventional、pretty-quick,相关文件: `commitlint.config.js`, `.husky/`
- 其他相关功能见 `docs/` 下文档。

## Project setup

### Clone repo

```bash
git clone --depth=1 https://github.com/Zuojiangtao/antd-vue2-admin.git my-project
cd my-project
```

### Install dependencies

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
