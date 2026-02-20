const express = require('express');
const path = require('path');
require('dotenv').config();
const db = require('./src/db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use('/src/img', express.static(path.join(__dirname, 'src/img')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/test', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'test.html'));
});

app.get('/horoscope', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'horoscope.html'));
});

app.get('/mariable', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'mariable.html'));
});

app.get('/history', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'history.html'));
});

app.get('/result/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'result.html'));
});

app.get('/api/quote-of-day', (req, res) => {
  const quotes = [
    "L'amour, c'est être toujours en retard à cause de l'autre.",
    "Aimer, ce n'est pas se regarder l'un l'autre, c'est regarder ensemble dans la même direction.",
    "Le véritable amour commence là où tu n'attends rien en retour.",
    "L'amour est la poésie des sens.",
    "Aimer, c'est trouver sa richesse hors de soi.",
    "L'amour ne se prédit pas, il se construit.",
    "Le cœur a ses raisons que la raison ne connaît point."
  ];
  
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  const quote = quotes[dayOfYear % quotes.length];
  
  res.json({ quote });
});

// Statistiques du site
app.get('/api/stats', async (req, res) => {
  try {
    const totalTests = await db.query('SELECT COUNT(*) as count FROM tests');
    const couplesFormes = await db.query('SELECT COUNT(*) as count FROM tests WHERE score >= 50');
    
    res.json({
      testsRealises: parseInt(totalTests[0]?.count || '0', 10),
      satisfaction: 95,
      couplesFormes: parseInt(couplesFormes[0]?.count || '0', 10)
    });
  } catch (err) {
    console.error('Error fetching stats:', err);
    res.json({
      testsRealises: 0,
      satisfaction: 95,
      couplesFormes: 0
    });
  }
});

// Enregistrer un test de compatibilité
app.post('/api/tests', async (req, res) => {
  try {
    const { name1, name2, score, method, extras } = req.body;
    if (!name1 || !name2 || typeof score === 'undefined') {
      return res.status(400).json({ error: 'name1, name2 et score sont requis' });
    }

    // If zodiac signs are provided in extras, try to find an existing test
    // with the same pair of names and the same signs (either order).
    const extrasObj = extras && typeof extras === 'string' ? (() => { try { return JSON.parse(extras); } catch(e){ return null } })() : (extras || {});
    const z1 = extrasObj && extrasObj.zodiac1 ? String(extrasObj.zodiac1).toLowerCase() : null;
    const z2 = extrasObj && extrasObj.zodiac2 ? String(extrasObj.zodiac2).toLowerCase() : null;

    if (z1 && z2) {
      const n1 = String(name1).toLowerCase();
      const n2 = String(name2).toLowerCase();

      const rows = await db.query(
        `SELECT id, name1, name2, score, method, extras, created_at FROM tests
         WHERE (LOWER(name1) = $1 AND LOWER(name2) = $2 AND (extras->>'zodiac1') = $3 AND (extras->>'zodiac2') = $4)
            OR (LOWER(name1) = $2 AND LOWER(name2) = $1 AND (extras->>'zodiac1') = $4 AND (extras->>'zodiac2') = $3)
         LIMIT 1`,
        [n1, n2, z1, z2]
      );

      if (rows && rows.length > 0) {
        const existing = rows[0];
        return res.json({ id: existing.id, name1: existing.name1, name2: existing.name2, score: Number(existing.score), method: existing.method, extras: existing.extras, reused: true });
      }
    }

    const result = await db.query(
      'INSERT INTO tests (name1, name2, score, method, extras) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      [name1, name2, Number(score), method || null, extras ? JSON.stringify(extras) : null]
    );

    const insertedId = result.insertId || (result.rows && result.rows[0] ? result.rows[0].id : null);
    res.json({ id: insertedId, name1, name2, score: Number(score), method, extras });
  } catch (err) {
    console.error('Error saving test:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Récupérer l'historique des tests
app.get('/api/tests', async (req, res) => {
  try {
    const limit = Math.min(100, parseInt(req.query.limit || '50', 10));
    const rows = await db.query('SELECT id, name1, name2, score, method, extras, created_at FROM tests ORDER BY created_at DESC LIMIT $1', [limit]);
    // extras is JSONB in Postgres so it's already an object
    const parsed = rows.map(r => ({ ...r, extras: r.extras || null }));
    res.json(parsed);
  } catch (err) {
    console.error('Error fetching tests:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Rechercher dans l'historique
app.get('/api/tests/search', async (req, res) => {
  try {
    const { name, zodiac } = req.query;
    
    if (!name && !zodiac) {
      return res.status(400).json({ error: 'Paramètre name ou zodiac requis' });
    }
    
    let query = 'SELECT id, name1, name2, score, method, extras, created_at FROM tests WHERE 1=1';
    const params = [];
    let paramCount = 0;
    
    if (name) {
      paramCount++;
      query += ` AND (LOWER(name1) LIKE $${paramCount} OR LOWER(name2) LIKE $${paramCount})`;
      params.push(`%${name.toLowerCase()}%`);
    }
    
    if (zodiac) {
      paramCount++;
      query += ` AND ((extras->>'zodiac1') = $${paramCount} OR (extras->>'zodiac2') = $${paramCount})`;
      params.push(zodiac.toLowerCase());
    }
    
    query += ' ORDER BY created_at DESC LIMIT 100';
    
    const rows = await db.query(query, params);
    const parsed = rows.map(r => ({ ...r, extras: r.extras || null }));
    res.json(parsed);
  } catch (err) {
    console.error('Error searching tests:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Récupérer un test spécifique par ID
app.get('/api/tests/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID invalide' });
    }
    
    const rows = await db.query('SELECT id, name1, name2, score, method, extras, created_at FROM tests WHERE id = $1', [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Test non trouvé' });
    }
    
    res.json({ ...rows[0], extras: rows[0].extras || null });
  } catch (err) {
    console.error('Error fetching test:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Route de stress test (calculs intensifs)
app.get('/stresstest', (req, res) => {
  const startTime = Date.now();
  const iterations = req.query.iterations || 10000000;
  
  console.log(`🔥 Stress test démarré avec ${iterations} itérations...`);
  
  let result = 0;
  for (let i = 0; i < iterations; i++) {
    // Calculs exponentiels et trigonométriques intensifs
    result += Math.exp(Math.sqrt(i)) * Math.sin(i) * Math.cos(i);
    result += Math.pow(i, 0.5) * Math.log(i + 1);
    result += Math.tan(i / 1000) * Math.atan(i);
    
    // Quelques opérations supplémentaires
    if (i % 100000 === 0) {
      result = result % 1000000; // Éviter l'overflow
    }
  }
  
  const duration = Date.now() - startTime;
  
  res.json({
    message: 'Stress test terminé',
    iterations: iterations,
    duration: `${duration}ms`,
    result: result.toFixed(2),
    timestamp: new Date().toISOString()
  });
  
  console.log(`✅ Stress test terminé en ${duration}ms`);
});

app.listen(PORT, () => {
  console.log(`💖 BelloBito sur http://localhost:${PORT}`);
});
