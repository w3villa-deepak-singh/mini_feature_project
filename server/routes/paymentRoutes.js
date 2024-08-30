const express = require('express');
const router = express.Router();
const { payment } = require('../controllers/paymentController');
const { jwtAuthMiddleware } = require('../jwt')



router.post('/payment',jwtAuthMiddleware, payment);


module.exports = router;
