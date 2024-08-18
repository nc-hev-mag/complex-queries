const { createRef } = require("../utils/index");

describe("createRef", () => {
	it("returns an empty object when passed and empty array", () => {
		const categoryRows = [];
		const expectedRef = {};
		expect(createRef(categoryRows)).toEqual(expectedRef);
	});
	it("a singular category array has it's id added on a key of it's name", () => {
		const categoryRows = [{ category_id: 1, category_name: "Category A" }];
		const expectedRef = { "Category A": 1 };
		expect(createRef(categoryRows)).toEqual(expectedRef);
	});
	it("a multi category array has each id added as a key of each name", () => {
		const categoryRows = [
			{ category_id: 1, category_name: "Category A" },
			{ category_id: 2, category_name: "Category B" },
			{ category_id: 9, category_name: "Category Rose" },
		];
		const expectedRef = {
			"Category A": 1,
			"Category B": 2,
			"Category Rose": 9,
		};
		expect(createRef(categoryRows)).toEqual(expectedRef);
	});
});
