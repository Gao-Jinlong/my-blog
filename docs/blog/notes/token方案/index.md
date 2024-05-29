# Token 方案

## 前端存储方式对比

### Cookie

Cookie 是服务器发送到用户浏览器并保存在本地的一小段数据。并且下次向同一服务器再发起请求时，会自动将这些数据发送到服务器上。

因此 Cookie 可以用于存储用户的登录状态等信息。

在早期浏览器中没有现代存储 API（LocalStorage、SessionStorage） 时，Cookie 曾一度用于存储客户端数据，但是每次浏览器请求都回携带这些数据，会带来额外性能开销，因此通常**不建议使用 Cookie 存储数据**。

Cookie 可以通过 HTTP 头直接设置：

```http
HTTP/1.1 200 OK
Set-Cookie: <cookie-name>=<cookie-value>

[body]
```

浏览器会自动将 Cookie 存储在本地，并在下次请求时自动发送到服务器。

所以服务端可以在客户端不干涉的情况下完成数据的存储和传输。

但是 Cookie 本身还有一些不足和潜在的风险：

- Cookie 的大小限制在 4KB 左右，不适合存储大量数据。
- Cookie 会在每次请求中自动发送，可能会影响网络性能。
- Cookie 可以被 JavaScript 访问和修改，如果站点受到**跨站脚本(XSS)攻击**，可能会导致 Cookie 泄露。
- Cookie 可能会受到**跨站点请求伪造（CSRF）攻击**，因为浏览器会自动发送包含 Cookie 的请求，如果被恶意网站获取到用户的 Cookie，就可以伪造用户的身份发送请求。

随着浏览器的发展，部分问题已经有了相应的解决方案，我们通过实践来逐个说明

假设我们现在使用 Cookie 来存储用户的登入信息，如前面所说我们可以直接通过 HTTP 头来设置 Cookie：

```http
HTTP/1.1 200 OK
Set-Cookie: token=123456
```

我们面对的第一个问题是，当我们关闭浏览器重新打开时，我们的登入信息就会丢失，这是因为在**默认情况下 Cookie 会在会话结束时会被自动清除**

![alt text](image.png)

可以通过设置 Cookie 的过期时间将 Cookie 的生命周期延长，这样即使关闭浏览器，下次打开时 Cookie 仍然有效：

```http
HTTP/1.1 200 OK
Set-Cookie: token=123456; Expires=Wed, 21 Oct 2024 22:45:00 GMT
Set-Cookie: token=123456; Max-Age=3600
```

可以通过两个属性来设置 Cookie 的过期时间 `Expires` 或者 `Max-Age`，`Expires` 是一个 UTC 格式的时间字符串，表示 Cookie 的过期时间，`Max-Age` 是一个相对时间，表示 Cookie 的有效时间（单位为秒）。

### SessionStorage

### LocalStorage

### token 处理

将令牌存储在 Cookie 和 Local Storage 中都有其优缺点，取决于具体的使用场景和安全需求。

Cookie：

优点：
Cookie 在浏览器和服务器之间来回传递，因此在客户端和服务器之间共享令牌很方便。
可以设置 Cookie 的过期时间，使得令牌在一段时间后失效，增加了一定的安全性。
缺点：
Cookie 在每次 HTTP 请求中都会自动发送，包括页面资源请求，因此可能会增加网络流量，降低性能。
可能会受到跨站点请求伪造（CSRF）攻击，因为浏览器会自动发送包含 Cookie 的请求，如果被恶意网站获取到用户的 Cookie，就可以伪造用户的身份发送请求。
存储容量有限，大约在 4KB 左右。
Local Storage：

优点：
可以存储大量数据，一般限制在 5MB 左右，比 Cookie 更适合存储较大的令牌或其他数据。
数据存储在客户端，不会在每次请求中自动发送，不会影响网络性能。
缺点：
Local Storage 中的数据在客户端和服务器之间不会自动传输，需要通过 JavaScript 明确获取并发送到服务器，因此相对于 Cookie，使用起来稍显麻烦。
由于数据存储在客户端，存在被恶意网站获取的风险，尤其是对于敏感数据，需要特别注意安全性。
综合考虑，对于令牌这种敏感信息，通常建议将其存储在 HttpOnly 的 Secure Cookie 中，以确保安全性和可用性。在某些情况下，如果需要存储大量数据或者不需要在每次请求中发送令牌，可以考虑使用 Local Storage。

```

```
