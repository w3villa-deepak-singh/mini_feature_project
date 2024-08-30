const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imgController');

// Route to upload an image
router.post('/uploadImg', imageController.uploadImage);



module.exports = router;
