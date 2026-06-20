import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';

export default function Dashboard() {
  const nav = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [tab, setTab] = useState('pantry');

  // Module 1
  const [ingredients, setIngredients] = useState([]);
  const [newName, setNewName] = useState('');
  const [newQty, setNewQty] = useState('');

  // Modules 2-4
  const [recipes, setRecipes] = useState([]);
  const [selected, setSelected] = useState(null);
  const [nutrition, setNutrition] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  useEffect(() => { loadIngredients(); }, []);

  async function loadIngredients() {
    try { setIngredients(await api.getIngredients()); } catch (e) { setErr(e.message); }
  }

  async function addIngredient(e) {
    e.preventDefault();
    if (!newName.trim()) return;
    await api.addIngredient({ name: newName.trim(), quantity: newQty || '1' });
    setNewName(''); setNewQty('');
    loadIngredients();
  }

  async function removeIngredient(id) {
    await api.deleteIngredient(id);
    loadIngredients();
  }

  async function findRecipes() {
    setLoading(true); setErr('');
    try {
      await api.matchRecipes();
      setRecipes(await api.getRecipes());
      setTab('recipes');
    } catch (e) { setErr(e.message); }
    setLoading(false);
  }

  async function openRecipe(id) {
    const r = await api.getRecipe(id);
    setSelected(r);
    setNutrition(await api.getNutrition(id));
    setTab('details');
  }

  function logout() {
    localStorage.clear();
    nav('/login');
  }

  return (
    <div className="app">
      <header>
        <h2>🍳 PantryChef</h2>
        <div>
          <span className="muted">{user.email}</span>
          <button onClick={logout} className="link">Sign out</button>
        </div>
      </header>

      <nav className="tabs">
        <button className={tab==='pantry'?'active':''}  onClick={()=>setTab('pantry')}>1. Pantry</button>
        <button className={tab==='recipes'?'active':''} onClick={()=>setTab('recipes')} disabled={!recipes.length}>2. Recipes</button>
        <button className={tab==='details'?'active':''} onClick={()=>setTab('details')} disabled={!selected}>3. Details</button>
        <button className={tab==='nutrition'?'active':''}onClick={()=>setTab('nutrition')}disabled={!nutrition}>4. Nutrition</button>
      </nav>

      {err && <div className="error">{err}</div>}

      {tab === 'pantry' && (
        <section className="card">
          <h3>Ingredient Inventory</h3>
          <form onSubmit={addIngredient} className="row">
            <input placeholder="Ingredient (e.g. chicken)" value={newName} onChange={e=>setNewName(e.target.value)} />
            <input placeholder="Qty (e.g. 500g)" value={newQty} onChange={e=>setNewQty(e.target.value)} />
            <button type="submit">Add</button>
          </form>
          <ul className="list">
            {ingredients.map(i => (
              <li key={i.id}>
                <span>{i.name} — <em>{i.quantity}</em></span>
                <button className="link" onClick={()=>removeIngredient(i.id)}>remove</button>
              </li>
            ))}
            {!ingredients.length && <li className="muted">No ingredients yet.</li>}
          </ul>
          <button onClick={findRecipes} disabled={!ingredients.length || loading}>
            {loading ? 'Finding...' : 'Find Recipes →'}
          </button>
        </section>
      )}

      {tab === 'recipes' && (
        <section className="card">
          <h3>Recommended Recipes</h3>
          <div className="grid">
            {recipes.map(r => (
              <div key={r.id} className="recipe-card" onClick={()=>openRecipe(r.id)}>
                <h4>{r.title}</h4>
                <p className="muted">{r.description}</p>
                <small>{r.cook_time} · {r.difficulty}</small>
              </div>
            ))}
          </div>
        </section>
      )}

      {tab === 'details' && selected && (
        <section className="card">
          <h3>{selected.title}</h3>
          <p>{selected.description}</p>
          <p><strong>Time:</strong> {selected.cook_time} · <strong>Difficulty:</strong> {selected.difficulty}</p>
          <h4>Ingredients</h4>
          <ul>{selected.ingredients.map((i,n)=><li key={n}>{i}</li>)}</ul>
          <h4>Instructions</h4>
          <ol>{selected.instructions.map((s,n)=><li key={n}>{s}</li>)}</ol>
          <button onClick={()=>setTab('nutrition')}>View Nutrition →</button>
        </section>
      )}

      {tab === 'nutrition' && nutrition && (
        <section className="card">
          <h3>Nutritional Analysis</h3>
          <div className="grid">
            <div className="stat"><b>{nutrition.calories}</b><span>kcal</span></div>
            <div className="stat"><b>{nutrition.protein_g}g</b><span>Protein</span></div>
            <div className="stat"><b>{nutrition.carbs_g}g</b><span>Carbs</span></div>
            <div className="stat"><b>{nutrition.fat_g}g</b><span>Fat</span></div>
            <div className="stat"><b>{nutrition.fiber_g}g</b><span>Fiber</span></div>
          </div>
          <h4>Health Tips</h4>
          <p>{nutrition.health_tips}</p>
        </section>
      )}
    </div>
  );
}
