const db = require("../db/connection");

const fetchVendingMachines = () => {
	return db.query("SELECT * FROM vending_machines;").then(({ rows }) => {
		return rows;
	});
};

const fetchVendingMachineById = (id) => {
	return db
		.query(`SELECT * FROM vending_machines WHERE id = $1`, [id])
		.then(({ rows }) => {
			return rows[0];
		});
};
module.exports = { fetchVendingMachines, fetchVendingMachineById };
