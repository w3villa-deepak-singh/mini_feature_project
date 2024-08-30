
const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;


const client = new twilio(accountSid, authToken);

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); 
};

const sendOTP = async (mobileNumber, otp) => {
  const formattedNumber = `+91${mobileNumber}`;
  try {
    const message = await client.messages.create({
      body: `Your OTP code is ${otp}`,
      from: twilioPhoneNumber,
      to: formattedNumber,
    });
    console.log(`OTP sent successfully to ${mobileNumber}: ${message.sid}`);
    return message.sid;
  } catch (error) {
    console.error('Failed to send OTP:', error);
    throw new Error('Failed to send OTP');
  }
};

module.exports = {
  generateOTP,
  sendOTP,
};
