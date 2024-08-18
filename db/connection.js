const { Pool } = require("pg");
const pool = new Pool();

const ENV = process.env.NODE_ENV || "development";

const pathToFile = `${__dirname}/../.env.${ENV}`;

require("dotenv").config({ path: pathToFile });

console.log(pathToFile);

if (!process.env.PGDATABASE) {
	throw new Error("PGDATABASE not set");
}

module.exports = pool;
