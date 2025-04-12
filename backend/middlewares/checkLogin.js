const jwt = require("jsonwebtoken");
const { unauthorized } = require("../res/reply");

// 环境变量读取盐值
const salt = process.env.HASH_SALT;

module.exports = (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.json(unauthorized("未登录"));
  }

  jwt.verify(token, salt, (err, decoded) => {
    if (err) {
      return res.json(unauthorized("无效的token"));
    }
    // 保存用户信息
    req.user = decoded;
    next();
  });
};
