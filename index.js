const express = require("express");
const mongoose = require("mongoose");
const Crypto = require("crypto-js");
const User = require("./src/v1/models/user");
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
app.post("/register", async (req, res) => {
  //パスワードの受け取り
  const password = req.body.password;

  try {
    //パスワードの暗号化
    req.body.password = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY);
    //ユーザーの新規作成
    const user = await User.create(req.body);
  } catch (err) {
    return res.status().json(`のエラー👉` + err);
  }
});

//ユーザーログイン用API

app.listen(PORT, () => {
  console.log("ローカルサーバー起動中🚀");
});
