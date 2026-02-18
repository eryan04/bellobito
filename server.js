const express = require('express');
const path = require('path');

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

app.listen(PORT, () => {
  console.log(`💖 BelloBito sur http://localhost:${PORT}`);
});
