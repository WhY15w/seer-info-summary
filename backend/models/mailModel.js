const mongoose = require("mongoose");

const mailCaptchaSchema = new mongoose.Schema({
  uuid: {
    type: String,
    required: true,
    unique: true, // 确保每个验证码ID是唯一的
  },
  email: {
    type: String,
    required: true,
    match: /\S+@\S+\.\S+/,
  },
  captcha: {
    type: String,
    required: true,
  },
  used: {
    type: Boolean,
    default: false,
  },
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 600 * 1000), // 600秒后过期
  },
});

// 设置 TTL 索引，600秒后过期
mailCaptchaSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 600 });

const MailCaptcha = mongoose.model("mailCaptcha", mailCaptchaSchema);

module.exports = MailCaptcha;
