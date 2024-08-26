const request = require("supertest");
const app = require("../app.js");
const db = require("../db/connection");
const seed = require("../db/seed.js");
const data = require("../db/test-data/index.js");

beforeEach(() => {
	return seed(data);
});

afterAll(() => {
	return db.end();
});

describe.only("GET /api/snacks", () => {
	test("200: response array contains data for all snacks", () => {
		return request(app)
			.get("/api/snacks")
			.expect(200)
			.then(({ body }) => {
				expect(body.snacks).toHaveLength(6);
				body.snacks.forEach((snack) => {
					expect(typeof snack.snack_id).toBe("number");
					expect(typeof snack.snack_name).toBe("string");
					expect(typeof snack.snack_description).toBe("string");
					expect(typeof snack["price_in_pence"]).toBe("number");
					expect(typeof snack.category_id).toBe("number");
				});
			});
	});
	test("200: accept a sort_by query, and order the response by the given column name in ascending order", () => {
		return request(app)
			.get("/api/snacks?sort_by=price_in_pence")
			.expect(200)
			.then(({ body }) => {
				expect(body.snacks).toBeSortedBy("price_in_pence", {
					descending: false,
				});
			});
	});
	test("400: reject if sort_by value is not valid/accepted", () => {
		return request(app)
			.get("/api/snacks?sort_by=muahahahaaha")
			.expect(400)
			.then(({ body }) => {
				expect(body.msg).toBe("invalid request");
			});
	});
	test("200: accept category_id query to filter the response by category", () => {
		return request(app)
			.get("/api/snacks?category_id=1")
			.expect(200)
			.then(({ body }) => {
				expect(body.snacks.length).toBe(2);
				body.snacks.forEach((snack) => {
					expect(snack.category_id).toBe(1);
				});
			});
	});
	test("200: can chain sort_by and categroy_id queries", () => {
		return request(app)
			.get("/api/snacks?sort_by=price_in_pence&category_id=2")
			.expect(200)
			.then(({ body }) => {
				expect(body.snacks).toBeSortedBy("price_in_pence");
				expect(body.snacks.length).toBe(3);
			});
	});
	test("400: reject if category_id is wrong type", () => {
		return request(app)
			.get("/api/snacks?category_id=banana")
			.expect(400)
			.then(({ body }) => {
				expect(body.msg).toBe("bad request");
			});
	});
	test("404: category_id not found but valid syntax", () => {
		return request(app)
			.get("/api/snacks?category_id=999")
			.expect(404)
			.then(({ body }) => {
				expect(body.msg).toBe("not found");
			});
	});
});

describe("GET /api/snacks/:snack_id", () => {
	it("responds with status 200 and an object containing the correct snack data", () => {
		return request(app)
			.get("/api/snacks/5")
			.expect(200)
			.then(({ body: { snack } }) => {
				expect(snack.snack_id).toBe(5);
				expect(snack.snack_name).toBe("snack c");
				expect(snack.snack_description).toBe("snack description c");
				expect(snack.price_in_pence).toBe(150);
				expect(snack.category_id).toBe(1);
			});
	});
	it("responds with status 400 and an error message if passed an invalid snack id", () => {
		return request(app)
			.get("/api/snacks/not-an-id")
			.expect(400)
			.then(({ body: { msg } }) => {
				expect(msg).toBe("bad request");
			});
	});
	it("responds with status 404 and an error message if passed a valid snack_id that does not exist in the database", () => {
		return request(app)
			.get("/api/snacks/1000")
			.expect(404)
			.then(({ body: { msg } }) => {
				expect(msg).toBe("not found");
			});
	});
});

describe("POST /api/snacks", () => {
	it("responds with status 201 and the created snack", () => {
		return request(app)
			.post("/api/snacks")
			.send({
				snack_name: "dairylea dunkers",
				snack_description: "finally a savoury alternative to yoghurt",
				price_in_pence: 122,
				category_id: 4,
			})
			.expect(201)
			.then(({ body: { newSnack } }) => {
				expect(newSnack.snack_name).toBe("dairylea dunkers");
				expect(newSnack.snack_description).toBe(
					"finally a savoury alternative to yoghurt"
				);
				expect(newSnack.price_in_pence).toBe(122);
				expect(newSnack.category_id).toBe(4);
			});
	});
});

describe("GET /api/vendors", () => {
	it("responds with status 200 and an array containing data for all vending machines", () => {
		return request(app)
			.get("/api/vendors")
			.expect(200)
			.then(({ body }) => {
				expect(body.vendingMachines.length).toBe(4);
				body.vendingMachines.forEach((vendingMachine) => {
					expect(typeof vendingMachine.id).toBe("number");
					expect(typeof vendingMachine.location).toBe("string");
					expect(typeof vendingMachine.rating).toBe("number");
				});
			});
	});
});

describe("GET /api/vendors/:vendorId", () => {
	it("responds with status 200 and an object containing the correct vending machine data", () => {
		return request(app)
			.get("/api/vendors/3")
			.expect(200)
			.then(({ body }) => {
				expect(body.vendingMachine.id).toBe(3);
				expect(body.vendingMachine.location).toBe("location c");
				expect(body.vendingMachine.rating).toBe(4);
			});
	});
});
