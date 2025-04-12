const MailSender = require("./mailSender");
const userModel = require("../../models/userModel");
async function sendSubEmail(subType, content) {
  // 初始化邮件发送器
  const mailer = new MailSender({
    email: process.env.EMAIL_SENDER_ACCOUNT,
    password: process.env.EMAIL_SENDER_PWD,
  });

  const res = await userModel.find({
    subscriptions: { $in: [subType] },
  });

  if (res.length === 0) {
    return;
  }

  const emails = res.map((user) => user.email);

  // 邮件主题根据订阅类型定制
  const subjectMap = {
    lxy: "赛尔信息聚合页 - 雷小伊更新通知",
    cj: "赛尔信息聚合页 - 重聚更新通知",
    plugin: "赛尔信息聚合页 - 插件中心更新通知",
  };

  const subject = subjectMap[subType] || subjectMap.default;

  // 群发参数
  const mailOptions = {
    recipients: emails,
    subject: subject,
    html: `
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${subject}</title>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&display=swap');
            
            body {
                margin: 0;
                padding: 0;
                background-color: #f8fafc;
                font-family: 'Noto Sans SC', 'Microsoft YaHei', sans-serif;
                color: #334155;
                line-height: 1.6;
            }
            
            .email-container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
            }
            
            .email-card {
                background-color: #ffffff;
                border-radius: 12px;
                box-shadow: 0 4px 24px rgba(0, 0, 0, 0.05);
                overflow: hidden;
                border: 1px solid #e2e8f0;
            }
            
            .email-header {
                background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
                padding: 30px;
                text-align: center;
                color: white;
            }
            
            .email-header h1 {
                margin: 0;
                font-size: 24px;
                font-weight: 700;
                letter-spacing: 0.5px;
            }
            
            .email-body {
                padding: 30px;
            }
            
            .email-content {
                font-size: 16px;
                line-height: 1.7;
                color: #475569;
            }
            
            .email-content p {
                margin-bottom: 20px;
            }
            
            .cta-button {
                display: inline-block;
                padding: 12px 24px;
                background: linear-gradient(to right, #3b82f6, #2563eb);
                color: white !important;
                text-decoration: none;
                border-radius: 8px;
                font-weight: 500;
                margin: 20px 0;
                box-shadow: 0 4px 6px rgba(59, 130, 246, 0.2);
                transition: all 0.3s ease;
            }
            
            .cta-button:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 12px rgba(59, 130, 246, 0.3);
            }
            
            .email-footer {
                margin-top: 40px;
                padding-top: 20px;
                border-top: 1px solid #f1f5f9;
                text-align: center;
                font-size: 14px;
                color: #64748b;
            }
            
            .unsubscribe-link {
                color: #64748b;
                text-decoration: underline;
            }
            
            .brand-name {
                font-weight: 700;
                color: #2563eb;
            }
            
            .highlight {
                background-color: #f0f9ff;
                padding: 2px 6px;
                border-radius: 4px;
                color: #0369a1;
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="email-card">
                <div class="email-header">
                    <h1>${subject}</h1>
                </div>
                
                <div class="email-body">
                    <div class="email-content">
                        <p>尊敬的<span class="brand-name">赛尔信息聚合页</span>用户：</p>
                        
                        <p>${content}</p>
                        
                        <p>点击下方按钮查看详情：</p>
                        
                        <div style="text-align: center;">
                            <a href="https://cj.yuyuqaq.cn/seerinfo" class="cta-button">立即查看</a>
                        </div>

                    </div>
                    
                    <div class="email-footer">
                        <p>© ${new Date().getFullYear()} <span class="brand-name">赛尔信息聚合页</span> 保留所有权利</p>
                        <p>
                            <a href="https://cj.yuyuqaq.cn/unsubscribe" class="unsubscribe-link">取消订阅</a> | 
                            <a href="https://cj.yuyuqaq.cn/help" class="unsubscribe-link">帮助中心</a>
                        </p>
                        <p>此邮件为系统自动发送，请勿直接回复</p>
                    </div>
                </div>
            </div>
        </div>
    </body>
    </html>
    `,
    concurrency: 2,
  };

  // 执行群发
  mailer
    .sendBulkMail(mailOptions)
    .then((results) => {
      console.log("邮件发送结果:", results);
    })
    .catch((error) => {
      console.error("邮件发送失败:", error);
    });
}

module.exports = sendSubEmail;
