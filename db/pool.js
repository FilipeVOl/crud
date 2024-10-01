const { Pool } = require("pg");

module.exports = new Pool({
    host: "localhost",
    user: "postgres",
    database: "steam",
    password: "@@!!wwaa",
    port: 5432
});