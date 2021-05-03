const express = require("express");
const router = express.Router();
const multer = require("multer");
const AWS = require("aws-sdk");
const paramsConfig = require("../utils/params-config");

const storage = multer.memoryStorage({
  desination: function (req, file, callback) {
    callback(null, "");
  },
});

// image is the key
const upload = multer({ storage }).single("image");

// create s3 service object
const s3 = new AWS.S3({
  apiVersion: "2006-03-01",
});

router.post("/image-upload", upload, (req, res) => {
  // use imported params config from utils
  const params = paramsConfig(req.file);
  // S3 service call
  s3.upload(params, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    }
    res.json(data);
  });
});

module.exports = router;
