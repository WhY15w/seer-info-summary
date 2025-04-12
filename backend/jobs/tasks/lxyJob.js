const schedule = require("node-schedule");
const sendSubEmail = require("../../utils/mail/sendSubEmail");
const syncLxy = require("../../utils/sync/syncLxy");

// 定时任务规则：每小时的 0/10/20/30/40/50 分的第 20 秒执行
const rule = new schedule.RecurrenceRule();
rule.minute = [0, 10, 20, 30, 40, 50];
rule.second = 20;
rule.tz = "Asia/Shanghai"; // 设置时区

// 定时任务逻辑
const job = schedule.scheduleJob(rule, async () => {
  try {
    const result = await syncLxy();
    if (result) {
      await sendSubEmail("lxy", result);
      console.log(`[${new Date()}]`, result);
    }
  } catch (error) {
    console.error("同步任务失败：", error.message);
  }
});

// 导出任务以便管理（可选）
module.exports = job;
