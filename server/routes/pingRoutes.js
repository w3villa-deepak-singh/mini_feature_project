const express = require('express');
const { ping } = require('../controllers/pingController');
const {jwtAuthMiddleware, generateToken} = require('./../jwt');

const router = express.Router();

router.get('/ping',jwtAuthMiddleware, ping);

module.exports = router;
