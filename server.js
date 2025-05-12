const express = require('express');
const Parser = require('@postlight/parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// GET /parser endpoint
app.get('/parser', async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'Missing url query parameter' });
  }

  try {
    const result = await Parser.parse(url);
    if (result) {
      res.json(result);
    } else {
      res.status(500).json({ error: 'There was an error parsing that URL.' });
    }
  } catch (error) {
    console.error('Parser error:', error);
    res.status(500).json({ error: 'An unexpected error occurred.', details: error.message });
  }
});

// POST /parse-html endpoint
app.post('/parse-html', async (req, res) => {
  const { url, html } = req.body;

  if (!html) {
    return res.status(400).json({ error: 'Missing html in request body' });
  }

  if (!url) {
    return res.status(400).json({ error: 'Missing url in request body (required by parser even with HTML)' });
  }

  try {
    const result = await Parser.parse(url, { html });
    if (result) {
      res.json(result);
    } else {
      res.status(500).json({ error: 'There was an error parsing the HTML.' });
    }
  } catch (error) {
    console.error('Parser error:', error);
    res.status(500).json({ error: 'An unexpected error occurred.', details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
