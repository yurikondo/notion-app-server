const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 4000;
require("dotenv").config();

app.use(express.json());
//auth.jsにアクセスするときは/api/v1をつける
app.use("/api/v1", require("./src/v1/routes/auth"));

//DB接続
try {
  mongoose.connect(process.env.MONGODB_URL);
  console.log("DBと接続中🚀");
} catch (err) {
  console.log(`のエラー👉` + err);
}

app.listen(PORT, () => {
  console.log("ローカルサーバー起動中🚀");
});
