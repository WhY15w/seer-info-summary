const express = require("express");
const router = express.Router();
const { reply } = require("../res/reply");
const config = require("../config/config");
const { getSeerBiliBiliInfo } = require("../utils/fetchData");

router.get("/getSeerBiliBiliInfo", async (req, res, next) => {
  try {
    const data = await getSeerBiliBiliInfo(config.mid);
    res.json(reply(0, "获取信息成功", data));
  } catch (error) {
    res.json(reply(1, "获取信息失败", error.message));
  }
});

module.exports = router;
