const express = require("express");
const router = express.Router();

const AWS = require("aws-sdk");
const awsConfig = {
  region: "us-east-2",
};
AWS.config.update(awsConfig);
const dynamodb = new AWS.DynamoDB.DocumentClient();
const table = "Thoughts";
/////////////////////////////////////
// /api/users => get all thoughts ///
router.get("/users", (req, res) => {
  const params = {
    TableName: table,
  };
  // Scan return all items in the table
  dynamodb.scan(params, (err, data) => {
    if (err) {
      res.status(500).json(err); // internal server error occured
    } else {
      res.json(data.Items);
    }
  });
});
//////////////////////////////////////////////////////////
/// /api/users/:username get all thoughts by :username ///
router.get("/users/:username", (req, res) => {
  console.log(`Querying for thought(s) from ${req.params.username}.`);
  const params = {
    TableName: table,
    KeyConditionExpression: "#un = :user",
    ExpressionAttributeNames: {
      "#un": "username",
      "#ca": "createdAt",
      "#th": "thought",
      "#im": "image",
    },
    ExpressionAttributeValues: {
      ":user": req.params.username,
    },
    ProjectionExpression: "#th, #ca, #im",
    ScanIndexForward: false,
  };
  // Query the db with the params object
  dynamodb.query(params, (err, data) => {
    if (err) {
      console.error("Unable to query. 🪵 :", JSON.stringify(err, null, 2));
      res.status(500).json(err); // an error occurred
    } else {
      console.log("Query succeeded. 👍");
      res.json(data.Items);
    }
  });
});
////////////////////////////////
/// /api/users POST new thought ///
router.post("/users", (req, res) => {
  const params = {
    TableName: table,
    Item: {
      username: req.body.username,
      createdAt: Date.now(),
      thought: req.body.thought,
      image: req.body.image 
    },
  };
  dynamodb.put(params, (err, data) => {
    if (err) {
      console.error("Unable to add item. 🪵 :", JSON.stringify(err, null, 2));
      res.status(500).json(err); // an error occurred
    } else {
      console.log("Added item:", JSON.stringify(data, null, 2));
      res.json({ Added: JSON.stringify(data, null, 2) });
    }
  });
});

module.exports = router;
