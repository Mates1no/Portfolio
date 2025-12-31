import { getStore } from "@netlify/blobs";

const store = getStore("orders");

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

  // 🔐 Save order to Netlify Blob Storage
  const id = Date.now().toString();
  await store.set(id, order);

  // 🔔 Discord notification
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

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true })
  };
}
