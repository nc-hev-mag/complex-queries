const { Pool } = require("pg");
const pool = new Pool();

const ENV = process.env.NODE_ENV || "development";
const pathToFile = `${__dirname}/../.env.${ENV}`;

require("dotenv").config({ path: pathToFile });

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
	throw new Error("PGDATABASE not set");
}
const config = {};

if (ENV === "production") {
	config.connectionString = process.env.DATABASE_URL;
	config.max = 2;
}
module.exports = new Pool(config);
