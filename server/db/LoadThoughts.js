const AWS = require("aws-sdk");
const fs = require("fs");

// aws config
AWS.config.update({
  region: "us-east-2",
  endpoint: "http://localhost:8000",
});
// dynamo config, this time using DynamoDB.DocumentClient class
const dynamodb = new AWS.DynamoDB.DocumentClient({ apiVersion: "2012-08-10" });

// import user.json seed array
console.log("One sec, importing thoughts into DynamoDB.");
// path for fs is relative to where the file is executed (root)
const allUsers = JSON.parse(
  fs.readFileSync("./server/seed/user.json", "utf8")
);

allUsers.forEach((user) => {
  const params = {
    TableName: "Thoughts",
    Item: {
      username: user.username,
      createdAt: user.createdAt,
      thought: user.thought,
    },
  };
  // call the database with current user
  dynamodb.put(params, (err, data) => {
    if (err) {
      console.error(
        "Unable to add thought",
        user.username,
        ". Error JSON:",
        JSON.stringify(err, null, 2)
      );
    } else {
      console.log("PutItem succeeded:", user.username);
    }
  });
});
