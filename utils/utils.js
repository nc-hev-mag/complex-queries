const db = require("../db/connection");
const format = require("pg-format");

const checkExists = (table_name, column_name, value) => {
	const queryStr = format(
		"SELECT * FROM %I WHERE %I = $1",
		table_name,
		column_name
	);
	return db.query(queryStr, [value]).then(({ rows }) => {
		if (rows.length === 0) {
			return Promise.reject({ status: 404, msg: "not found" });
		}
	});
};

const createRef = (categories) => {
	const refObj = {};
	categories.forEach((category) => {
		refObj[category.category_name] = category.category_id;
	});
	return refObj;
};

const formatSnacksData = (snacks, ref) => {
	return snacks.map((snack) => {
		return [
			snack.snack_name,
			snack.snack_description,
			snack["price_in_pence"],
			ref[snack.category],
		];
	});
};

module.exports = { createRef, formatSnacksData, checkExists };
