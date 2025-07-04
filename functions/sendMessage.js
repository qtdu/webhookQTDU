export async function handler(event, context) {
  const WEBHOOK_URL = "https://oapi.dingtalk.com/robot/send?access_token=67e1b68517f0b043143ad99c3efe152476b965ad45d0899faab686892ff81b07"; // thay bằng webhook thật

  const data = {
    msgtype: "text",
    text: {
      content: "✅ Gửi tin nhắn từ Netlify Function đến DingTalk thành công!"
    }
  };

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const resText = await response.text();
    console.log("DingTalk response:", resText);

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true, status: response.status })
    };
  } catch (error) {
    console.error("Error sending to DingTalk:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
}
