export async function handler(event, context) {
  const WEBHOOK_URL = "https://webhook.site/xxxxxx"; // thay bằng webhook thật

  const data = {
    content: "🚀 Gửi thành công từ Netlify Function!",
  };

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true, status: response.status }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
