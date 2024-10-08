const {
	fetchSnacks,
	fetchSnackBySnackId,
	addSnack,
} = require("../models/snacks.models");

const getSnacks = (request, response, next) => {
	const { sort_by, category_id } = request.query;
	fetchSnacks(sort_by, category_id)
		.then((snacks) => {
			response.status(200).send({ snacks });
		})
		.catch((err) => {
			next(err);
		});
};

const getSnackBySnackId = (request, response, next) => {
	const { snack_id } = request.params;
	fetchSnackBySnackId(snack_id)
		.then((snack) => {
			response.status(200).send({ snack });
		})
		.catch((err) => {
			next(err);
		});
};

const postSnack = (request, response) => {
	const newSnack = request.body;
	addSnack(newSnack).then((snack) => {
		response.status(201).send({ newSnack: snack });
	});
};

module.exports = { getSnacks, getSnackBySnackId, postSnack };
