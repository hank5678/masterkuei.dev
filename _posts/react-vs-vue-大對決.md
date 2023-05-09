---
title: "React vs Vue 大對決"
excerpt: "到底有什麼差別？學哪一個才好？"
date: "Tue, 09 May 2023 03:46:49 GMT"
hashtag: "reactjs,vuejs"
coverImage: "/assets/blog/hello-world/cover.jpg"
ogImage:
  url: "/assets/blog/hello-world/cover.jpg"
---

## 什麼是 React？

React 是 facebook 開發的一個為資料提供彩現為 HTML 視圖的開源 JavaScript 庫。React 視圖通常採用包含以自訂 HTML 標記規定的其他元件的元件彩現。React 為程式設計師提供了一種子元件不能直接影響外層元件（”data flows down”）的模型，資料改變時對 HTML 文件的有效更新，和現代單頁應用中元件之間乾淨的分離。

## React 特色？

- 用純 JS 在前端產生 HTML （一般來說是在後端產生 HTML 送到前端）
- 使用 Virtual DOM，重繪時效率高
- 自定義 Component，方便開發
- 父子 Component 可透過 props 通訊
- 只負責 MVC 的 View 部份，所以不算框架，彈性高
- 因為完全是 JS 操作 UI 的關係，使得它可以跟後端分離，達到即時互動、自動更新的效果 \*只是一個 JS 函式庫，所以容量小易移植

## 什麼是 Vue.js？

Vue.js（或簡稱為 Vue）是一個用於建立使用者介面的開源 JavaScript 框架，也是一個建立單頁面應用的 Web 應用框架。 2016 年一項針對 JavaScript 的調查表明，Vue 有著 89%的開發者滿意度。在 GitHub 上，該專案平均每天能收穫 95 顆星，為 Github 有史以來星標數第 4 多的專案。

## Vue 特色？

- 輕量化的框架
- MVVM ( View、Model and ViewModel)架構
- Two-Way-Binding 雙向綁定
- 組件(Component)系統

## 用他們寫一個 Hello World 吧！！

React 範例：

```javascript
<body>
    <div id="app"></div>
</body>
<script type="text/babel">
    ReactDOM.render(
      <h1>Hello, world!</h1>,
      document.getElementById('app')
    );
</script>
```

Vue 範例：

```javascript
<body>
    <div id="app">
      <p>{{ message }}</p>
    </div>
</body>
<script>
    new Vue({
      el: '#app',
      data: {
        message: 'Hello World'
      }
    });
</script>
```
