const {
	fetchVendingMachines,
	fetchVendingMachineById,
} = require("../models/vendingMachines.models");

const getVendingMachines = (request, response) => {
	fetchVendingMachines().then((vendingMachines) => {
		response.status(200).send({ vendingMachines });
	});
};

const getVendingMachineById = (request, response) => {
	const { venderId } = request.params;
	fetchVendingMachineById(venderId).then((vendingMachine) => {
		response.status(200).send({ vendingMachine });
	});
};

module.exports = { getVendingMachines, getVendingMachineById };
