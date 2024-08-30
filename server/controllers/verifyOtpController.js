const express = require('express');
const { UserOTP, UserProfile } = require('../models'); 
const { sendResponse } = require('../utils/responseHelper');

const verifyOtp = async (req, res) => {
  const { email, otp } = req.query;

  console.log("email::::::::::::",email)

  if (!email || !otp) {
    return sendResponse(res, 400, 'Email and OTP are required', null);
  }

  try {
         // Fetch the most recent OTP record for the given email
    const otpRecord = await UserOTP.findOne({
      where: { email },
      order: [['createdAt', 'DESC']]  // Order by createdAt in descending order to get the latest record
    });


    if (!otpRecord) {
      return sendResponse(res, 400, 'No OTP record found for this email', null);
    }

    // Validate OTP
    if (otpRecord.otp !== otp) {
      return sendResponse(res, 400, 'Invalid OTP', null);
    }


    // Validate OTP (you can also add additional checks such as expiration)
    const currentTime = Math.floor(Date.now() / 1000);
    const otpValidityPeriod = 24 * 60 * 60;; 
    console.log(" otpvalidityPeriod:::::: "  ,currentTime - otpRecord.createdAt)
    if (currentTime - otpRecord.createdAt > otpValidityPeriod) {
      return sendResponse(res, 400, 'OTP has expired', null);
    }

    // Update user profile to mark email as verified
    const userProfile = await UserProfile.findOne({ where: { email } });
    if (!userProfile) {
      return sendResponse(res, 404, 'User not found', null);
    }

    await UserProfile.update(
      { is_email_verified: true },
      { where: { email } }
    );
    // Delete OTP record after successful verification
    // await UserOTP.destroy({ where: { otp, UID: uid } });

    return sendResponse(res, 200, 'OTP verified successfully', null);
  } catch (error) {
    console.error('Error during OTP verification:', error);
    return sendResponse(res, 500, 'Internal Server Error', null);
  }

};

module.exports = { verifyOtp };
