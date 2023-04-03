const express = require("express");
const mongoose = require("mongoose");
const Crypto = require("crypto-js");
const app = express();
const PORT = 4000;
require("dotenv").config();

//DB接続
try {
  mongoose.connect(process.env.MONGODB_URL);
  console.log("DBと接続中🚀");
} catch (err) {
  console.log(`のエラー👉` + err);
}

//ユーザー新規登録API
app.post("/register", (req, res) => {
  //パスワードの受け取り
  const password = req.body.password;

  try {
    //パスワードの暗号化
  } catch (err) {
    return res.status().json(`のエラー👉` + err);
  }
});

//ユーザーログイン用API

app.listen(PORT, () => {
  console.log("ローカルサーバー起動中🚀");
});
