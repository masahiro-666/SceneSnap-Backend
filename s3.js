const mysql = require('mysql2')
const express = require('express');
require('dotenv').config();
const app = express()

const connection = mysql.createConnection({
  host: process.env.MYSQL_SERVER,
  port: process.env.MYSQL_SERVER_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  insecureAuth: true,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000,
})

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    throw err;
  }
  console.log('Connected to MySQL!');
  connection.query('USE SceneSnap;', (err, result) => {
    if (err) {
      console.error('Error selecting database:', err);
      throw err;
    }
    console.log('Connected to SceneSnap database');
  });
});

function getConnection() {
  return connection
}


module.exports = {
  getConnection
}



And

const dotenv = require('dotenv');
const aws = require('aws-sdk');
const crypto = require('crypto');
const { promisify } = require('util');
const randomBytes = promisify(crypto.randomBytes);

dotenv.config();

const region = "ap-southeast-1";
const bucketName = "scenesnap-buckets";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4'
});

async function generateUploadURL() {
  const rawBytes = await randomBytes(16);
  const imageName = rawBytes.toString('hex');

  const params = {
    Bucket: bucketName,
    Key: imageName,
    Expires: 60
  };

  const uploadURL = await s3.getSignedUrlPromise('putObject', params);
  return uploadURL;
}

module.exports = { generateUploadURL };