const express = require("express");
const app = express();
const PORT = 4000;

app.get("/", (req, res) => {
  res.send("ハロー✨");
});

//ユーザー新規登録API

//ユーザーログイン用API

app.listen(PORT, () => {
  console.log("ローカルサーバー起動中🚀");
});
