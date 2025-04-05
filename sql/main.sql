CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE DATABASE transport;

CREATE TYPE role AS ENUM ('user', 'admin', 'fleet_manager');
CREATE TYPE user_status AS ENUM ('active', 'inactive');

CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(50) NOT NULL UNIQUE,
    user_name VARCHAR(50) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role role DEFAULT 'user',
    status user_status DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT updated_at_check CHECK (updated_at >= created_at)
);

INSERT INTO users (user_id, email, user_name, password, role, status)
VALUES 
(uuid_generate_v4(), 'john.doe@example.com', 'johndoe', 'hashedpassword1', 'user', 'active'),
(uuid_generate_v4(), 'admin@example.com', 'adminuser', 'hashedpassword2', 'admin', 'active'),
(uuid_generate_v4(), 'manager@example.com', 'fleetmanager', 'hashedpassword3', 'fleet_manager', 'inactive');

CREATE TYPE transport_type AS ENUM ('car', 'truck', 'motorcycle', 'bus');
CREATE TYPE transport_status AS ENUM ('available', 'in_service', 'out_of_service');

CREATE TABLE transport (
    transport_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    registrationNumber VARCHAR(50) NOT NULL UNIQUE,
    type transport_type DEFAULT 'car',
    make VARCHAR(50),
    model VARCHAR(50),
    year INT,
    status transport_status DEFAULT 'available',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT updated_at_check CHECK (updated_at >= created_at)
);

INSERT INTO transport (transport_id, registrationNumber, type, make, model, year, status)
VALUES 
(uuid_generate_v4(), '01A123AA', 'car', 'Toyota', 'Camry', 2020, 'available'),
(uuid_generate_v4(), '10B456BB', 'truck', 'Isuzu', 'NPR', 2018, 'in_service'),
(uuid_generate_v4(), '80C789CC', 'bus', 'Mercedes', 'Sprinter', 2019, 'out_of_service');

CREATE TYPE order_status AS ENUM ('pending', 'approved', 'rejected', 'completed');
CREATE TYPE currency_type AS ENUM ('USD', 'EUR', 'UZS');

CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    transportId UUID NOT NULL,
    userId UUID NOT NULL,
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    status order_status DEFAULT 'pending',
    totalAmount DECIMAL(10, 2) NOT NULL,
    currency currency_type DEFAULT 'UZS',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (transportId) REFERENCES transport (transport_id) ON DELETE CASCADE,
    FOREIGN KEY (userId) REFERENCES users (user_id) ON DELETE CASCADE,
    CONSTRAINT updated_at_check CHECK (updated_at >= created_at)
);

INSERT INTO orders (id, transportId, userId, startDate, endDate, totalAmount, currency, status)
VALUES 
(uuid_generate_v4(), (SELECT transport_id FROM transport LIMIT 1), (SELECT user_id FROM users LIMIT 1), '2024-04-01', '2024-04-05', 100.00, 'USD', 'approved'),
(uuid_generate_v4(), (SELECT transport_id FROM transport LIMIT 1 OFFSET 1), (SELECT user_id FROM users LIMIT 1 OFFSET 1), '2024-05-10', '2024-05-15', 500.00, 'EUR', 'pending'),
(uuid_generate_v4(), (SELECT transport_id FROM transport LIMIT 1 OFFSET 2), (SELECT user_id FROM users LIMIT 1 OFFSET 2), '2024-06-01', '2024-06-07', 300.00, 'UZS', 'completed');

CREATE TYPE repair_status AS ENUM ('pending', 'in_progress', 'completed');

    CREATE TABLE repair (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        transportId UUID NOT NULL,
        description TEXT NOT NULL,
        cost DECIMAL(10, 2) NOT NULL,
        date DATE NOT NULL,
        status repair_status DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (transportId) REFERENCES transport (transport_id) ON DELETE CASCADE,
        CONSTRAINT updated_at_check CHECK (updated_at >= created_at)
    );

INSERT INTO repair (id, transportId, description, cost, date, status)
VALUES 
(uuid_generate_v4(), (SELECT transport_id FROM transport LIMIT 1), 'Oil change and filter replacement', 50.00, '2024-03-20', 'completed'),
(uuid_generate_v4(), (SELECT transport_id FROM transport LIMIT 1 OFFSET 1), 'Brake system repair', 200.00, '2024-04-02', 'in_progress'),
(uuid_generate_v4(), (SELECT transport_id FROM transport LIMIT 1 OFFSET 2), 'Engine diagnostics and tuning', 150.00, '2024-04-03', 'pending');

CREATE TABLE report (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    transportId UUID NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (transportId) REFERENCES transport (transport_id) ON DELETE CASCADE,
    CONSTRAINT updated_at_check CHECK (updated_at >= created_at)
);



INSERT INTO report (id, transportId, title, description)
VALUES 
(uuid_generate_v4(), (SELECT transport_id FROM transport LIMIT 1), 'Monthly usage report', 'Vehicle used for delivery across Tashkent region.'),
(uuid_generate_v4(), (SELECT transport_id FROM transport LIMIT 1 OFFSET 1), 'Accident report', 'Minor accident while reversing near warehouse.'),
(uuid_generate_v4(), (SELECT transport_id FROM transport LIMIT 1 OFFSET 2), 'Fuel efficiency report', 'Fuel consumption higher than expected for current routes.');

SELECT * FROM users;
SELECT * FROM transport;
SELECT * FROM orders;
SELECT * FROM repair;
SELECT * FROM report;