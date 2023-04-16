//mongooseのインストール(https://mongoosejs.com/docs/index.html)
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 4000;
const cors = require("cors");
require("dotenv").config();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
//auth.jsにアクセスするときは/api/v1をつける
//routesディレクトリのindex.jsファイルを見る
app.use("/api/v1", require("./src/v1/routes"));

//DB接続(https://mongoosejs.com/docs/connections.html)
try {
  mongoose.connect(process.env.MONGODB_URL);
  console.log("DBと接続中🚀");
} catch (err) {
  console.log(`エラー👉` + err);
}

app.listen(PORT, () => {
  console.log("ローカルサーバー起動中🚀");
});
