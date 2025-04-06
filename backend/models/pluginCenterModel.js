const mongoose = require("mongoose");

const pluginCenterSchema = new mongoose.Schema({
  author: { type: String, default: "" },
  des: { type: String, default: "" },
  download: { type: String, default: "" },
  name: { type: String, default: "" },
  psd: { type: String, default: "" },
  type: { type: String, default: "" },
  vip: { type: String, default: "" },
  wbid: { type: String, default: "" },
  wtime: { type: String, default: "" },
  // 是否是新增的extension
  new: { type: Boolean, default: false },
});

const pluginCenterModel = mongoose.model("pluginCenter", pluginCenterSchema);
module.exports = pluginCenterModel;
