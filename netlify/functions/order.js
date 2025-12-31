export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  try {
    const data = JSON.parse(event.body);

    const {
      contact = "N/A",
      type = "N/A",
      deadline = "N/A",
      details = "N/A"
    } = data;

    const webhookUrl = "https://discord.com/api/webhooks/1455902377512275979/AnHb17Pg-Q88OLJsNHBpiSWxSSQq1eBBQy3xO1lfZnghWQKiNfOc0rZ9YDdXus4IUoHm";

    const payload = {
      username: "MaTsFX Orders",
      avatar_url: "https://i.imgur.com/ZK6vKQp.png",
      embeds: [
        {
          title: "🧾 New Order Received",
          color: 0xff5f6d,
          fields: [
            { name: "📩 Contact", value: contact, inline: false },
            { name: "🎨 Type", value: type, inline: true },
            { name: "⏰ Deadline", value: deadline, inline: true },
            { name: "📝 Details", value: details || "—", inline: false }
          ],
          footer: {
            text: "MaTsFX • Netlify Order System"
          },
          timestamp: new Date().toISOString()
        }
      ]
    };

    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
}

