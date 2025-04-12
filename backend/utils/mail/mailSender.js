const nodemailer = require("nodemailer");

class MailSender {
  constructor(options) {
    this.transporter = nodemailer.createTransport({
      service: "QQ",
      auth: {
        user: options.email,
        pass: options.password,
      },
    });
  }

  // 单发邮件方法
  sendMail({ to, subject, text, html }) {
    const mailOptions = {
      from: `"${this.transporter.options.auth.user}" <${this.transporter.options.auth.user}>`,
      to,
      subject,
      text,
      html,
    };

    return new Promise((resolve, reject) => {
      this.transporter.sendMail(mailOptions, (error, info) => {
        error ? reject(error) : resolve(info);
      });
    });
  }

  // 群发邮件方法
  async sendBulkMail({ recipients, subject, text, html, concurrency = 5 }) {
    const results = [];
    const batch = [];

    for (const [index, to] of recipients.entries()) {
      const promise = this.sendMail({ to, subject, text, html })
        .then((info) => ({
          email: to,
          status: "success",
          messageId: info.messageId,
        }))
        .catch((error) => ({
          email: to,
          status: "error",
          message: error.message,
        }))
        .finally(() => {
          results.push(promise);
        });

      batch.push(promise);

      // 控制并发数量
      if (batch.length >= concurrency) {
        await Promise.race(batch);
        batch.splice(batch.indexOf(promise), 1); // 移出已完成的
      }
    }

    await Promise.all(batch); // 等待剩余任务完成
    return results;
  }
}

module.exports = MailSender;
