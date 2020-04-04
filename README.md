# react-todo-with-test

## 概要
このToDoアプリケーションは、Jest/Enzymeの練習のために作成しています。

## バックエンド
### 使用技術
+ Express.js 
+ MySQL
+ Jest

<br><br>
### Schema
```sql
CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username CHAR(30) NOT NULL,
    email CHAR(254) UNIQUE NOT NULL,
    password CHAR(60) NOT NULL
);

CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT false,
    date DATE NOT NULL,
    userId INT,
    FOREIGN KEY (userId) 
        REFERENCES users(id) 
        ON DELETE CASCADE
);
```

### Routers
```
GET    * (React applicationのレンダリング用)
GET    /api/user 
POST   /api/user/signup
POST   /api/user/login
PUT    /api/user
DELETE /api/user
POST   /api/task
GET    /api/task
PUT    /api/task
DELETE /api/task
```
<br><br>

### 備考
Database操作のための関数とRouterの全てをテスト済み。


## フロントエンド
### 使用技術
+ React
+ Redux
+ Bootstrap
+ Jest
+ Enzyme
+ react-testing-library (Custom Hookのテスティング時のみ使用)

### 備考
Taskに関連したcompoenents, action creators, custom hookはテストしていますが、他の機能は時間の関係上、テストできていません。
