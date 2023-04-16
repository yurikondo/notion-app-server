const router = require("express").Router();

//同階層のauthのファイルのエンドポイントを叩くには/authを前につける
//レッスン52より
router.use("/auth", require("./auth"));

module.exports = router;
