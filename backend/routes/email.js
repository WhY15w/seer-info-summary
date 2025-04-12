const express = require("express");
const crypto = require("crypto");
const router = express.Router();

const mailModel = require("../models/mailModel");
const MailSender = require("../utils/mail/mailSender");
const { reply } = require("../res/reply");

let mailInfo; // 定义全局变量
const initializeMailSender = async () => {
  try {
    mailInfo = await getMailInfo();
    if (!mailInfo) {
      throw new Error("无法获取邮件配置信息");
    }
  } catch (error) {
    console.error(error);
  }
};

const getMailInfo = async () => {
  try {
    // 从环境变量读取
    const settings = {
      EMAIL_SENDER_ACCOUNT: process.env.EMAIL_SENDER_ACCOUNT,
      EMAIL_SENDER_PWD: process.env.EMAIL_SENDER_PWD,
    };
    return settings;
  } catch (error) {
    return null;
  }
};

// 初始化邮件发送器
initializeMailSender().then(() => {
  const mailSender = new MailSender({
    email: mailInfo.EMAIL_SENDER_ACCOUNT, // QQ邮箱
    password: mailInfo.EMAIL_SENDER_PWD, // QQ邮箱的授权码
  });

  // 发送验证码并通过邮件发送接口
  router.post("/sendMailCaptcha", async (req, res) => {
    const { email } = req.body;

    // 检查邮箱格式是否正确（简单验证）
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return res.json(reply(2001, "邮箱格式不正确", {}));
    }

    try {
      const captcha = Math.floor(100000 + Math.random() * 900000).toString();
      const uuid = crypto.randomUUID({ disableEntropyCache: true });
      await mailModel.create({
        uuid,
        email,
        captcha,
        used: false,
      });

      // 邮件内容
      const subject = "您的验证码";
      const text = `您的验证码是: ${captcha}. 请勿泄露给他人。`;
      const html = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>您的验证码</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap');
        
        body {
            margin: 0;
            padding: 0;
            background-color: #f5f7fa;
            font-family: 'Noto Sans SC', 'Microsoft YaHei', sans-serif;
            color: #333;
            line-height: 1.6;
        }
        
        .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 0 15px;
        }
        
        .card {
            background-color: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
            overflow: hidden;
        }
        
        .header {
            background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
            padding: 30px 0;
            text-align: center;
            color: white;
        }
        
        .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 700;
        }
        
        .content {
            padding: 30px;
        }
        
        .code-box {
            background: linear-gradient(to right, #f6f9fc, #eef2f5);
            border-radius: 8px;
            padding: 25px;
            text-align: center;
            margin: 25px 0;
            border: 1px dashed #d1d9e6;
        }
        
        .code {
            font-size: 32px;
            font-weight: 700;
            letter-spacing: 5px;
            color: #2c3e50;
            margin: 10px 0;
            padding: 10px 20px;
            display: inline-block;
            background-color: white;
            border-radius: 6px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }
        
        .note {
            font-size: 14px;
            color: #7f8c8d;
            margin-top: 15px;
        }
        
        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            text-align: center;
            font-size: 12px;
            color: #95a5a6;
        }
        
        .brand {
            font-weight: 700;
            color: #3498db;
        }
        
        .expiry {
            color: #e74c3c;
            font-weight: 500;
        }
        
        .highlight {
            background-color: #fffde7;
            padding: 2px 5px;
            border-radius: 3px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="card">
            <div class="header">
                <h1>您的验证码</h1>
            </div>
            
            <div class="content">
                <p>您好！</p>
                
                <p>您正在使用<span class="brand">赛尔号信息聚合页</span>的服务，以下是您的验证码：</p>
                
                <div class="code-box">
                    <div class="code">${captcha}</div>
                    <p class="note">请勿将此验证码分享给他人</p>
                </div>
                
                <p>此验证码将在<span class="expiry highlight">10分钟</span>后失效，请尽快使用。</p>
                
                <p>如果您没有请求此验证码，请忽略此邮件。</p>
                
                <div class="footer">
                    <p>© ${new Date().getFullYear()} 赛尔号信息聚合页 版权所有</p>
                    <p>此邮件为系统自动发送，请勿直接回复</p>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
    `;

      // 发送邮件
      const sendResult = await mailSender.sendMail({
        to: email,
        subject,
        text,
        html,
      });
      if (sendResult) {
        res.json(reply(0, "验证码发送成功", { uuid, email }));
      } else {
        res.json(reply(500, "验证码发送失败", {}));
      }
    } catch (error) {
      console.error(error);
      res.json(reply(500, "发送验证码失败", {}));
    }
  });
});

module.exports = router;
