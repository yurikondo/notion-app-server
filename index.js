const express = require("express");
const app = express();
const PORT = 4000;

app.get("/", (req, res) => {
  res.send("ハロー✨");
});

app.listen(PORT, () => {
  console.log("ローカルサーバー起動中🚀");
});
