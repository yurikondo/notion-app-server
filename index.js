const express = require("express");
const mongoose = require("mongoose");
const CryptoJS = require("crypto-js");
const JWT = require("jsonwebtoken");
const User = require("./src/v1/models/user");
const { body, validationResult } = require("express-validator");
const app = express();
const PORT = 4000;
require("dotenv").config();
app.use(express.json());

//DB接続
try {
  mongoose.connect(process.env.MONGODB_URL);
  console.log("DBと接続中🚀");
} catch (err) {
  console.log(`のエラー👉` + err);
}

//ユーザー新規登録API
app.post(
  "/register",

  //express-validatorでバリデーション処理
  body("username")
    .isLength({ min: 8 })
    .withMessage("ユーザー名は8文字以上である必要があります"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("パスワードは8文字以上である必要があります"),
  body("comfirmPassword")
    .isLength({ min: 8 })
    .withMessage("確認用パスワードは8文字以上である必要があります"),
  //DBにすでに同じユーザー名が登録されていないか確認
  body("username").custom((value) => {
    return User.findOne({ username: value }).then((user) => {
      if (user) {
        return Promise.reject("このユーザー名はすでに使われています");
      }
    });
  }),

  //express-validatorのvalidationResultでエラー文をerrorsに入れる
  (req, res, next) => {
    const errors = validationResult(req);
    //もしエラーが空じゃなかったら
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },

  async (req, res) => {
    //パスワードの受け取り
    const password = req.body.password;

    try {
      //パスワードの暗号化
      req.body.password = CryptoJS.AES.encrypt(
        password,
        process.env.SECRET_KEY
      );
      //ユーザーの新規作成
      const user = await User.create(req.body);
      //JWT発行
      const token = JWT.sign({ id: user.id }, process.env.TOKEN_SECRET_KEY, {
        expiresIn: "24h",
      });
      return res.status(200).json({ user, token });
    } catch (err) {
      return res.status(500).json(`エラー👉` + err);
    }
  }
);

//ユーザーログイン用API

app.listen(PORT, () => {
  console.log("ローカルサーバー起動中🚀");
});
