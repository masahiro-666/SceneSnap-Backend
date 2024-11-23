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

