// Module 4: Nutritional Analysis & Dietary Recommendations
const router = require('express').Router();
const db = require('../db');
const auth = require('../middleware/auth');

router.use(auth);

router.get('/:recipeId', async (req, res) => {
  const [rows] = await db.query(
    `SELECT n.* FROM nutrition n
     JOIN recipes r ON r.id = n.recipe_id
     WHERE n.recipe_id = ? AND r.user_id = ?`,
    [req.params.recipeId, req.userId]
  );
  if (!rows.length) return res.status(404).json({ error: 'No nutrition info' });
  res.json(rows[0]);
});

// Set dietary preference (vegetarian, vegan, keto, none, etc.)
router.put('/preference', async (req, res) => {
  const { preference } = req.body;
  await db.query('UPDATE users SET dietary_preference = ? WHERE id = ?',
    [preference, req.userId]);
  res.json({ ok: true, preference });
});

module.exports = router;
