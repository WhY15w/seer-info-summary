const express = require("express");
const router = express.Router();
const svgCaptcha = require("svg-captcha");
const crypto = require("crypto");
const captchaModel = require("../models/captchaModel");

// 验证码生成
router.get("/", async (req, res) => {
  let codeConfig = {
    size: 4, // 验证码长度
    ignoreChars: "0o1iz2", // 验证码字符中排除 0o1iz2
    noise: 8, // 干扰线条的数量
    fontSize: 42,
    color: true, //开启文字颜色
    background: "#cc9966", //背景色
    width: 120,
    height: 40,
  };
  let captcha = svgCaptcha.create(codeConfig);
  const captchaCode = captcha.text.toLowerCase();
  const uuid = crypto.randomUUID({ disableEntropyCache: true });

  // 存入数据库
  try {
    await cacheCaptcha({ code: captchaCode, uuid }, res, "内部错误");
    // 如果缓存验证码成功，则发送SVG数据
    console.log(captchaCode, uuid);
    res.setHeader("Access-Control-Expose-Headers", "Captchaid");
    res.setHeader("Captchaid", uuid);
    res.type("svg");
    res.status(200).send(captcha.data);
  } catch (error) {
    // 如果缓存验证码失败，则发送错误响应
    res.status(500).json({ code: 500, msg: "内部错误", data: {} });
  }
});

async function cacheCaptcha(filter) {
  try {
    const captcha = await captchaModel.create(filter);
    // 这里可以根据需要发送成功响应，或者不做任何操作
  } catch (error) {
    console.log(error);
    // 抛出错误，让调用者处理
    throw error;
  }
}

module.exports = router;
