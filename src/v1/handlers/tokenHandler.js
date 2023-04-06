const JWT = require("jsonwebtoken");
require("dotenv").config();

//クライアントから渡されたJWTが正常か認証
const tokenDecode = (req) => {
  const bearerHeader = req.headers["authorization"];
  if (bearerHeader) {
    const bearer = bearerHeader.split(" ")[1];
    try {
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
exports.verifyToken = (req, res, next) => {};
