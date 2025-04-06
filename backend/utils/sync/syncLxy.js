const lxyModel = require("../../models/lxyModel");
const config = require("../../config/config");
const { getLoggerInfo } = require("../fetchData");

async function syncLxy() {
  try {
    // 获取原始数据（包含完整字段）
    const lxyData = await getLoggerInfo(config.loggerUrl.lxy);
    if (!lxyData.length) return "未获取到雷小伊数据";

    // 原数据标准化逻辑保持不变
    const standardize = (item) => ({
      name_all: item.name_all?.trim() || "",
      url: item.url?.trim() || "",
    });

    // 生成用于比较的轻量数据
    const processedlxy = lxyData.map(standardize);

    // 获取数据库现存数据
    const dbData = await lxyModel.find({}, { _id: 0, __v: 0 }).lean();

    // 创建比较指纹
    const createFingerprint = (item) =>
      JSON.stringify({
        name_all: item.name_all,
        url: item.url,
      });

    // 建立原始数据与轻量数据的映射关系
    const originalDataMap = new Map();
    lxyData.forEach((original, index) => {
      originalDataMap.set(createFingerprint(processedlxy[index]), original);
    });

    const dbMap = new Map(
      dbData.map((item) => [createFingerprint(item), item])
    );

    // 计算差异时获取对应原始数据
    const added = processedlxy
      .filter((item) => !dbMap.has(createFingerprint(item)))
      .map((processedItem) =>
        originalDataMap.get(createFingerprint(processedItem))
      );

    const removed = dbData.filter(
      (item) => !originalDataMap.has(createFingerprint(item))
    );

    // 执行数据库操作
    let message = [];

    // 批量插入原始完整数据
    if (added.length > 0) {
      await lxyModel.insertMany(added); // 直接插入原始数据
      message.push(`雷小伊新增：${added.length}个`);
    }

    // 删除逻辑
    if (removed.length > 0) {
      const deleteConditions = removed.map((item) => ({
        name_all: item.name_all,
        url: item.url,
      }));
      await lxyModel.deleteMany({ $or: deleteConditions });
      message.push(`雷小伊移除：${removed.length}个`);
    }

    return message.length > 0
      ? `【雷小伊系列已同步】\n${message.join("\n")}`
      : "雷小伊系列已是最新版本";
  } catch (error) {
    console.error("同步失败:", error);
    throw new Error("雷小伊同步失败");
  }
}

module.exports = syncLxy;
