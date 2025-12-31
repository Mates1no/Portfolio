export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const data = JSON.parse(event.body);

    const payload = {
      embeds: [
        {
          title: "🆕 New Order Received",
          color: 0x00ffff,
          fields: [
            { name: "👤 Contact", value: data.contact || "N/A", inline: false },
            { name: "🎨 Type", value: data.type || "N/A", inline: true },
            { name: "⏰ Deadline", value: data.deadline || "Not specified", inline: true },
            { name: "📝 Details", value: data.details || "-", inline: false }
          ],
          footer: {
            text: "MaTsFX Order System"
          },
          timestamp: new Date().toISOString()
        }
      ]
    };

    const res = await fetch(process.env.DISCORD_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error("Discord webhook failed");

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
