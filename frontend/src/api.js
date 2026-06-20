const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function token() { return localStorage.getItem('token'); }

async function request(path, opts = {}) {
  const res = await fetch(`${API}${path}`, {
    ...opts,
    headers: {
      'Content-Type': 'application/json',
      ...(token() ? { Authorization: `Bearer ${token()}` } : {}),
      ...(opts.headers || {}),
    },
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Request failed');
  return res.json();
}

export const api = {
  signup: (data) => request('/auth/signup', { method: 'POST', body: JSON.stringify(data) }),
  login:  (data) => request('/auth/login',  { method: 'POST', body: JSON.stringify(data) }),

  getIngredients: () => request('/ingredients'),
  addIngredient: (data) => request('/ingredients', { method: 'POST', body: JSON.stringify(data) }),
  deleteIngredient: (id) => request(`/ingredients/${id}`, { method: 'DELETE' }),

  matchRecipes: () => request('/recipes/match', { method: 'POST' }),
  getRecipes: () => request('/recipes'),
  getRecipe: (id) => request(`/recipes/${id}`),

  getNutrition: (recipeId) => request(`/nutrition/${recipeId}`),
  setPreference: (preference) => request('/nutrition/preference',
    { method: 'PUT', body: JSON.stringify({ preference }) }),
};
