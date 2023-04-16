const CryptoJS = require("crypto-js");
const JWT = require("jsonwebtoken");
const User = require("../models/user");

//ユーザー新規登録用API
exports.register = async (req, res) => {
  //パスワードの受け取り
  const password = req.body.password;

  try {
    //パスワードの暗号化(https://www.npmjs.com/package/crypto-js)
    req.body.password = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY);
    //ユーザーの新規作成(https://mongoosejs.com/docs/models.html#constructing-documents)
    const user = await User.create(req.body);
    //JWT発行・ユーザーIDをエンコード(https://www.npmjs.com/package/jsonwebtoken)
    const token = JWT.sign({ id: user.id }, process.env.TOKEN_SECRET_KEY, {
      expiresIn: "24h",
    });
    return res.status(200).json({ user, token });
  } catch (err) {
    return res.status(500).json(err); //500 サーバーエラー
  }
};

//ユーザーログイン用API
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    //DBからユーザーが存在するか探してくる
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(401).json({
        //401 不許可
        errors: [
          {
            param: "username",
            msg: "ユーザー名が無効です",
          },
        ],
      });
    }

    //パスワードが合っているか照合する
    //パスワードの複号化(https://www.npmjs.com/package/crypto-js)
    const decryptedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.SECRET_KEY
      //復号したパスワードを文字列として認識させる
    ).toString(CryptoJS.enc.Utf8);

    if (decryptedPassword !== password) {
      return res.status(401).json({
        //401 不許可
        errors: [
          {
            param: "password",
            msg: "パスワードが無効です",
          },
        ],
      });
    }

    //JWTを発行(https://www.npmjs.com/package/jsonwebtoken)
    const token = JWT.sign({ id: user.id }, process.env.TOKEN_SECRET_KEY, {
      expiresIn: "24h",
    });
    return res.status(201).json({ user, token }); //201 ログイン成功
  } catch (err) {
    return res.status(500).json(err); //500 サーバーエラー
  }
};
