/**
 *
 * @param {*} code 响应码
 * @param {*} msg 响应消息
 * @param {*} data 相应数据
 * @returns json
 */

const reply = (code, msg, data) => {
  return {
    code: code,
    msg: msg,
    data: data,
  };
};

module.exports = {
  reply,

  // 成功的响应
  success: (data, msg = "操作成功") => reply(0, msg, data),

  // 失败的响应
  fail: (msg = "操作失败", data = null) => reply(500, msg, data),

  // 参数错误
  badRequest: (msg = "请求参数错误", data = null) => reply(400, msg, data),

  // 未授权
  unauthorized: (msg = "未授权", data = null) => reply(401, msg, data),

  // 资源未找到
  notFound: (msg = "资源未找到", data = null) => reply(404, msg, data),

  // 服务器内部错误
  internalServerError: (msg = "服务器内部错误", data = null) =>
    reply(500, msg, data),

  // ... 可以添加其他常用的错误码封装
};
