const express = require("express");
const routes = express.Router();
const multer = require("multer");
const AWS = require("aws-sdk");
const router = require("./user-routes");

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
  // params config
  // S3 service call
});
