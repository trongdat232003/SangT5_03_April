const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 25,
  secure: false,
  auth: {
    user: "88455536b74796",
    pass: "b1b9753adaf041",
  },
});
module.exports = {
  sendmail: async function (to, subject, URL) {
    return await transporter.sendMail({
      from: "trongdat232003@gmail.com",
      to: to,
      subject: subject,
      html: `<a href=${URL}>URL</a>`, // html body
    });
  },
};
