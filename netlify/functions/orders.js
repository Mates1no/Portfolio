import { getStore } from "@netlify/blobs";

const store = getStore("orders");

export async function handler(event) {
  if (event.httpMethod === "GET") {
    const list = [];
    for await (const { key } of store.list()) {
      const data = await store.get(key, { type: "json" });
      list.push({ id: key, ...data });
    }
    return {
      statusCode: 200,
      body: JSON.stringify(list)
    };
  }

  if (event.httpMethod === "POST") {
    const data = JSON.parse(event.body);
    const id = Date.now().toString();
    await store.set(id, data);
    return { statusCode: 200 };
  }

  return { statusCode: 405 };
}
