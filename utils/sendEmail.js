import nodemailer from "nodemailer";

export const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    // host: process.env.MAIL_HOST,
    // port: process.env.MAIL_PORT,
    service: "gmail",
    auth: {
      user: process.env.My_EMAIL,
      pass: process.env.APP_PASSWORD,
    },
  });
  const mailOptions = {
    from: `no-reply@newsync.pk`,
    to: options.email,
    subject: options.subject,
    html: options.message,
  };

  await transporter.sendMail(mailOptions);
};
