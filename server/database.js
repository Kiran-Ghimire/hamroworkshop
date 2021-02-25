const { createPool } = require("mysql");
require("dotenv").config();

const db = createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    connectionLimit: 100,
  });
  
  //check connection
  db.getConnection((error) => {
    error ? console.log(error) : console.log("MYSQL connected.");
  });
  
  module.exports = db;