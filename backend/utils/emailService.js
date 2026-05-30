const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOTPEmail = async (email, otp) => {
  const mailOptions = {
    from: `"Shop-Compair" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Your Shop-Compair Verification Code',
    html: `
      <div style="font-family:Arial,sans-serif;max-width:480px;margin:auto;padding:32px;background:#f9f6f0;border-radius:12px;">
        <h2 style="color:#7c3aed;margin-bottom:8px;">Shop-Compair</h2>
        <p style="color:#555;">Your one-time verification code is:</p>
        <div style="font-size:36px;font-weight:bold;color:#7c3aed;letter-spacing:8px;margin:24px 0;">${otp}</div>
        <p style="color:#888;font-size:13px;">This code expires in 10 minutes. Do not share it with anyone.</p>
      </div>
    `,
  };
  await transporter.sendMail(mailOptions);
};

module.exports = { sendOTPEmail };