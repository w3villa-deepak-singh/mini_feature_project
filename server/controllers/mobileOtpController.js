const { UserOTP } = require('../models');
const { UserProfile } = require('../models');
const { generateOTP, sendOTP } = require('../services/otpMobileService');
const { sendResponse } = require('../utils/responseHelper');

const sendMobileOtp = async (req, res) => {

  const { mobileNumber,UID } = req.body;
  console.log("mobileNumber::::::::::", mobileNumber);
  console.log("UID from request body::::::::::", UID);

  if (!UID) {
    console.log('User not authenticated. UID is not present in session.');
    return sendResponse(res, 401, 'UID is not present in session.', null);
  }

  try {
    const otp = generateOTP();
    const timestamp = Math.floor(Date.now() / 1000);

    // Create new OTP record
    await UserOTP.create({
      mobileNumber,
      otp,
      createdAt: timestamp,
      updatedAt: timestamp,
    });
    console.log('Created new OTP record for:', mobileNumber);

    // Send OTP via Twilio
    await sendOTP(mobileNumber, otp);

    sendResponse(res, 200, 'OTP sent successfully', null);
  } catch (error) {
    console.error('Error sending OTP:', error);
    sendResponse(res, 500, 'Internal Server Error', null);
  }
};

const verifyMobileOtp = async (req, res) => {
  const { otp, UID } = req.body;
  console.log("otp::::::::::::::::::::", otp);
  console.log('UID from request body::::::::::::::::::::::::', UID);

  if (!UID) {
    console.log('User not authenticated. UID is not present in session.');
    return sendResponse(res, 401, 'UID is not present', null);
  }

  try {
    // Find the latest OTP record for the UID
    const latestOtpRecord = await UserOTP.findOne({
      order: [['createdAt', 'DESC']],
    });

    if (!latestOtpRecord) {
      return sendResponse(res, 404, 'OTP record not found', null);
    }

    if (latestOtpRecord.otp !== otp) {
      return sendResponse(res, 400, 'Invalid OTP', null);
    }

    // OTP is valid, update user profile with mobile number
    const user = await UserProfile.findOne({ where: { UID } });

    if (user) {
      user.mobileNumber = latestOtpRecord.mobileNumber;
      user.is_mobile_verified = true;
      await user.save();

      // Delete OTP record after successful verification
    //   await UserOTP.destroy({ where: { UID } });

      sendResponse(res, 200, 'Mobile number verified and updated successfully', null);
    } else {
      sendResponse(res, 404, 'User not found', null);
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    sendResponse(res, 500, 'Internal Server Error', null);
  }
};

module.exports = {
  sendMobileOtp,
  verifyMobileOtp,
};
