const express = require("express");
const router = require("express").Router();
const { body } = require("express-validator");
require("dotenv").config();

const User = require("../models/user");
const validation = require("../handlers/validation");
const userController = require("../controllers/user");

const app = express();

//ユーザー新規登録API
router.post(
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

  //エラー文をerrorsに入れる
  validation.validate,

  //パスワードの暗号化・ユーザーの新規作成・JWT発行
  userController.register
);

//ログイン用API
router.post(
  "/login",
  body("username")
    .isLength({ min: 8 })
    .withMessage("ユーザー名は8文字以上である必要があります"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("パスワードは8文字以上である必要があります"),

  //エラー文をerrorsに入れる
  validation.validate,
  //DBからユーザーが存在するか探してくる・パスワードが合っているか照合(複号化)・JWT発行
  userController.login
);

//JWT認証API
router.post("/verify-token", (req, res) => {
  return res.status(200).json({ user: req.user });
});

module.exports = router;
