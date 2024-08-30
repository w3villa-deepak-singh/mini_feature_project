const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const { UserProfile } = require('../models');
const { UserOTP } = require('../models');
const { sendResponse } = require('../utils/responseHelper');
const { sendConfirmationEmail } = require('../services/emailService');
const { jwtAuthMiddleware,generateToken} = require('../jwt')




const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
};


const sendOTP = async (email) => {
  const otp = generateOTP();
  const timestamp = Math.floor(Date.now() / 1000);

  // Save OTP to UserOTP table
  await UserOTP.create({
    email,
    otp,
    createdAt: timestamp,
    updatedAt: timestamp,
  });


  console.log(`OTP for ${email}: ${otp}`);
  return otp; // Return OTP to use in email    

};




const signup = async (req, res) => {


  console.log('Received signup request:', req.body);

  const { email, password } = req.body;

  try {

    // Generate OTP and save to UserOTP table
    const otp = await sendOTP(email);

    // Check if user already exists
    const existingUser = await UserProfile.findOne({ where: { email } });

    if (existingUser) {
      // If user exists, skip creating the profile
      // Send OTP email to the existing user
      // await sendConfirmationEmail(email, otp);
      return sendResponse(res, 200, 'User already exists. OTP sent again.', { existingUser });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate UID
    const UID = uuidv4();
    console.log("Generated UID:", UID);

    // Create user profile
    const newUser = await UserProfile.create({
      UID,
      email,
      password: hashedPassword,
      createdAt: Math.floor(Date.now() / 1000),
      updatedAt: Math.floor(Date.now() / 1000),
    });

    const payload = {
      uid: newUser.UID,
      email: newUser.email
  }
  console.log(JSON.stringify(payload));
  const token = generateToken(payload);
  console.log("Token is ::::::::: ", token);


    // Send OTP email
    await sendConfirmationEmail(email, otp);

    sendResponse(res, 201, 'User registered successfully. Please check your email for the OTP.', { 
      newUser:newUser,
      token:token 
    });

  
  } catch (error) {
    console.error('Error during signup:', error);
    return sendResponse(res, 500, 'Internal Server Error', null);
  }
};

module.exports = { signup };
