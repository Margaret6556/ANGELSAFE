const nodemailer = require("nodemailer");

class Emailer {
  constructor(config) {
    this.log = config.log();
    this.HOST = config.emailHost;
    this.PORT = config.emailPort || 587;
    this.USER = config.emailUser;
    this.PASS = config.emailPass;
    this.transporter = nodemailer.createTransport({
      host: this.HOST,
      port: this.PORT,
      secure: config.emailSecure || false,
      auth: {
        user: this.USER,
        pass: this.PASS,
      },
    });
  }
  async sendMail(to, subject, text, html = null){
    try{
      let info = await this.transporter.sendMail({
        from: `"AngelSafe Support" <${this.USER}>`,
        to,
        subject,
        text,
        html,
      });
      this.log.debug("Message sent: %s", info.messageId);
    } catch(err){
      log.debug(err);
    }
  }
}
module.exports = Emailer;