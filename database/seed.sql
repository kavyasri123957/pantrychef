USE pantrychef;

-- Demo user: email=demo@pantrychef.com  password=demo123
-- (bcrypt hash for 'demo123')
INSERT INTO users (email, password_hash, name, dietary_preference) VALUES
('demo@pantrychef.com', '$2b$10$E9Q0sXHWv0kJ8JZcW0Z7XOQH8Q1nGm2bV9eXQ5GqGqGqGqGqGqGqG', 'Demo User', 'none');

INSERT INTO ingredients (user_id, name, quantity) VALUES
(1, 'chicken', '500g'),
(1, 'garlic', '4 cloves'),
(1, 'tomato', '3'),
(1, 'olive oil', '2 tbsp');
