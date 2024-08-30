// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { updateUserProfile } = require('../controllers/userController');
const { getUserProfile } = require('../controllers/userController');
const { jwtAuthMiddleware,generateToken} = require('../jwt')

// Route to update user profile
router.patch('/update-profile/:UID',updateUserProfile);
router.get('/get-profile/:UID', getUserProfile);

module.exports = router;
 