# Database

MySQL schema for PantryChef.

## Setup
```bash
mysql -u root -p < schema.sql
mysql -u root -p pantrychef < seed.sql
```

## Tables
- `users` - login accounts
- `ingredients` - pantry inventory per user (Module 1)
- `recipes` - matched/generated recipes (Modules 2 & 3)
- `nutrition` - nutritional analysis per recipe (Module 4)
