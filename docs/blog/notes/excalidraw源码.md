# excalidraw 源码

## 项目配置

### eslint

```js
const { CLIEngine } = require("eslint");

// see https://github.com/okonet/lint-staged#how-can-i-ignore-files-from-eslintignore-
// for explanation
const cli = new CLIEngine({});

module.exports = {
  "*.{js,ts,tsx}": (files) => {
    return (
      "eslint --max-warnings=0 --fix " + // 限制警告数量
      files.filter((file) => !cli.isPathIgnored(file)).join(" ")
    );
  },
  "*.{css,scss,json,md,html,yml}": ["prettier --write"],
};
```

### .npmrc

```yml
save-exact=true # 保存精确版本
legacy-peer-deps=true # 手动解决 peerDependencies
```

**legacy-peer-deps=true**

这个配置项用于启用 npm 7 之前的旧式对等依赖（peer dependency）解析规则。在 npm 7 中，对等依赖的解析规则有所改变，npm 会尝试自动解决对等依赖的版本冲突，而不再像之前那样强制用户手动处理。

### .nvmrc

```yml
18
```

控制 Node.js 版本

### package.json

```json
{
  //...
  "scripts": {
    "start": "yarn --cwd ./excalidraw-app start"
    //...
  }
  //...
}
```

`--cwd` 指定了执行命令时的工作目录，用于 monorepo 在根目录下执行子项目的命令。

### vite.config.ts

```js
{
  envDir: "../"; // 指定环境变量文件的目录，用于 monorepo
  plugins: [
    // 创建 html 插件 https://github.com/vbenjs/vite-plugin-html/blob/main/README.zh_CN.md
    createHtmlPlugin({
      minify: true, // 压缩 html
    }),
  ];
}
```

## 编码实践

### api

#### Math.trunc

`Math.trunc()` 方法会将数字的小数部分去掉，只保留整数部分。

#### Element.prototype.replaceChildren

`Element.prototype.replaceChildren()` 方法用指定的节点替换当前节点的所有子节点。

#### window.top & window.self

`window.top` 返回最顶层的窗口对象，`window.self` 返回当前窗口对象。可用来判断当前页面是否在 iframe 中。

```js
export const getFrame = () => {
  try {
    return window.self === window.top ? "top" : "iframe";
  } catch (error) {
    return "iframe";
  }
};
```
