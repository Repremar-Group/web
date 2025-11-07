export async function handler(event) {
    // CORS
    if (event.httpMethod === "OPTIONS") {
        return {
            statusCode: 204,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type, x-api-key",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
            },
        };
    }

    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const body = JSON.parse(event.body || "{}");
        const MAKE_WEBHOOK = process.env.MAKE_WEBHOOK_URL;
        const MAKE_API_KEY = process.env.MAKE_API_KEY;

        console.log("🧩 Header recibido:", event.headers["x-api-key"]);
        console.log("🧩 Esperado:", process.env.MAKE_API_KEY);

        // 🛡️ Validar que la llamada venga con la API Key correcta
        const providedKey = event.headers["x-api-key"];
        if (providedKey !== MAKE_API_KEY) {
            return {
                statusCode: 401,
                headers: { "Access-Control-Allow-Origin": "*" },
                body: JSON.stringify({ error: "Unauthorized" }),
            };
        }

        // 🔄 Reenviar al webhook de Make
        const response = await fetch(MAKE_WEBHOOK, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        const text = await response.text();
        return {
            statusCode: response.status,
            headers: { "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify({ ok: response.ok, result: text }),
        };
    } catch (err) {
        return {
            statusCode: 500,
            headers: { "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify({ error: err.message }),
        };
    }
}
