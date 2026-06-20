// Module 1: Ingredient Inventory Management
const router = require('express').Router();
const db = require('../db');
const auth = require('../middleware/auth');

router.use(auth);

router.get('/', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM ingredients WHERE user_id = ?', [req.userId]);
  res.json(rows);
});

router.post('/', async (req, res) => {
  const { name, quantity } = req.body;
  const [r] = await db.query(
    'INSERT INTO ingredients (user_id, name, quantity) VALUES (?, ?, ?)',
    [req.userId, name, quantity || '1']
  );
  res.json({ id: r.insertId, name, quantity });
});

router.delete('/:id', async (req, res) => {
  await db.query('DELETE FROM ingredients WHERE id = ? AND user_id = ?', [req.params.id, req.userId]);
  res.json({ ok: true });
});

module.exports = router;
