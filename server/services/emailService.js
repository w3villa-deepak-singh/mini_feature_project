const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL, 
    pass: process.env.EMAIL_PASSWORD,
  },
});


const sendConfirmationEmail = async (to, otp,email) => {
  console.log("Sender email:",  process.env.EMAIL);
  console.log("Sending email to:", to);

  const mailOptions = {
    from: process.env.EMAIL,
    to: to,
    subject: 'Account Confirmation',
    // text: `Please confirm your account using the following OTP: ${otp}`,
    html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.5;">
    <p>Or click the button below to confirm your account:</p>
    <a  href="${process.env.BACKEND_URL}/api/verify-otp?otp=${otp}&email=${to}"
       style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #ffffff; background-color: #007bff; text-align: center; text-decoration: none; border-radius: 5px;">
       Confirm Account
    </a>
    
  </div>
  `,
  };


  try {
    await transporter.sendMail(mailOptions);
    console.log('Confirmation email sent successfully');
  } catch (error) {
    console.error('Failed to send email:', error);
    throw new Error('Failed to send email.');
  }
};

module.exports = { sendConfirmationEmail };
