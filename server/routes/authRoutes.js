const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); 



router.get('/google',authController.googleAuth);
router.get('/google/callback', authController.googleCallback);
router.get('/failure', authController.authFailure);
router.get('/logout', authController.logout);

module.exports = router;
