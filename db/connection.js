const { Pool } = require("pg");
const pool = new Pool();

if (!process.env.PGDATABASE) {
	throw new Error("PGDATABASE not set");
}

module.exports = pool;
