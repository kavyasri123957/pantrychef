-- PantryChef Database Schema (MySQL)
CREATE DATABASE IF NOT EXISTS pantrychef;
USE pantrychef;

-- 1. Users (login)
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(150) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(100),
  dietary_preference VARCHAR(50) DEFAULT 'none',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Ingredient Inventory (per user)
CREATE TABLE IF NOT EXISTS ingredients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  quantity VARCHAR(50) DEFAULT '1',
  added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 3. Recipes (cached / saved)
CREATE TABLE IF NOT EXISTS recipes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  ingredients_json TEXT,
  instructions_json TEXT,
  cook_time VARCHAR(50),
  difficulty VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 4. Nutrition info (1-to-1 with recipe)
CREATE TABLE IF NOT EXISTS nutrition (
  id INT AUTO_INCREMENT PRIMARY KEY,
  recipe_id INT NOT NULL UNIQUE,
  calories INT,
  protein_g INT,
  carbs_g INT,
  fat_g INT,
  fiber_g INT,
  health_tips TEXT,
  FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE
);
