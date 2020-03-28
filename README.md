# react-todo-with-test

## 概要
このToDoアプリケーションは、Jest/Enzymeの練習のために作成しています。

## バックエンド
【使用技術】<br>
+ Express.js 
+ MySQL
+ Jest

<br><br>
【Routers】
+ GET    * (React applicationのレンダリング用)
+ GET    /api/user 
+ POST   /api/user/signup
+ POST   /api/user/login
+ PUT    /api/user
+ DELETE /api/user
+ POST   /api/task
+ GET    /api/task
+ PUT    /api/task
+ DELETE /api/task
<br><br>
【備考】<br>
Database操作のための関数とRouterの全てをテスト済み。


## フロントエンド
【使用技術】<br>
+ React
+ Redux
+ Bootstrap
+ Jest
+ Enzyme
+ react-testing-library (Custom Hookのテスティング時のみ使用)

【備考】<br>
Taskに関連したcompoenents, action creators, custom hookはテストしていますが、他の機能は時間の関係上、テストできていません。
