CREATE DATABASE IF NOT EXISTS core_inventory;
USE core_inventory;

-- Warehouses Table
CREATE TABLE IF NOT EXISTS warehouse (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address TEXT
);

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    -- role ENUM('manager', 'staff') DEFAULT 'staff' NOT NULL,
    warehouse_id VARCHAR(36),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY (warehouse_id) REFERENCES warehouse(id) ON DELETE SET NULL
);

-- Locations Table
CREATE TABLE IF NOT EXISTS locations (
    id VARCHAR(36) PRIMARY KEY,
    warehouse_id VARCHAR(36) NOT NULL,
    name VARCHAR(255) NOT NULL,
    FOREIGN KEY (warehouse_id) REFERENCES warehouse(id) ON DELETE CASCADE
);

-- Categories Table
CREATE TABLE IF NOT EXISTS categories (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

-- Products Table
CREATE TABLE IF NOT EXISTS products (
    id VARCHAR(36) PRIMARY KEY,
    sku VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    category_id VARCHAR(36) NOT NULL,
    unit_of_measure VARCHAR(50) NOT NULL,
    image_url TEXT,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT
);

-- Stock Levels Table
CREATE TABLE IF NOT EXISTS stock_levels (
    id VARCHAR(36) PRIMARY KEY,
    product_id VARCHAR(36) NOT NULL,
    location_id VARCHAR(36) NOT NULL,
    quantity INT DEFAULT 0 NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (location_id) REFERENCES locations(id) ON DELETE CASCADE
);

-- Stock Moves Ledger
CREATE TABLE IF NOT EXISTS stock_moves (
    id VARCHAR(36) PRIMARY KEY,
    type ENUM('receipt', 'delivery', 'internal', 'adjustment') NOT NULL,
    status ENUM('draft', 'waiting', 'ready', 'done', 'canceled') DEFAULT 'draft' NOT NULL,
    source_location_id VARCHAR(36),
    destination_location_id VARCHAR(36),
    created_by VARCHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY (source_location_id) REFERENCES locations(id) ON DELETE SET NULL,
    FOREIGN KEY (destination_location_id) REFERENCES locations(id) ON DELETE SET NULL,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE RESTRICT
);

-- Stock Move Items
CREATE TABLE IF NOT EXISTS stock_move_items (
    id VARCHAR(36) PRIMARY KEY,
    stock_move_id VARCHAR(36) NOT NULL,
    product_id VARCHAR(36) NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (stock_move_id) REFERENCES stock_moves(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);