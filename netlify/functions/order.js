export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const data = JSON.parse(event.body);

  const content = `
🆕 **NEW ORDER**
👤 Contact: ${data.contact}
📦 Type: ${data.type}
⏰ Deadline: ${data.deadline}
📝 Note: ${data.note || "-"}
🕒 Time: ${new Date().toLocaleString()}
  `;

  await fetch(process.env.DISCORD_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content })
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true })
  };
}

