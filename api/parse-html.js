import Parser from '@postlight/parser';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default async function handler(req, res) {
  // Handle OPTIONS request for CORS
  if (req.method === 'OPTIONS') {
    res.writeHead(200, corsHeaders);
    res.end();
    return;
  }

  // Only allow POST method
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST', 'OPTIONS']);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    return;
  }

  const { url, html } = req.body;

  if (!html) {
    res.status(400).json({ error: 'Missing html in request body' });
    return;
  }

  if (!url) {
    res.status(400).json({ error: 'Missing url in request body (required by parser even with HTML)' });
    return;
  }

  try {
    const result = await Parser.parse(url, { html, contentType: 'text/html; charset=utf-8' });
    if (result) {
      Object.entries(corsHeaders).forEach(([key, value]) => {
        res.setHeader(key, value);
      });
      res.status(200).json(result);
    } else {
      Object.entries(corsHeaders).forEach(([key, value]) => {
        res.setHeader(key, value);
      });
      res.status(500).json({ error: 'There was an error parsing the HTML.' });
    }
  } catch (error) {
    console.error(error);
    Object.entries(corsHeaders).forEach(([key, value]) => {
      res.setHeader(key, value);
    });
    res.status(500).json({ error: 'An unexpected error occurred.', details: error.message });
  }
}
