const { validationResult } = require("express-validator");

//変数validateでエキスポートする
exports.validate = (req, res, next) => {
  //express-validatorのvalidationResultでエラー文をerrorsに入れる
  const errors = validationResult(req);
  //もしエラーが空じゃなかったら
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
