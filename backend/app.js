const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const { reply } = require("./res/reply");
const config = require("./config/config");

const loggerRouter = require("./routes/logger");
const pluginCenterRouter = require("./routes/pluginCenter");
const bilibiliRouter = require("./routes/bilibili");
const serverRouter = require("./routes/server");
const emailRouter = require("./routes/email");
const captchaRouter = require("./routes/captcha");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const lanzouRouter = require("./routes/lanzou");

require("./jobs/index"); // 导入定时任务

const app = express();

// 信任代理
app.set("trust proxy", "loopback");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(config.prefix, express.static(path.join(__dirname, "public")));
app.use(cors());

// 注册路由
const apiRouter = express.Router();
apiRouter.use("/", loggerRouter);
apiRouter.use("/", pluginCenterRouter);
apiRouter.use("/", bilibiliRouter);
apiRouter.use("/", serverRouter);
apiRouter.use("/email", emailRouter);
apiRouter.use("/captcha", captchaRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/user", userRouter);
apiRouter.use("/lanzou", lanzouRouter);

// 统一添加前缀
app.use(config.prefix, apiRouter);

// 捕获404并转发到错误处理
app.use(function (req, res, next) {
  next(createError(404));
});

// 错误处理中间件（返回JSON）
app.use(function (err, req, res, next) {
  // 设置响应状态码
  res.status(err.status || 500);

  // 返回JSON格式的错误信息
  res.status(err.status || 500).json(
    reply(
      err.status || 500,
      err.message,
      // 开发环境下返回堆栈信息，生产环境不返回
      req.app.get("env") === "development" ? { stack: err.stack } : {}
    )
  );
});

module.exports = app;
