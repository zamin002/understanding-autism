const mysql = require("mysql2/promise");
require("dotenv").config();

// connection pool - keeping connectionLimit at 10 for now, might tweak later
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test connection on startup
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log(" MySQL connected successfully");
    connection.release();
  } catch (error) {
    console.error("MySQL connection failed:", error.message);
    console.error("Make sure MySQL is running and .env is configured.");
  }
}

module.exports = { pool, testConnection };
