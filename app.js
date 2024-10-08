const express = require("express");
const app = express();
const {
	getSnacks,
	getSnackBySnackId,
	postSnack,
} = require("./controllers/snacks.controllers");
const {
	getVendingMachines,
	getVendingMachineById,
} = require("./controllers/vendingMachines.controllers");
const {
	psqlErrorHandler,
	customErrorHandler,
	serverErrorHandler,
} = require("./errors");
const endpoints = require("./endpoints.json");
app.use(express.json());

app.get("/api", (request, response) => {
	response.status(200).send({ endpoints });
});

app.get("/api/snacks", getSnacks);

app.get("/api/snacks/:snack_id", getSnackBySnackId);

app.post("/api/snacks", postSnack);

app.get("/api/vendors", getVendingMachines);

app.get("/api/vendors/:vendorId", getVendingMachineById);

app.use(psqlErrorHandler);

app.use(customErrorHandler);

app.use(serverErrorHandler);

module.exports = app;
