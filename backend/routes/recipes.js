// Modules 2 & 3: Recipe Matching/Recommendation + Recipe Detail/Instructions
const router = require('express').Router();
const db = require('../db');
const auth = require('../middleware/auth');

router.use(auth);

// Simple rule-based recipe matcher (no external AI needed).
// Replace generateRecipes() with an OpenAI/LLM call if desired.
function generateRecipes(ingredients) {
  const list = ingredients.map(i => i.toLowerCase());
  const templates = [
    {
      title: 'Garlic Tomato Chicken',
      requires: ['chicken', 'tomato', 'garlic'],
      description: 'Juicy chicken simmered in a garlicky tomato sauce.',
      cook_time: '30 min',
      difficulty: 'Easy',
      instructions: [
        'Heat olive oil in a pan over medium heat.',
        'Add minced garlic and cook 30s until fragrant.',
        'Add diced chicken; sear 5 min until golden.',
        'Add chopped tomatoes; simmer 15 min.',
        'Season with salt and pepper. Serve hot.'
      ],
      nutrition: { calories: 420, protein_g: 38, carbs_g: 12, fat_g: 22, fiber_g: 3,
        health_tips: 'High protein, low carb. Good for muscle recovery.' }
    },
    {
      title: 'Simple Veggie Stir Fry',
      requires: ['tomato'],
      description: 'Quick stir-fried vegetables with garlic.',
      cook_time: '15 min',
      difficulty: 'Easy',
      instructions: [
        'Chop all vegetables into bite-size pieces.',
        'Heat oil in wok over high heat.',
        'Add garlic, then vegetables. Stir-fry 5-7 min.',
        'Season with soy sauce. Serve over rice.'
      ],
      nutrition: { calories: 220, protein_g: 6, carbs_g: 28, fat_g: 10, fiber_g: 6,
        health_tips: 'Rich in vitamins. Add tofu for more protein.' }
    },
    {
      title: 'Pantry Pasta',
      requires: ['garlic'],
      description: 'Classic garlic-oil pasta - works with almost any pantry.',
      cook_time: '20 min',
      difficulty: 'Easy',
      instructions: [
        'Boil salted water; cook pasta to al dente.',
        'Sauté sliced garlic in olive oil on low heat.',
        'Toss drained pasta with the garlic oil.',
        'Top with cheese or herbs if available.'
      ],
      nutrition: { calories: 510, protein_g: 14, carbs_g: 72, fat_g: 18, fiber_g: 4,
        health_tips: 'Carb-heavy - pair with a side salad for balance.' }
    }
  ];

  // Match: any template where at least one required ingredient is in pantry
  return templates.filter(t => t.requires.some(r => list.some(i => i.includes(r))));
}

// POST /api/recipes/match  -> generate matches from current pantry, save them
router.post('/match', async (req, res) => {
  const [ings] = await db.query('SELECT name FROM ingredients WHERE user_id = ?', [req.userId]);
  if (!ings.length) return res.status(400).json({ error: 'Add ingredients first' });

  const matches = generateRecipes(ings.map(i => i.name));
  const saved = [];

  for (const r of matches) {
    const [insertRes] = await db.query(
      `INSERT INTO recipes (user_id, title, description, ingredients_json, instructions_json, cook_time, difficulty)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [req.userId, r.title, r.description, JSON.stringify(r.requires),
       JSON.stringify(r.instructions), r.cook_time, r.difficulty]
    );
    await db.query(
      `INSERT INTO nutrition (recipe_id, calories, protein_g, carbs_g, fat_g, fiber_g, health_tips)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [insertRes.insertId, r.nutrition.calories, r.nutrition.protein_g, r.nutrition.carbs_g,
       r.nutrition.fat_g, r.nutrition.fiber_g, r.nutrition.health_tips]
    );
    saved.push({ id: insertRes.insertId, ...r });
  }
  res.json(saved);
});

// GET /api/recipes  -> list saved recipes for this user
router.get('/', async (req, res) => {
  const [rows] = await db.query(
    'SELECT id, title, description, cook_time, difficulty FROM recipes WHERE user_id = ? ORDER BY id DESC',
    [req.userId]
  );
  res.json(rows);
});

// GET /api/recipes/:id  -> Module 3: full detail + instructions
router.get('/:id', async (req, res) => {
  const [rows] = await db.query(
    'SELECT * FROM recipes WHERE id = ? AND user_id = ?',
    [req.params.id, req.userId]
  );
  if (!rows.length) return res.status(404).json({ error: 'Not found' });
  const recipe = rows[0];
  recipe.ingredients = JSON.parse(recipe.ingredients_json || '[]');
  recipe.instructions = JSON.parse(recipe.instructions_json || '[]');
  res.json(recipe);
});

module.exports = router;
