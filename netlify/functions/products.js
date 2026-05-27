const { getStore } = require('@netlify/blobs');

exports.handler = async function(event, context) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  const store = getStore('my-store-data');

  if (event.httpMethod === 'GET') {
    try {
      const raw = await store.get('data');
      const data = raw ? JSON.parse(raw) : { shopName: 'Artists.proof#225', products: [] };
      if (!data.products) data.products = [];
      if (!data.shopName) data.shopName = 'Artists.proof#225';
      return { statusCode: 200, headers, body: JSON.stringify(data) };
    } catch(e) {
      return { statusCode: 200, headers, body: JSON.stringify({ shopName: 'Artists.proof#225', products: [] }) };
    }
  }

  if (event.httpMethod === 'POST') {
    try {
      const body = JSON.parse(event.body);
      await store.set('data', JSON.stringify(body));
      return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
    } catch(e) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid data' }) };
    }
  }

  return { statusCode: 405, headers, body: 'Method not allowed' };
};
