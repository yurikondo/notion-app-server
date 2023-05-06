const { validationResult } = require("express-validator");

//変数validateでエキスポートする
exports.validate = (req, res, next) => {
  //express-validatorのvalidationResultでエラー文をerrorsに入れる(https://express-validator.github.io/docs/6.14.0/)
  const errors = validationResult(req);
  //もしエラーが空じゃなかったら
  if (!errors.isEmpty()) {
    //array() メソッドはExpress-validatorライブラリで提供されている、バリデーションエラーの配列を取得するための関数
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};