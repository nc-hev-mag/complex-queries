const { createRef } = require("../utils/index");

describe("createRef", () => {
	it("returns an empty object when passed and empty array", () => {
		const categoryRows = [];
		const expectedRef = {};
		expect(createRef(categoryRows)).toEqual(expectedRef);
	});
	it("a singular category array has it's id added on a key of it's name", () => {
		const categoryRows = [{ category_id: 1, category_name: "category a" }];
		const expectedRef = { "category a": 1 };
		expect(createRef(categoryRows)).toEqual(expectedRef);
	});
	it("a multi category array has each id added as a key of each name", () => {
		const categoryRows = [
			{ category_id: 1, category_name: "category a" },
			{ category_id: 2, category_name: "category b" },
			{ category_id: 9, category_name: "category rose" },
		];
		const expectedRef = {
			"category a": 1,
			"category b": 2,
			"category rose": 9,
		};
		expect(createRef(categoryRows)).toEqual(expectedRef);
	});
});
