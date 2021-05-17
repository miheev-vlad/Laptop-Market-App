const nodemailer = require('nodemailer');
const { EMAIL_SERVICE, EMAIL_USERNAME, EMAIL_PASSWORD, EMAIL_FROM } = require('../../config/keys');

const sendEmail = (options) => {
  const transporter = nodemailer.createTransport({
    service: EMAIL_SERVICE,
    auth: {
      user: EMAIL_USERNAME,
      pass: EMAIL_PASSWORD,
    }
  })
  const mailOptions = {
    from: EMAIL_FROM,
    to: options.to,
    subject: options.subject,
    html: options.text
  }
  transporter.sendMail(mailOptions, function(err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
}

module.exports = sendEmail;