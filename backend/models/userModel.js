const mongoose = require("mongoose");

let userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "/img/avatar/defaultavatar.png",
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+\@.+\..+/i, "Please enter a valid email address"],
    },
    bio: {
      type: String,
      default: "",
      maxlength: 500,
    },
    role: {
      type: String,
      enum: ["user", "admin", "moderator"],
      default: "user",
    },
    // 新增订阅字段
    subscriptions: {
      type: [
        {
          type: String,
          enum: ["bilibili", "lxy", "cj", "plugin", "server"], // 与前端选项对应
        },
      ],
      default: ["lxy", "cj"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// 添加索引优化订阅查询
userSchema.index({ subscriptions: 1 });

let userModel = mongoose.model("users", userSchema);

module.exports = userModel;
