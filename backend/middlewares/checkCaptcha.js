const captchaModel = require("../models/captchaModel");
const { reply } = require("../res/reply");

const verifyCaptcha =
  (captchaFieldName = "captcha", captchaIDFieldname = "captchaID") =>
  async (req, res, next) => {
    const captcha = req.body[captchaFieldName];
    const captchaID = req.body[captchaIDFieldname];
    const userCaptcha = captcha ? captcha.toLowerCase() : "";

    if (!captchaID || !captcha) {
      return res.json(reply(2003, "验证码不能为空", {}));
    }

    let dbCaptcha;
    try {
      dbCaptcha = await captchaModel.findOne({ uuid: captchaID, used: false });
    } catch (error) {
      return res.json(reply(500, "验证码查询失败", {}));
    }

    if (!dbCaptcha) {
      return res.json(reply(2003, "验证码错误", {}));
    }
    if (dbCaptcha.used) {
      return res.json(reply(2003, "验证码已使用", {}));
    }

    if (userCaptcha !== dbCaptcha.code) {
      return res.json(reply(2003, "验证码错误", {}));
    }

    // 更新验证码的状态
    await captchaModel.updateOne({ uuid: captchaID }, { used: true });
    next();
  };

module.exports = verifyCaptcha;
