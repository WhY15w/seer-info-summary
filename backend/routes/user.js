const express = require("express");
const router = express.Router();

const userModel = require("../models/userModel");
const checkLogin = require("../middlewares/checkLogin");
const { reply } = require("../res/reply");

// 统一的用户查找函数，简化代码
const findUser = async (filter) => {
  try {
    return await userModel.findOne(filter);
  } catch (error) {
    return null;
  }
};

// 获取用户信息
router.get("/getUserinfo", checkLogin, async (req, res) => {
  const user = await findUser({ username: req.user.username });
  if (!user) {
    return res.json(reply(404, "用户不存在", {}));
  }
  const { password, ...data } = user._doc;
  res.json(reply(0, "获取数据成功", data));
});

// 更新用户订阅
router.post("/updateSubscriptions", checkLogin, async (req, res) => {
  const { subscriptions } = req.body;
  if (!subscriptions) {
    return res.json(reply(400, "参数错误", {}));
  }
  try {
    const updatedUser = await userModel.findOneAndUpdate(
      { _id: req.user._id },
      { $set: { subscriptions } },
      { new: true } // 返回修改后的文档
    );
    if (!updatedUser) {
      return res.json(reply(404, "用户不存在", {}));
    }
    res.json(reply(0, "订阅成功", {}));
  } catch (error) {
    res.json(reply(500, "修改失败", {}));
  }
});

module.exports = router;
