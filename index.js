const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 4000;

//DB接続
try {
  mongoose.connect(
    "mongodb+srv://yuri:yuri@cluster0.dli5dta.mongodb.net/?retryWrites=true&w=majority"
  );
  console.log("DBと接続中🚀");
} catch (err) {
  console.log(`のエラー👉` + err);
}

//ユーザー新規登録API

//ユーザーログイン用API

app.listen(PORT, () => {
  console.log("ローカルサーバー起動中🚀");
});
