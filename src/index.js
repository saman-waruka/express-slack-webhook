const express = require("express");
const AWS = require("aws-sdk");
const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "../.env"),
});

AWS.config.update({
  apiVersion: process.env.AWS_API_VERSION,
  accessKeyId: process.env.AWS_Access_Key_Id,
  secretAccessKey: process.env.AWS_Secret_Key,
  region: process.env.AWS_REGION,
});

// create an ec2 object
const ec2 = new AWS.EC2({ apiVersion: process.env.AWS_API_VERSION });

// console.log({
//   apiVersion: process.env.AWS_API_VERSION,
//   accessKeyId: process.env.AWS_Access_Key_Id,
//   secretAccessKey: process.env.AWS_Secret_Key,
//   region: process.env.AWS_REGION,
//   id: process.env.AWS_EC2_INSTANCE_ID,
// });

const app = express();
const port = 8888;

app.post("/", (req, res) => {
  res.send("print test!!!!");
});

app.post("/start", (req, res) => {
  // setup instance params
  const params = {
    InstanceIds: [process.env.AWS_EC2_INSTANCE_ID],
  };

  ec2.startInstances(params, function (err, data) {
    if (err) {
      console.log(err, err.stack); // an error occurred
      res.send({ message: "start unsuccess!", data }, 400);
    } else {
      console.log(" start "); // successful response
      console.log(data); // successful response
      res.send({ message: "start success!", data }, 200);
    }
  });
});

app.post("/stop", (req, res) => {
  // setup instance params
  const params = {
    InstanceIds: [process.env.AWS_EC2_INSTANCE_ID],
  };
  console.log({ params, ec2 });
  ec2.stopInstances(params, function (err, data) {
    if (err) {
      console.log(err, err.stack); // an error occurred
      res.send({ message: "stop unsuccess!", data }, 400);
    } else {
      console.log(" stop "); // successful response
      console.log(data); // successful response
      res.send({ message: "stop success!", data }, 200);
    }
  });
});

app.post("/reboot", (req, res) => {
  // setup instance params
  const params = {
    InstanceIds: [process.env.AWS_EC2_INSTANCE_ID],
  };

  ec2.rebootInstances(params, function (err, data) {
    if (err) {
      console.log(err, err.stack); // an error occurred
      res.send({ message: "reboot unsuccess!", err }, 400);
    } else {
      console.log(" reboot "); // successful response
      console.log(data); // successful response
      res.send({ message: "reboot success!", data }, 200);
    }
  });
});
app.post("/status", (req, res) => {
  // setup instance params
  const params = {
    IncludeAllInstances: true,
  };

  ec2.describeInstanceStatus(params, function (err, data) {
    if (err) {
      console.log(err, err.stack); // an error occurred
      res.send({ message: "get status unsuccess!", err }, 400);
    } else {
      console.log(" status "); // successful response
      console.log(data); // successful response
      res.send({ message: "get status success!", data }, 200);
    }
  });
});
app.post("/des-instance", (req, res) => {
  ec2.describeInstances({}, function (err, data) {
    if (err) {
      console.log(err, err.stack); // an error occurred
      res.send({ message: "get reportInstanceStatus unsuccess!", err }, 400);
    } else {
      console.log(" status "); // successful response
      console.log(data); // successful response
      res.send({ message: "get reportInstanceStatus success!", data }, 200);
    }
  });
});

app.post("/sum", (req, res) => {
  // setup instance params
  const params = {
    InstanceId: process.env.AWS_EC2_INSTANCE_ID,
  };
  ec2.getConsoleOutput(params, function (err, data) {
    if (err) {
      console.log(err, err.stack); // an error occurred
      res.send({ message: "get reportInstanceStatus unsuccess!", err }, 400);
    } else {
      console.log(" status "); // successful response
      console.log(data); // successful response
      res.send({ message: "get reportInstanceStatus success!", data }, 200);
    }
  });
});

app.get("/", (req, res) => {
  res.send("print test!!!!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
