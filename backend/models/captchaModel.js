const mongoose = require("mongoose");

const captchaSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  uuid: {
    type: String,
    required: true,
  },
  used: {
    type: Boolean,
    required: true,
    default: false,
  },
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 180 * 1000), // 180秒后过期
  },
});

// 设置 TTL 索引，180秒后过期
captchaSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 180 });

const captchaModel = mongoose.model("captcha", captchaSchema);

module.exports = captchaModel;
