const { v4: uuidv4 } = require("uuid");

const params = (fileName) => {
  const myFile = fileName.originalname.split(".");
  const fileType = myFile[myFile.length - 1];

  const imageParams = {
    Bucket: "user-images-01d35dd6-b7e9-486c-b5b0-0cb11a412f27",
    Key: `${uuidv4()}.${fileType}`,
    Body: fileName.buffer,
    ACL: "public-read" // allow read access to this file
  };
  return imageParams;
};

module.exports = params;
