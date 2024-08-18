const seed = require("./seed.js");
const db = require("./connection.js");
const data = require("./data");

seed(data)
	.then(() => {
		console.log("seeding complete");
		db.end();
	})
	.catch((err) => {
		console.log(err);
	});
