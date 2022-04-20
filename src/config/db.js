const { Client } = require("pg");
require("dotenv").config();

const db = new Client({
  host: process.env.DB_HOST | "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});
db.connect((err) => {
  if (err) {
    console.log("failed connect db", err);
  } else {
    console.log("db connected");
  }
});

module.exports = db;
