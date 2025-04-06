const express = require("express");
const router = express.Router();
const { reply } = require("../res/reply");
const pluginCenterModel = require("../models/pluginCenterModel");

router.get("/getPluginCenterInfo", async (req, res, next) => {
  try {
    const { name, author, type, sort } = req.query;
    const searchQuery = {};
    const sortQuery = {};
    if (name) {
      // 模糊搜索
      searchQuery.name = new RegExp(name, "i");
    }
    if (author) {
      searchQuery.author = author;
    }
    if (type) {
      searchQuery.type = type;
    }
    if (sort) {
      Number(sort) === 1 ? (sortQuery.wtime = -1) : (sortQuery.wtime = 1);
    }
    const data = await pluginCenterModel.find(searchQuery).sort(sortQuery);
    res.json(reply(0, "获取信息成功", data));
  } catch (error) {
    res.json(reply(1, "获取信息失败", error.message));
  }
});

module.exports = router;
