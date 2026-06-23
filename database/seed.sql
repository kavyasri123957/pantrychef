USE pantrychef;

-- Demo User
INSERT INTO users (email, password_hash, name, dietary_preference)
VALUES (
'demo@pantrychef.com',
'$2b$10$E9Q0sXHWv0kJ8JZcW0Z7XOQH8Q1nGm2bV9eXQ5GqGqGqGqGqGqGqG',
'Demo User',
'none'
);

-- Ingredients
INSERT INTO ingredients (user_id, name, quantity) VALUES
(1,'chicken','500g'),
(1,'garlic','10 cloves'),
(1,'tomato','5'),
(1,'olive oil','500ml'),
(1,'rice','1kg'),
(1,'onion','4'),
(1,'fish','300g'),
(1,'egg','6'),
(1,'paneer','250g'),
(1,'carrot','3'),
(1,'peas','200g'),
(1,'beans','200g'),
(1,'potato','4'),
(1,'mushroom','250g'),
(1,'cucumber','2'),
(1,'lemon','2'),
(1,'butter','200g'),
(1,'spices','100g'),
(1,'pasta','500g'),
(1,'mutton','500g');

-- Recipes
INSERT INTO recipes
(title, ingredients, instructions, calories, protein, carbs, fat)
VALUES

('Garlic Chicken',
'chicken, garlic, olive oil',
'Marinate chicken with garlic. Cook in olive oil until golden brown.',
420,38,12,22),

('Chicken Tomato Curry',
'chicken, tomato, garlic',
'Cook garlic and tomatoes. Add chicken and simmer until tender.',
380,35,10,18),

('Chicken Fried Rice',
'chicken, rice, carrot, peas',
'Cook chicken and vegetables. Mix with rice and stir fry.',
450,30,45,12),

('Egg Fried Rice',
'egg, rice, onion, carrot',
'Scramble eggs and mix with cooked rice and vegetables.',
350,18,40,10),

('Chicken Biryani',
'chicken, rice, onion, spices',
'Cook chicken with spices and layer with rice.',
550,40,60,18),

('Fish Curry',
'fish, tomato, garlic',
'Cook fish in tomato garlic curry gravy.',
320,28,8,15),

('Grilled Fish',
'fish, lemon, olive oil',
'Season fish and grill until cooked.',
280,32,2,12),

('Mutton Curry',
'mutton, onion, tomato',
'Cook mutton slowly in onion tomato gravy.',
500,38,10,28),

('Paneer Butter Masala',
'paneer, tomato, butter',
'Cook paneer in rich tomato butter sauce.',
420,18,15,30),

('Veg Fried Rice',
'rice, carrot, peas, beans',
'Stir fry vegetables and mix with rice.',
300,8,50,5),

('Vegetable Curry',
'potato, carrot, peas, onion',
'Cook vegetables in curry sauce.',
250,6,35,7),

('Tomato Soup',
'tomato, garlic, onion',
'Blend tomatoes and cook into soup.',
150,4,20,3),

('Pasta Primavera',
'pasta, tomato, carrot, beans',
'Cook pasta and toss with vegetables.',
340,10,55,8),

('Mushroom Masala',
'mushroom, onion, tomato',
'Cook mushrooms in spicy tomato gravy.',
220,8,18,9),

('Vegetable Salad',
'cucumber, tomato, carrot',
'Mix fresh vegetables and serve chilled.',
120,3,12,2);