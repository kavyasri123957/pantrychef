# Frontend (React + Vite)

## Setup
```bash
npm install
cp .env.example .env   # set VITE_API_URL if backend is elsewhere
npm run dev            # http://localhost:5173
```

## Pages
- `/login`  → Login + Signup
- `/`       → Dashboard with 4 tabs:
  1. **Pantry** – Ingredient Inventory
  2. **Recipes** – Recommendations
  3. **Details** – Step-by-step instructions
  4. **Nutrition** – Calories, macros, health tips

Auth token is stored in `localStorage` and sent as `Bearer` header.
