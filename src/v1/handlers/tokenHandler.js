const JWT = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();

//クライアントから渡されたJWTが正常か認証する関数
const tokenDecode = (req) => {
  const bearerHeader = req.headers["authorization"];
  if (bearerHeader) {
    const bearer = bearerHeader.split(" ")[1];
    try {
      //verify関数でデコード(https://www.npmjs.com/package/jsonwebtoken)
      const decodedToken = JWT.verify(bearer, process.env.TOKEN_SECRET_KEY);
      return decodedToken;
    } catch (err) {
      return false;
    }
  } else {
    return false;
  }
};

//JWT認証を検証するためのミドルウェア
exports.verifyToken = async (req, res, next) => {
  const tokenDecoded = tokenDecode(req);
  if (tokenDecoded) {
    //そのJWTと一致するユーザーを探してくる
    const user = await User.findById(tokenDecoded.id);
    if (!user) {
      return res.status(401).json("権限がありません❌");//401 不許可
    }
    req.user = user;
    next();
  } else {
    return res.status(401).json("権限がありません❌");//401 不許可
  }
};
