# vue3 公共框架

一个vue3 的中后台的各业务模块解耦的架构

feat：
1、多工作空间
2、各业务模块互不干扰，各自开发各自的
3、公用一份架构，架构的升级不影响业务模块

## ✨ 项目结构

> 其中有一些顶层的文件配置在后续中加入（各种 lint），有一些固定的配置文件在这里不说明
> 工作空间拿权限模块 和 审计模块举例

```sh
├── dist # 打包后的文件
├── node_modules # 架构层面的依赖包目录
├── package # 各工作空间（各业务工作空间的目录结构一致，拿权限举例）
│   ├── admin # 业务 -> 权限业务
│   │   ├── assets # 子空间的静态资源文件
│   │   ├── components # 子空间的公共业务组件
│   │   ├── node_modules # 子空间的依赖包目录
│   │   ├── routes # 子空间的路由表
│   │   ├── store # 子空间的状态表
│   │   ├── styles # 子空间的样式文件夹
│   │   ├── views # 子空间的业务文件夹
│   │   ├── index.vue # 子空间的入口文件（这里会挂在子空间路由）
│   │   └── package.json # 子空间的依赖索引（这里的依赖只单针对该工作空间）
│   │   ├── ##
│   │   └── package.json # 子空间的依赖索引（这里的依赖只单针对该工作空间）
└── └──  public # 项目的全局实例（在这里new 各种全局使用，例：new router() new Store()，项目入口文件，vue 实例挂载，全局公共使用的样式引入文件，登录模块，布局模块，配置文件，公共类型····）
├── public # 顶层的静态资源文件包（不进行构建的，例：是否开启权限路由的配置文件，取后台服务的api 地址）
├── typing # 架构层面的公共类型配置
├── package.json # 架构层面公共的依赖包索引（包含工作空间）
├── pnpm-workspace.yaml # 工作空间配置
└── vite.config.ts # 项目配置文件，公用一个服务

```

## 路由说明

全局共用一个路由；
子工作空间中仅需要配置入口文件，以及该工作空间中使用到的路由文件；

## 状态 store 说明

全局使用一份 store，store 只会创建一次，并挂载到实例上；
子工作空间配置该工作空间中使用到的 store；

## 命名空间

各工作空间在开发组件的时候，应该注意组件名称的定义，使得规范；虽然各工作空间不会污染，但是为了区分组件的可读性；

1、建议公共使用的依赖库，安装在架构目录下；
2、建议使用同一版本依赖库；
3、多组件库使得打包完后包体积过大;

:::danger
目前element-plus 在多工作空间中使用不同版本，使用时/构建后 会出现未知问题;

推荐把工作空间中复用的依赖库统一安装！！
:::

特殊场景：多个工作空间使用同一个组件库，但版本不统一情况下，应使用 $nameSpace 进行区别隔离，这种方式不推荐，但是非要使用的话，需要大量的测试保证系统的稳定性；

>注：如果子工作空间和框架上使用同一个组件库，子工作空间中的组件库版本会被框架上的版本覆盖；

## 后续更新（目标）

架构会不间断的更新，但是不会影响到各工作空间；

各子空间的更新互不干扰

>除非各空间中有相互调用的事件更新，子空间调用架构上的事件更新频率会很小

expact：
1、layout 布局架构后续更新 ✨
2、各种lint 加入的更新 （子空间lint 继承架构上的lint）
3、package.json 中会新增一些脚本命令的更新
4、构建打包的一些优化更新
5、配置文件的更新，会新增一些针对型的配置
6、子空间结构化固定，部分入口文件定义好；

## 框架的升级

框架的升级，不影响子工作空间；

## [Why I don't use Prettier](https://antfu.me/posts/why-not-prettier)

## 主题使用说明

styles 下.theme 文件夹用于存放主题文件；
在 html 中类名使用主题名称 和 config/theme 中配置的主题名称需要对应上，否则绑定无法生效；

做主题的时候，需要优先使用 function.scss

```scss
@use 'function.scss' as *;

// 这里推荐定义 sass 变量，为了使用更加便捷;
// add sass var

// 这里可以定义你的主题色，如果已经有了颜色，会进行覆盖，如果没有，就会新增；
html.theme {  
  // do something
}

```

## 功能 list

> ❓：需要商量的部分
> ⭕：在开发的部分
> ✅：已经完成的
> ❌：未完成的或者被pass的方案

✅ - 支持配置文件，配置可选主题 [完成]
    ❌ - [打包的时候把子空间的配置文件不进行编译压缩，使得打包后还可以修改配置]（（pass））
    ✅ - [nodejs获取文件夹，在开发之前把文件内容copy到外部文件中]
    ❌ - [外部文件读取子空间的变量进行存储，这样做后续在现场无法修改；不可取]（pass）

✅ - 个人中心模块
✅ - 自定义配置eslint/prettier/stylelint（讨论结果：全局共用一套lint配置，以站端使用的配置为基础进行扩展）[在最外部的internal/eslint-config中配置]
✅ - 定义全局scss变量的能力（讨论结果：使用styles/variable.scss作为变量定义菜单，并添加特定前缀）[在子空间的styles/variable.scss中定义]
✅ - 应该有一个index.vue和index.ts文件。index.vue文件作为业务模块的入口，功能近于App.vue；index.ts文件作为出口文件，功能近于main.ts（讨论结果：该文件导出一个默认的函数，函数接收app实例作为参数，用于注册vue相关api）[子空间根目录中的index.ts以及index.vue]
✅ - 支持配置文件，配置build.outDir（讨论结果：在业务模块根目录创建build.config.ts文件，添加配置由架子读取）[在基站中的vite.config.ts中读取子空间的配置文件]
✅ - 登录按钮宜加上loading，提升用户体验
✅ - 提供API，读取当前主题 [在meta/store/modules/layout.ts中可读取]
✅ - 提供API，监听与业务模块部分产生视觉交叉的DOM元素的出现与消失，读取DOM或其位置信息
✅ - 提供API，读取用户信息以及token [在meta/store/modules/user.ts中读取]
✅ - 提供API，读取【系统设置 - 消息通知 - 通知弹框、声音提示、闪烁提示】 [在meta/store/modules/config.ts中读取]
✅ - 提供API，读取【系统设置 - 下载设置 - 视频截图路径、视频录像路径】
✅ - 假设我们的系统为A，其他系统为B，支持通过iframe的形式将B嵌入A中 [支持内嵌，但是需要单独的业务模块自定义开发；不在meta基站中去做]
✅ - 假设我们的系统为A，其他系统为B，支持通过iframe的形式将A嵌入B中，并支持：
    - 通过配置token跳过登录
        - 示例：http://172.26.1.242:12000/patrol-station/index.html?token=xxx
    - 通过配置账号和加密后的密码跳过登录，param1为账号，param2为密码
        - 示例：http://172.26.1.242:12000/patrol-station/index.html?param1=test&param2=64VAZI9wyp80QZY6+qyKTw==
    - 可配置是否展示菜单和显示的主题色
        - 示例：http://172.26.1.242:12000/patrol-station/index.html?theme=xxx&showMenu=false
    - 如果不展示菜单应支持配置展示到某页面
        - 示例：http://172.26.1.242:12000/patrol-station/index.html?showMenu=false&pageName=xxx

❌ - 文档系统

## 修复 list

- prettier.config 配置无效 （解决中）
- router根据name去跳转

- // 从其他仓库合并分支到当前仓库分支操作记录，（gitlab 在设置/仓库/保护分支中需要解除分支保护）
- git remote add 'xxx' // 新建远程仓库
- 拉取其他仓库代码 [操作教程，这里多查看本地分支记录，切记不要操作到主分支!!!]
- git remote -v // 显示所有远程仓库

## git 操作俩不同的库合并教程

- git fetch public-frame // 远程获取代码库
- git checkout -b origin/main public-frame/main // 以当前的 xxx 分支为基础创建新的分支
（这里需要创建一个暂存分支，作为存储远程分支）
- git checkout public-frame/main // 切换分支
- git branch // 查看本地分支
- git branch --delete 'xxx' // 删除分支
- git branch dev public-frame/main // 替换分支
- git checkout main // 切换到主分支
- git merge dev --allow-unrelated-histories // 合并分支 （--allow-unrelated-histories：提醒你注意了，这是俩不同的库，要合并了，注意了。）
- git push // 推送
-git remote rm 'xxx' 删除远程仓库

-git checkout -b 'xx' 新增分支

## git 命令 实现 discard 命令

```sh
git reset HEAD -- path/to
git checkout -- path/to
```

- git discard all change 命令

```sh
git clean -dfx
git checkout .
```

### 精简git流程

// 新建主远程仓库
git remote add 'xxx' 'urlxxx'

// 新建备用远程仓库
git remote add 'xxx' 'urlxxx'

// 从远程备用仓库拉取代码到本地备用仓库
git checkout -b dev origin/dev/main

## git 命令 实现 discard 命令

```sh
git reset HEAD -- path/to
git checkout -- path/to
```

- git discard all change 命令

```sh
git clean -dfx
git checkout .
```
