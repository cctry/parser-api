import fetch from 'node-fetch';

const API_BASE = 'https://parser-api-two.vercel.app';

async function testParserEndpoint() {
  console.log('\n🔍 Testing /parser endpoint...');
  try {
    const url = 'https://example.com';
    const response = await fetch(`${API_BASE}/parser?url=${encodeURIComponent(url)}`);
    const data = await response.json();
    
    console.log('\nStatus:', response.status);
    console.log('Response:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error testing /parser:', error.message);
  }
}

async function testParseHtmlEndpoint() {
  console.log('\n🔍 Testing /parse-html endpoint...');
  try {
    const sampleHtml = `
      <html>
        <head>
          <title>Test Article</title>
        </head>
        <body>
          <h1>Test Article</h1>
          <div class="author">By John Doe</div>
          <div class="date">May 12, 2025</div>
          <p>This is a test article content.</p>
        </body>
      </html>
    `;

    const response = await fetch(`${API_BASE}/parse-html`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: 'https://example.com',
        html: sampleHtml
      })
    });

    const data = await response.json();
    
    console.log('\nStatus:', response.status);
    console.log('Response:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error testing /parse-html:', error.message);
  }
}

async function runTests() {
  console.log('🚀 Starting API tests...');
  await testParserEndpoint();
  await testParseHtmlEndpoint();
  console.log('\n✅ Tests completed!');
}

runTests();
