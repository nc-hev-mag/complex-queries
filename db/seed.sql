\c nc_snacks

CREATE TABLE categories(
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(40) NOT NULL
);

INSERT INTO categories(category_name)
VALUES
('crisps'),
('pastry'),
('biscuits'),
('cake');

CREATE TABLE snacks(
    snack_id SERIAL PRIMARY KEY,
    snack_name VARCHAR(40) NOT NULL,
    snack_description VARCHAR(100),
    price_in_pence INT,
    category_id INT REFERENCES categories(category_id)
);

INSERT INTO snacks
    (snack_name, snack_description, price_in_pence, category_id)
VALUES
    ('Party Rings', 'No party is complete without them!', 120, 3),
    ('Hula Hoops', 'The party ring of the crisp world', 80, 1),
    ('Pasty', null, 300, 2),
    ('Nice Biscuits', 'More like ''alright'' biscuits', 150, 3),
    ('Gyoza', 'Like a tiny pasty', 450, 2),
    ('Vol-au-vents', 'ooh lala!', 320, 2);

CREATE TABLE vending_machines (
    vm_id SERIAL PRIMARY KEY,
    vm_location VARCHAR(100),
    vm_rating INT
);

INSERT INTO vending_machines(vm_location, vm_rating)
VALUES 
('Cobham Services floor 1', 10),
('The Olympiad, Chippenham', 2),
('Manchester Arndale', 4),
('Eureka, Halifax', 5);

CREATE TABLE snacks_vending_machines (
    snack_id INT REFERENCES snacks(snack_id),
    vm_id INT REFERENCES vending_machines(vm_id)
);

INSERT INTO snacks_vending_machines (snack_id, vm_id)
VALUES
(1, 1),
(2, 1),
(4, 1),
(1, 2),
(5, 2),
(1, 3),
(3, 2), 
(3, 3),
(4, 3),
(5, 3),
(6, 3),
(4, 4),
(6, 4), 
(4, 2);