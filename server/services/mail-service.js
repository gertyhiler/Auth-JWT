const mailer = require('nodemailer');
class MailService {

  constructor() {
    this.transporter = mailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    })
  }
  async sendActivationMail(email, link) {
    // console.log("mailer: ", {host: process.env.SMTP_HOST,
    //   port: process.env.SMTP_PORT, auth: {
    //     user: process.env.SMTP_USER,
    //     pass: process.env.SMTP_PASSWORD
    //   }, email
    // });
    try {
      await this.transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: 'Активация аккаунта на ' + process.env.FRONTEND_URL,
        text: '',
        html: `
          <div>
            <h1>
              Для активации аккаунта перейдите по ссылке
            </h1>
            <a href="${link}">${link}</a>
          </div>
        `
      })
    } catch (error) {
      console.log(error);
      throw error;
    }
    
  }
}

module.exports = new MailService();