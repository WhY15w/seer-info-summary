const express = require("express");
const router = express.Router();
const { reply } = require("../res/reply");
const parseLanzouUrl = require("../utils/lanzou/lanzouParser");

router.get("/", async (req, res, next) => {
  try {
    const url = req.query.url;
    if (!url) {
      return res.json(reply(1, "缺少url参数"));
    }
    const pwd = req.query.pwd;
    const type = req.query.type || "json";
    const data = await parseLanzouUrl({
      url,
      pwd,
      type,
      n: "new_filename",
    });
    if (data.code === 0 && data.data?.redirect) {
      return res.redirect(data.data.redirect);
    }
    res.json(data);
  } catch (error) {
    res.json(reply(1, "获取信息失败", error.message));
  }
});

module.exports = router;
