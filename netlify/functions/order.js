export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405 };
  }

  const data = JSON.parse(event.body);
  const time = new Date().toISOString();

  const order = {
    contact: data.contact,
    type: data.type,
    deadline: data.deadline || "Not specified",
    time,
    status: "NEW"
  };

  await fetch(process.env.DISCORD_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      embeds: [{
        title: "🆕 New Order",
        color: 3447003,
        fields: [
          { name: "Contact", value: order.contact },
          { name: "Type", value: order.type },
          { name: "Deadline", value: order.deadline }
        ],
        footer: { text: "MaTsFX Order System" }
      }]
    })
  });

  await fetch("/.netlify/functions/orders", {
    method: "POST",
    body: JSON.stringify(order)
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true })
  };
}
