module.exports = {
  // 数据库配置
  db: {
    dburl: process.env.DB_HOST || "127.0.0.1",
    dbport: process.env.DB_PORT || 27017,
    dbname: process.env.DB_NAME || "seerInfo",
    dbuser: process.env.DB_USER, // 从环境变量获取
    dbpassword: process.env.DB_PASSWORD, // 从环境变量获取
    authSource: process.env.DB_AUTH_SOURCE || "admin",
  },
  // api接口前缀
  prefix: "/seer-api",
  // api接口端口号
  port: 3003,

  loggerUrl: {
    cj: "https://wwqc.lanzouj.com/b00y3drng",
    lxy: "https://lxy.lanzouj.com/b052mtlbg",
  },
  pluginCenter: "http://106.54.214.132:8086/plugin_center?check=1733491723",
  mid: "1310714247",
  serverUrl: "https://seerh5login.61.com/seer_notice",
};
