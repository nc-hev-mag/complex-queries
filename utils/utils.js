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

module.exports = { createRef, formatSnacksData };
