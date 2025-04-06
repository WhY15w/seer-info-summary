const express = require("express");
const router = express.Router();
const { reply } = require("../res/reply");
const cjModel = require("../models/cjModel");
const lxyModel = require("../models/lxyModel");

router.get("/getLoggerInfo", async (req, res, next) => {
  try {
    const type = req.query.type;
    if (!type) {
      return res.json(reply(1, "请求参数错误", null));
    }
    let data = null;
    if (type === "cj") {
      data = await cjModel.find();
    } else if (type === "lxy") {
      data = await lxyModel.find();
    }
    res.json(reply(0, "获取信息成功", data));
  } catch (error) {
    res.json(reply(1, "获取信息失败", error.message));
  }
});

module.exports = router;
