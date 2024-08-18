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
	const { vendorId } = request.params;
	fetchVendingMachineById(vendorId).then((vendingMachine) => {
		response.status(200).send({ vendingMachine });
	});
};

module.exports = { getVendingMachines, getVendingMachineById };
