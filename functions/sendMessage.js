export async function handler(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed'
    };
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) };
  }

  const webhookUrl = body.webhook;
  const content = body.message;

  if (!webhookUrl || !content) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Thiếu webhook hoặc nội dung' })
    };
  }

  const payload = {
    msgtype: 'text',
    text: { content }
  };

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await response.text();

    return {
      statusCode: response.status,
      body: JSON.stringify({ ok: response.ok, result })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
}
