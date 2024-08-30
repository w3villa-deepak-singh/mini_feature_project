
const express = require('express');
const { verifyOtp } = require('../controllers/verifyOtpController');

const router = express.Router();

router.get('/verify-otp', verifyOtp);

module.exports = router;