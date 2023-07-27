require("dotenv").config();
const { Pool } = require("pg");

const connectionString = `postgresql://ahnaf:1234@localhost:5432/food`;

const proConfig = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString:
    process.env.NODE_ENV === "production" ? proConfig : connectionString,
  ssl: { rejectUnauthorized: false },
});

module.exports = pool;
