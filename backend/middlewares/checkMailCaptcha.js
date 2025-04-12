const mailCaptchaModel = require("../models/mailModel");
const { reply } = require("../res/reply");

const verifyMailCaptcha =
  (captchaFieldName = "emailCode", captchaIDFieldname = "emailCodeId") =>
  async (req, res, next) => {
    const emailCode = req.body[captchaFieldName];
    const emailCodeId = req.body[captchaIDFieldname];

    if (!emailCode || !emailCodeId) {
      return res.json(reply(2003, "邮箱验证码不能为空", {}));
    }

    let dbEmailCode;
    try {
      dbEmailCode = await mailCaptchaModel.findOne({
        uuid: emailCodeId,
        used: false,
      });
    } catch (error) {
      return res.json(reply(500, "邮箱验证码查询失败", {}));
    }

    if (!dbEmailCode) {
      return res.json(reply(2003, "邮箱验证码错误", {}));
    }
    if (dbEmailCode.used) {
      return res.json(reply(2003, "邮箱验证码已使用", {}));
    }

    if (emailCode !== dbEmailCode.captcha) {
      return res.json(reply(2003, "邮箱验证码错误", {}));
    }

    // 更新验证码的状态
    await mailCaptchaModel.updateOne({ uuid: emailCodeId }, { used: true });
    next();
  };

module.exports = verifyMailCaptcha;
