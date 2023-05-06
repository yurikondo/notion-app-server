//mongooseのインストール(https://mongoosejs.com/docs/index.html)
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 4000;
require("dotenv").config();
const cors = require("cors");

//https://www.npmjs.com/package/cors
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
//routesにアクセスするときは/api/v1をつける
//routesディレクトリのindex.jsファイルを見る
app.use("/api/v1", require("./src/v1/routes"));

//DB接続(https://mongoosejs.com/docs/connections.html)
try {
  mongoose.connect(process.env.MONGODB_URL);
  console.log("DBと接続中🚀");
} catch (err) {
  console.log(err);
}

app.listen(PORT, () => {
  console.log("ローカルサーバー起動中🚀");
});
