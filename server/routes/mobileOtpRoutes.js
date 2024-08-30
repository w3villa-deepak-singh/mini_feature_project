const express = require('express');
const router = express.Router();
const mobileOtpController = require('../controllers/mobileOtpController');

const { jwtAuthMiddleware,generateToken} = require('../jwt')
  

router.post('/send-mobile-otp', mobileOtpController.sendMobileOtp);
router.post('/verify-mobile-otp', mobileOtpController.verifyMobileOtp);

module.exports = router;