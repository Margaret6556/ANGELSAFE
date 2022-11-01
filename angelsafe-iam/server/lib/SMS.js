const twilio = require('twilio');

class SMS {
  constructor(config) {
    this.log = config.log();
    this.SID = config.accountSid;
    this.SERVICE = config.serviceId;
    this.TOKEN = config.authToken;
    this.transporter = twilio(this.SID, this.TOKEN);
  }
  async sendSMS(to, body){
    try{
      this.transporter.messages
      .create({
        body,  
        messagingServiceSid: this.SERVICE,      
        to
      })
      .then(message => this.log.debug("Message sent: %s", message.sid))
      .done();
    } catch(err){
      log.debug(err);
    }
  }
}
module.exports = SMS;