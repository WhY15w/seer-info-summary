const pluginCenterModel = require("../../models/pluginCenterModel");
const config = require("../../config/config");
const { getPluginCenterInfo } = require("../fetchData");
async function syncPluginCenter() {
  try {
    const pluginData = await getPluginCenterInfo(config.pluginCenter);
    if (!pluginData.length) return "未获取到插件数据";

    const standardize = (item) => ({
      name: item.name?.trim() || "",
      author: item.author?.trim() || "未知作者",
      des: item.des?.trim() || "暂无描述",
      download: item.download?.trim() || "",
      psd: item.psd?.trim() || "",
      type: item.type?.trim() || "",
      vip: item.vip?.trim() || "",
      wtime: item.wtime?.trim() || "",
    });

    const processedPlugin = pluginData.map(standardize);
    const dbData = await pluginCenterModel.find({}, { _id: 0, __v: 0 }).lean();

    const createFingerprint = (item) =>
      JSON.stringify({
        name: item.name,
        author: item.author,
        des: item.des,
        download: item.download,
        type: item.type,
        vip: item.vip,
        wtime: item.wtime,
      });

    const pluginMap = new Map(
      processedPlugin.map((item) => [createFingerprint(item), item])
    );
    const dbMap = new Map(
      dbData.map((item) => [createFingerprint(item), item])
    );

    const added = processedPlugin.filter(
      (item) => !dbMap.has(createFingerprint(item))
    );
    const changed = processedPlugin.filter((item) => {
      const dbItem = dbMap.get(createFingerprint(item));
      return dbItem && dbItem.psd !== item.psd;
    });
    const removed = dbData.filter(
      (item) => !pluginMap.has(createFingerprint(item))
    );

    let message = [];

    // 处理新增插件并设置new为true
    if (added.length > 0) {
      // 将所有现有记录的new设为false
      await pluginCenterModel.updateMany({}, { $set: { new: false } });

      const addedWithNew = added.map((item) => ({ ...item, new: true }));
      await pluginCenterModel.insertMany(addedWithNew);
      message.push(`新增插件：${added.length}个`);
    }

    // 更新密码
    if (changed.length > 0) {
      const bulkUpdates = changed.map((item) => ({
        updateOne: {
          filter: { name: item.name, author: item.author },
          update: { $set: { psd: item.psd } },
        },
      }));
      await pluginCenterModel.bulkWrite(bulkUpdates);
      message.push(`更新密码：${changed.length}个`);
    }

    // 删除插件
    if (removed.length > 0) {
      const deleteConditions = removed.map((item) => ({
        name: item.name,
        author: item.author,
      }));
      await pluginCenterModel.deleteMany({ $or: deleteConditions });
      message.push(`移除插件：${removed.length}个`);
    }

    return message.length > 0
      ? `【插件中心已同步】\n${message.join("\n")}`
      : "插件数据已是最新版本";
  } catch (error) {
    console.error("同步失败:", error);
    throw new Error("插件中心同步失败");
  }
}

module.exports = syncPluginCenter;
