const mongoose = require("mongoose");

const cjSchema = new mongoose.Schema({
  icon: { type: String, default: "" },
  id: { type: String, default: "" },
  name_all: { type: String, default: "" },
  size: { type: String, default: "" },
  time: { type: String, default: "" },
  url: { type: String, default: "" },
});

const cjModel = mongoose.model("cj", cjSchema);
module.exports = cjModel;
