# Rolldown

## setup the project

### 使用 just 管理项目脚本

```bash
pnpm --global add just-install
```

### rustup

- component
  > by chat-gpt
  >
  > 在 rustup 中，component 是构成 Rust 工具链的基本单元，它们包含了 Rust 编程语言的核心工具、库和其他附加功能。通过添加或移除组件，你可以灵活地管理你的 Rust 工具链，根据需要增加或减少特定的功能和工具。

cargo, std 等都是以 component 的形式存在并被 rustup 管理。

遇到类似如下错误信息时（语言基本依赖相关的错误）可以考虑重新安装 components：

```bash
# std 依赖缺失
error: can't find crate for `std` [E0463]
```

```bash
# cargo 依赖缺失
the 'cargo.exe' binary, normally provided by the 'cargo' component, is not applicable to the '1.77.2-x86_64-pc-windows-msvc' toolchain
```

安装命令

```bash
# 重新安装单个 component
rustup component add <component>

# 重新安装 stable 工具链的所有 component
rustup toolchain uninstall stable
rustup toolchain install stable
```

- toolchain
  > by chat-gpt
  >
  > 在 Rust 中，"toolchain"（工具链）是指一组工具和编译器，用于构建、运行和管理 Rust 代码的环境。一个完整的 Rust 工具链通常包括以下几个部分：
  >
  > Rust 编译器（rustc）：Rust 编译器是 Rust 语言的核心组件，它负责将 Rust 代码编译成可执行文件或库。
  > Cargo 包管理器：Cargo 是 Rust 的官方包管理器，它简化了项目的构建、依赖管理和发布流程。Cargo 不仅用于构建 Rust 项目，还提供了一系列方便的命令来管理项目、依赖项和工作空间。
  > 标准库和附加工具：Rust 标准库是 Rust 语言的一部分，提供了一组标准的数据结构、类型和功能。除了标准库之外，工具链还可能包括其他附加的工具和库，如测试框架、格式化工具（rustfmt）、静态分析工具（Clippy）等。
  > 工具链是 Rust 开发者进行编码、构建和测试 Rust 代码所必需的基本组件。Rustup 是 Rust 的官方工具链管理器，它可以帮助开发者在系统上安装和管理不同版本的 Rust 工具链。通过 Rustup，开发者可以轻松地切换不同版本的 Rust 编译器和相关工具，以满足项目的需求或进行实验性的开发。

### NAPI-RS

> https://napi.rs/

NAPI-RS 是一个用于在 Rust 中构建预编译 Node.js 插件的框架。

使用 NAPI-RS 会将我们的 Rust 代码编译为不同平台的二进制文件，然后在我们的 Node 项目的 `package.json` 文件的 `optionalDependencies` 中引用这些二进制文件，然后就可以在我们的 Node 项目中通过 `require` 或 `import` 的方式使用这些 Rust 代码了。

NAPI-RS 会自动生成 `.js` 和 `.d.ts` 的入口文件并根据不同系统导入不同二进制文件，这样我们就可以在 Node 项目中以模块的形式引入 Rust 代码了。

使用案例如下：

lib.rs

```rust
use napi_derive::napi;

#[napi]
fn fibonacci(n:u32) -> u32 {
  match n {
    1|2 => 1,
    _ => fibonacci(n - 1) + fibonacci(n - 2),
  }
}
```

兼容 CommonJS 和 esm，生成 `.d.ts` 文件

```ts
import { fibonacci } from "./index.js";

console.log(fibonacci(5)); // 5
```

### pnpm

#### package.json

```json
{
  "bin": {
    "rolldown": "./bin/cli.js" // 指定命令行入口
  }
}
```

当用户在终端输入 `rolldown` 时，系统会查找这个命令并执行相关的 JavaScript 文件。

```json
{
  "optionalDependencies": {
    // 可选依赖，用于链接不同平台的二进制文件
    "@rolldown/binding-darwin-xxx": "workspace:*"
  }
}
```

可选依赖项安装失败时，不会导致整个安装失败，而是会在安装完成后输出错误信息。

但 npm 并不会处理依赖缺失的情况，在代码中使用可选依赖项时需要自行进行错误处理。

#### Workspace

默认情况下，如果可用包与声明的范围匹配，pnpm 将从工作区链接包。
如：

`bar` 在其依赖项（dependencies）中有 `"foo":"^1.0.0"` 并且 `foo@1.0.0` 在工作区（workspace）中，那么 `bar` 将链接到工作区中的 `foo`。

如果 `bar` 依赖项中有 `"foo":"^2.0.0"`，那么 `bar` 将从注册表安装 `foo@2.0.0`。

pnpm 支持 `workspace` 协议（protocol），如果设置`"foo":"workspace:*"`，则不会从注册表安装 `foo`，如果 `foo` 不在工作区中，将会报错。

如果想要使用不同的别名，可以使用如下语法：`"bar":"workspace:foo@1.0.0"`。
在发布前，别名将转换为常规别名依赖项 `"bar":"npm:foo@1.0.0"`。

> 需要注意的是 `workspace` 匹配的是包名即 `package.json` 中的 `name` 项，而不是路径。
