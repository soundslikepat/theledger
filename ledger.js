const { getStore } = require('@netlify/blobs');

const KEY = 'ledger-db';

exports.handler = async (event) => {
  const store = getStore({ name: 'ledger', consistency: 'strong' });

  try {
    if (event.httpMethod === 'GET') {
      const data = await store.get(KEY, { type: 'json' });
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data || null),
      };
    }

    if (event.httpMethod === 'POST') {
      let payload;
      try {
        payload = JSON.parse(event.body || '{}');
      } catch (e) {
        return { statusCode: 400, body: 'Invalid JSON body' };
      }
      await store.setJSON(KEY, payload);
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ok: true }),
      };
    }

    return { statusCode: 405, body: 'Method not allowed' };
  } catch (err) {
    console.error('Ledger function error:', err);
    return { statusCode: 500, body: 'Internal error reading or writing the ledger.' };
  }
};
