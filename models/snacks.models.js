const db = require("../db/connection");
const { checkExists } = require("../utils/utils");

const fetchSnacks = (sort_by = "snack_name", category_id) => {
	let queryStr = "SELECT * FROM snacks";
	const queryVals = [];
	const validColumns = [
		"snack_id",
		"snack_name",
		"snack_description",
		"price_in_pence",
	];
	const queryProms = [];

	if (category_id) {
		queryStr += ` WHERE category_id = $1`;
		queryVals.push(category_id);
		queryProms[1] = checkExists("categories", "category_id", category_id);
	}

	if (sort_by) {
		if (!validColumns.includes(sort_by)) {
			return Promise.reject({ status: 400, msg: "invalid request" });
		} else {
			queryStr += ` ORDER BY ${sort_by}`;
		}
	}
	queryProms[0] = db.query(queryStr, queryVals);
	return Promise.all(queryProms).then((promResults) => {
		return promResults[0].rows;
	});
};

const fetchSnackBySnackId = (id) => {
	return db
		.query(`SELECT * FROM snacks WHERE snack_id=$1`, [id])
		.then(({ rows }) => {
			if (rows.length === 0) {
				return Promise.reject({ status: 404, msg: "not found" });
			}
			return rows[0];
		});
};

const addSnack = (newSnack) => {
	const { snack_name, snack_description, price_in_pence, category_id } =
		newSnack;
	return db
		.query(
			`INSERT INTO snacks (snack_name, snack_description, price_in_pence, category_id) VALUES ($1, $2, $3, $4) RETURNING *`,
			[snack_name, snack_description, price_in_pence, category_id]
		)
		.then(({ rows }) => {
			return rows[0];
		});
};

module.exports = { fetchSnacks, fetchSnackBySnackId, addSnack };
