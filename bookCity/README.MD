#项目介绍

## 项目结构
```
.
├── Readme.md                   // help                    
├── config                      // 配置
│   ├── config.js               // 唯一可以配置的地方
│   ├── gulp.dev.js            // gulp本地开发
│   ├── gulp.build.js           // gulp线上打包
│   ├── httpMethod.js           // gulp接口数据处理
├── mock    
│   ├── data.js                 //mock的数据文件
│   ├── index.js                //mock的接口文件
├── src    
│   ├── page                    // html页面
│       ├── index.html          //首页
│   ├── css                     // css文件
│   ├── sass                    // sass文件
│   ├── js                      // js文件
│       ├── libs
│           ├── handlebars
│               ├── hdbexpress.js  //handlebar自定义表达式
│               ├── render.js  //handlebar渲染函数
│       ├── index 
│           ├── index.js
│   ├── static                  // 静态文件夹               
├── .editorconfig
├── .gitignore
├── gulpfile.js                  //gulp环境整合入口
├── package.json
.
```