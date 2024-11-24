const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv');
const generateUploadURL = require('./s3'); // Your function for S3 upload URL
const adminRouter = require('./route/Admin');
const movieRouter = require('./route/Movie');
const bookingRouter = require('./route/Booking');
const customerRouter = require('./route/Customer');

dotenv.config();
const app = express();

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: process.env.MYSQL_SERVER,
  port: process.env.MYSQL_SERVER_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: 'SceneSnap', // Directly set the database here
  insecureAuth: true,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000,
});

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(cors({
  origin: '*'
})); // Enable CORS

// Test MySQL connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    throw err;
  }
  console.log('Connected to MySQL!');
  connection.release(); // Release the connection after test
});

// Routes
app.use("/admin", adminRouter);
app.use("/movie", movieRouter);
app.use("/customer", customerRouter);
app.use("/booking", bookingRouter);

// S3 URL generation endpoint
app.get('/s3Url', async (req, res) => {
  try {
    const url = await generateUploadURL();
    res.json({ url });
  } catch (error) {
    console.error("Error generating upload URL:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the Express server
const port = 3306;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = { pool };