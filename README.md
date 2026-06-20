# PantryChef - Intelligent Food Recommendation System

A simple, structured web application with **separated frontend, backend, and database** layers.

## Modules
1. **Ingredient Inventory Management** - add/remove pantry items
2. **Recipe Matching and Recommendation** - AI-powered recipe suggestions
3. **Recipe Detail and Instructions** - step-by-step cooking
4. **Nutritional Analysis and Dietary Recommendations** - calories, macros, health tips

Includes a **Login / Signup page** before the modules.

## Folder Structure
```
pantrychef/
├── frontend/    # React + Vite UI (login + 4 module screens)
├── backend/     # Node.js + Express REST API
└── database/    # MySQL schema + seed data
```

## Quick Start

### 1. Database (MySQL)
```bash
mysql -u root -p < database/schema.sql
mysql -u root -p pantrychef < database/seed.sql
```

### 2. Backend
```bash
cd backend
npm install
cp .env.example .env   # fill in DB credentials + OPENAI_API_KEY
npm start              # runs on http://localhost:5000
```

### 3. Frontend
```bash
cd frontend
npm install
npm run dev            # runs on http://localhost:5173
```

Open http://localhost:5173 → Sign up → Use the 4 modules.
