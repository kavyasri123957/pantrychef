# Backend (Node.js + Express)

REST API for PantryChef.

## Setup
```bash
npm install
cp .env.example .env   # edit DB credentials
npm start              # http://localhost:5000
```

## Endpoints

### Auth (Login page)
- `POST /api/auth/signup` `{ email, password, name }` → `{ token, user }`
- `POST /api/auth/login`  `{ email, password }`       → `{ token, user }`

All routes below require header `Authorization: Bearer <token>`.

### Module 1 - Ingredients
- `GET    /api/ingredients`     - list pantry
- `POST   /api/ingredients`     - `{ name, quantity }`
- `DELETE /api/ingredients/:id` - remove

### Module 2 & 3 - Recipes
- `POST /api/recipes/match` - generate recipes from current pantry
- `GET  /api/recipes`       - list saved recipes
- `GET  /api/recipes/:id`   - full recipe + step-by-step instructions

### Module 4 - Nutrition
- `GET /api/nutrition/:recipeId`    - calories/macros/health tips
- `PUT /api/nutrition/preference`   - `{ preference: 'vegetarian' | 'vegan' | 'keto' | 'none' }`
