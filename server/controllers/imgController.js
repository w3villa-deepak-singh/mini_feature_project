const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = require('../config/awsConfig.js');


// Configure Multer-S3
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET_NAME,
    // acl: 'public-read', 
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + '-' + file.originalname);
    //    cb(null, file.originalname)
    },
  }),
}).single('image');

// Controller for uploading image to S3
const uploadImage = (req, res) => {
  upload(req, res, function (error) {
    if (error) {
        console.log('Upload Error:', error);
        if (error instanceof multer.MulterError) {
          // Handle Multer-specific errors
          return res.status(400).json({ message: 'Multer error occurred while uploading.', error });
        } else {
          // Handle other errors
          return res.status(500).json({ message: 'An error occurred during file upload.', error });
        }
      }
      // If no file was uploaded
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded.' });
      }
    const file = req.file;
    const imageUrl = file.location;
    res.status(200).json({ message: 'Image uploaded successfully!', imageUrl });
  });
};

// Controller for fetching image from S3
// const getImage = (req, res) => {
//   const key = req.params.key;
//   const params = {
//     Bucket: process.env.AWS_S3_BUCKET_NAME,
//     Key: key,
//   };

//   s3.getObject(params, (err, data) => {
//     if (err) {
//       return res.status(500).json({ message: 'Error fetching image', error: err });
//     }
//     res.writeHead(200, { 'Content-Type': data.ContentType });
//     res.write(data.Body, 'binary');
//     res.end(null, 'binary');
//   });
// };


module.exports = {
    uploadImage
  };
