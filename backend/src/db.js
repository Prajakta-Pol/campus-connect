const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "campus_connect",
  password: "2005", // change this
  port: 5432,
});

module.exports = pool;