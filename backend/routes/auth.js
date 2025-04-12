const express = require("express");
const router = express.Router();
const md5 = require("md5");
const jwt = require("jsonwebtoken");

const userModel = require("../models/userModel");
const checkLogin = require("../middlewares/checkLogin");
const { reply } = require("../res/reply");
const verifyCaptcha = require("../middlewares/checkCaptcha");
const verifyMailCaptcha = require("../middlewares/checkMailCaptcha");

// 环境变量读取盐值
const salt = process.env.HASH_SALT;

// 查询用户的工具函数
const findUser = async (filter) => {
  try {
    return await userModel.findOne(filter);
  } catch (error) {
    throw new Error("Database Error");
  }
};

// 登录路由
router.post("/login", verifyCaptcha(), async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = md5(password);

  const user = await findUser(
    { username, password: hashedPassword },
    res,
    "登录失败"
  );

  if (!user) {
    return res.json(reply(2002, "用户名或密码错误", {}));
  }

  try {
    // 登录成功, 设置 token
    const token = jwt.sign(
      {
        username: user.username,
        _id: user._id,
        email: user.email, // 返回用户的邮箱
        avatar: user.avatar, // 返回用户的头像
        role: user.role, // 返回用户角色
      },
      salt,
      {
        expiresIn: "1d",
      }
    );

    // 更新用户的 lastLogin 字段为当前时间
    await userModel.updateOne(
      { username: user.username },
      { lastLogin: new Date() }
    );
    res.json(reply(0, "登录成功", { username: user.username, token }));
  } catch (error) {
    return res.json(reply(500, "更新验证码状态失败", {}));
  }
});

// 注册路由
router.post(
  "/register",
  verifyCaptcha(),
  verifyMailCaptcha(),
  async (req, res) => {
    // 暂停注册业务
    // const PAUSE_REGISTRATION = true;
    // if (PAUSE_REGISTRATION) {
    //   return res.json(reply(2007, "注册已暂停", {}));
    // }

    const { username, password, email } = req.body;

    // 检查用户名是否已存在
    const existingUser = await findUser({ username }, res, "注册失败");

    if (existingUser) {
      return res.json(reply(2005, "用户名已被注册", {}));
    }

    // 检查邮箱是否已存在
    const existingEmail = await findUser({ email }, res, "注册失败");
    if (existingEmail) {
      return res.json(reply(2006, "邮箱已被注册", {}));
    }

    // 密码强度验证
    if (password.length < 6) {
      return handleError(res, 400, "密码长度不能少于6位");
    }

    try {
      // 创建新用户，角色默认是"user"
      await userModel.create({
        username,
        password: md5(password),
        email,
        role: "user", // 默认角色为 user
      });

      return res.json(reply(0, "注册成功", { username }));
    } catch (error) {
      return res.json(reply(2004, "注册失败", { error }));
    }
  }
);

// 修改密码接口
router.post("/changepwd", checkLogin, async (req, res) => {
  const { currentPwd, newPwd, confirmPwd } = req.body;

  // 参数校验
  if (!currentPwd || !newPwd || !confirmPwd) {
    return res.json(reply(400, "参数不完整", {}));
  }

  // 新密码与确认密码一致性检查
  if (newPwd !== confirmPwd) {
    return res.json(reply(400, "新密码和确认密码不一致", {}));
  }

  // 密码强度校验
  if (newPwd.length < 6) {
    return res.json(reply(400, "新密码长度不能少于6位", {}));
  }

  try {
    // 获取当前用户信息
    const user = await userModel.findOne({ _id: req.user._id });

    if (!user) {
      return res.json(reply(404, "用户不存在", {}));
    }

    // 验证当前密码是否正确
    if (user.password !== md5(currentPwd)) {
      return res.json(reply(401, "当前密码错误", {}));
    }

    // 更新新密码
    const updatedUser = await userModel.findOneAndUpdate(
      { _id: req.user._id },
      { password: md5(newPwd) },
      { new: true } // 返回更新后的用户文档
    );

    if (!updatedUser) {
      return res.json(reply(500, "密码修改失败", {}));
    }

    // 返回成功响应
    res.json(reply(0, "密码修改成功", {}));
  } catch (error) {
    console.error(error);
    return res.json(reply(500, "服务器内部错误", {}));
  }
});

// 找回密码接口
router.post("/recoverpwd", verifyMailCaptcha(), async (req, res) => {
  const { email, newPwd, confirmPwd } = req.body;

  // 参数校验
  if (!email || !newPwd || !confirmPwd) {
    return res.json(reply(400, "参数不完整", {}));
  }

  // 检查新密码和确认密码是否一致
  if (newPwd !== confirmPwd) {
    return res.json(reply(400, "新密码和确认密码不一致", {}));
  }

  // 检查新密码强度
  if (newPwd.length < 6) {
    return res.json(reply(400, "新密码长度不能少于6位", {}));
  }

  try {
    // 查找用户
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json(reply(404, "邮箱未注册", {}));
    }

    // 更新密码
    const hashedPassword = md5(newPwd);
    const updatedUser = await userModel.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true } // 返回更新后的用户文档
    );

    if (!updatedUser) {
      return res.json(reply(500, "密码更新失败", {}));
    }

    res.json(reply(0, "密码重置成功", {}));
  } catch (error) {
    console.error(error);
    return res.json(reply(500, "服务器内部错误", {}));
  }
});

module.exports = router;
