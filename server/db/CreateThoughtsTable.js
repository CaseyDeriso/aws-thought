const AWS = require("aws-sdk");

// modify AWS config object for DynamoDB to use to connect to local instance
AWS.config.update({
  region: "us-east-2",
  endpoint: "http://localhost:8000",
});

// create DynamoDB service interface object w/ DynamoDB class.
// api version is latest with Long Term Support -LTS-
const dynamodb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

// create params object that will hold schema and metadata of table
const params = {
  TableName: "Thoughts",
  KeySchema: [
    { AttributeName: "username", KeyType: "HASH" }, // Partition Key
    { AttributeName: "createdAt", KeyType: "RANGE" }, // Sort Key
  ],
  AttributeDefinitions: [
    { AttributeName: "username", AttributeType: "S" },
    { AttributeName: "createdAt", AttributeType: "N" },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10,
  },
};

// Make a call to the DynamoDB instance and create table
dynamodb.createTable(params, (err, data) => {
  if (err) {
    console.error(
      "Unable to create table. Error JSON:",
      JSON.stringify(err, null, 2)
    );
  } else {
    console.log(
      "created table. Table description JSON:",
      JSON.stringify(data, null, 2)
    );
  }
});
