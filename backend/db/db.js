/**
 * 连接 MongoDB 数据库
 * @param {Function} success 连接成功的回调
 * @param {Function} error 连接失败的回调（可选）
 */
module.exports = async (success, error) => {
  // 如果未提供 error 回调，则使用默认的错误处理函数
  if (typeof error !== "function") {
    error = (err) => {
      console.log("数据库连接失败", err);
    };
  }

  const mongoose = require("mongoose");
  const {
    dburl,
    dbport,
    dbname,
    dbuser,
    dbpassword,
    authSource = "admin",
  } = require("../config/config").db;

  // 对用户名和密码进行 URI 编码（处理特殊字符）
  const encodedUser = encodeURIComponent(dbuser);
  const encodedPass = encodeURIComponent(dbpassword);

  // 使用 options 配置连接参数
  const options = {
    user: encodedUser, // 用户名
    pass: encodedPass, // 密码
    authSource: authSource, // 认证数据库
    // useNewUrlParser: true, // 使用新的 URL 解析器
    // useUnifiedTopology: true, // 使用统一的拓扑结构
  };

  // 连接数据库
  mongoose.connect(`mongodb://${dburl}:${dbport}/${dbname}`, options);

  // 连接成功事件
  mongoose.connection.once("open", () => {
    console.log("数据库连接成功");
    success(); // 调用成功回调
  });

  // 连接错误事件
  mongoose.connection.on("error", (err) => {
    error(err); // 调用失败回调
  });

  // 连接关闭事件
  mongoose.connection.on("close", () => {
    console.log("连接关闭");
  });
};
