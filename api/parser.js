import Parser from '@postlight/parser';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default async function handler(req, res) {
  // Handle OPTIONS request for CORS
  if (req.method === 'OPTIONS') {
    res.writeHead(200, corsHeaders);
    res.end();
    return;
  }

  // Only allow GET method
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET', 'OPTIONS']);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    return;
  }

  const { url } = req.query;

  if (!url) {
    res.status(400).json({ error: 'Missing url query parameter' });
    return;
  }

  try {
    const result = await Parser.parse(url);
    if (result) {
      res.status(200).set(corsHeaders).json(result);
    } else {
      res.status(500).set(corsHeaders).json({ error: 'There was an error parsing that URL.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).set(corsHeaders).json({ error: 'An unexpected error occurred.', details: error.message });
  }
}
