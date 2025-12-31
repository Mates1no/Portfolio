export async function handler(event) {
  // Allow only POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed"
    };
  }

  try {
    const data = JSON.parse(event.body);

    const message = {
      content:
`🆕 **NEW ORDER**
👤 Contact: ${data.contact || "N/A"}
🎨 Type: ${data.type || "N/A"}
⏰ Deadline: ${data.deadline || "Not specified"}
📝 Details: ${data.details || "-"}

🕒 ${new Date().toLocaleString()}`
    };

    const res = await fetch(process.env.DISCORD_WEBHOOK, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(message)
    });

    if (!res.ok) {
      throw new Error("Discord webhook failed");
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: err.message
      })
    };
  }
}
