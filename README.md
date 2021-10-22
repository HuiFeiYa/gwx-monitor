# monitor

收集页面的用户点击行为(点击滚动)、路由跳转、接口请求、报错等信息

## 功能

-   [x] 🔨 路由跳转
-   [x] 🔨 代码报错 console.error()
-   [x] 🔨click、scroll
-   [x] 🔨 接口请求(请求头、请求数据、响应数据)

## 启动

```
bash monitor.sh start
```

## 常见问题

> ESLint: 8.0.1 Error: Failed to load plugin '@typescript-eslint' declared in '.eslintrc.json': Cannot find module 'eslint/use-at-your-own-risk'

执行 `npm run lint` eslint 校验时候 node 版本会导致报错, 可以使用 node 管理器使用指定的 node 版本，`nvm use 12.22.0` ,如果未安装先进行安装 `nvm install v12.22.0`