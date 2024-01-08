# 前端编码范式的最佳实践

## 基本思想（道）

广大程序员们在长久的编程实践中，总结出了一系列编写高质量、可维护代码共通原则，每个程序员都受益于学习、理解这些原则。

此处列出在我的编程实践中最重要一条原则，我从中受益良多。

### 1. 单一职责（Single Responsibility Principle）

在面向对象编程范式中该原则被阐述为“类或模块应该有且只有一条加以修改的理由”

在[函数式编程范式](https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/)中该原则被阐述为“一个函数应该有且只有一个目的”

这条原则及其思想（分治）再怎么强调都不为过，我视之为编程原则中的二八定律，理解、做好这一条可以解决编程过程中 80% 的问题（保守的说）。

毫不夸张的说，由此原则延伸出的一系列设计模式、架构设计（MVC、控制反转、依赖注入、发布订阅...）构成了现代编程框架的基石。

### 2. 其他

下面这些链接值得反复地阅读，每隔一段时间再次阅读这些原则时都会有更加深刻的理解。

[编程原则](https://github.com/webpro/programming-principles)

[编程原则（中文版）](https://mouse0w0.github.io/2018/10/04/Programming-Principles/)

[关于 UNIX 的哲理名言](https://www.cnblogs.com/memory4young/p/unix-rules.html)

除了这些编程原则外，函数式编程的思想也使我对编程有了更深刻的认识

[函数式编程范式](https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/)

### 3. 实践是检验真理的唯一标准

如题。

## 编程实践（术）

### 错误处理

错误处理是任何程序或系统的不可或缺的一部分，错误处理本身并不复杂但往往与业务结合的比较紧密。

比如表单的一个必填项为空时会产生一个错误，如果我们在提交表单的流程中去写一个 `if` 来处理这个错误显然违反了我们的“单一职责”原则。  
当我们的表单规则变得复杂时，我们提交表单的代码也会变得异常复杂，因为每增加一个 `if` 我们代码执行分支都会呈几何级增长，最终我们的代码会脱离我们的掌控，使得程序变成一个黑箱谁也无法预料到会发生什么。

**bad case**:

```js
function submit(form) {
  if (isEmpty(form.name)) {
    // ...
    return;
  }
  if (isNotValidPhone(form.phone)) {
    // ...
    return;
  }

  // do something
  // ...
}
```

好在编程语言的设计者们早已意识到这个问题，他们为我们提供了一种机制来处理这种情况，`try...catch`。

**better case**:

```js
function submit(form) {
  try {
    validate(form);
    // do something
    // ...
  } catch (error) {
    if (error instanceof EmptyError) {
      // ...
    }
    if (error instanceof InvalidPhoneError) {
      // ...
    }
    // ...
  }
}

function validate(form) {
  if (isEmpty(form.name)) {
    throw new EmptyError();
  }
  if (isNotValidPhone(form.phone)) {
    throw new InvalidPhoneError();
  }
  // ...
}
```

这样我们的代码就变得清晰了很多，我们在 `validate` 函数中处理所有的表单校验，当校验失败时抛出一个错误，我们在 `catch` 中捕获这个错误并处理它，这样便将我们的业务代码和错误处理代码分离开。  
虽然这里的例子看起来 better case 的行数比 bad case 多了近一倍，但相比此处我们省略的业务代码来说，这些不值一提，相反我们的代码可读性、可维护性以及可测试性都得到了极大地改善。
