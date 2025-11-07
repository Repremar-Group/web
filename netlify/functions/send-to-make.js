export async function handler(event) {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
    };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const body = JSON.parse(event.body || "{}");

    // URL MAKE
    const MAKE_WEBHOOK = "https://hook.us2.make.com/ofbnh3fdq2tqhc2hoyagka7ei8uxdoyk";

    console.log("➡️ Enviando payload a Make:", body);

    const response = await fetch(MAKE_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const text = await response.text();
    console.log("✅ Respuesta de Make:", response.status, text);

    return {
      statusCode: response.status,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ ok: response.ok, result: text }),
    };
  } catch (err) {
    console.error("❌ Error en función send-to-make:", err);
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: err.message }),
    };
  }
}
