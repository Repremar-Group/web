export async function handler(event) {
    // --- Manejo de CORS ---
    const corsHeaders = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type, x-api-key",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
    };

    if (event.httpMethod === "OPTIONS") {
        return { statusCode: 204, headers: corsHeaders };
    }

    if (event.httpMethod !== "POST") {
        return { statusCode: 405, headers: corsHeaders, body: "Method Not Allowed" };
    }

    try {
        const MAKE_WEBHOOK = "https://hook.us2.make.com/mwvklj8f7taffxfdsw3wjvf8w5dribfo";

        const MAKE_API_KEY = process.env.MAKE_API_KEY;

        // --- Validar API key ---
        const providedKey =
            event.headers["x-api-key"] || event.headers["X-Api-Key"] || event.headers["X-API-KEY"];

        console.log("🧩 Header recibido:", providedKey);
        console.log("🧩 Esperado:", MAKE_API_KEY);

        if (!providedKey || providedKey.trim() !== MAKE_API_KEY.trim()) {
            console.warn("🚫 API Key inválida o ausente");
            return {
                statusCode: 401,
                headers: corsHeaders,
                body: JSON.stringify({ error: "Unauthorized: invalid API key" }),
            };
        }

        // --- Procesar body ---
        const body = event.body ? JSON.parse(event.body) : {};
        console.log("📦 Payload recibido:", body);

        // --- Enviar al webhook de Make ---
        const response = await fetch(MAKE_WEBHOOK, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        const text = await response.text();
        console.log("✅ Respuesta de Make:", response.status, text);

        return {
            statusCode: response.status,
            headers: corsHeaders,
            body: JSON.stringify({ ok: response.ok, result: text }),
        };
    } catch (err) {
        console.error("❌ Error general:", err);
        return {
            statusCode: 500,
            headers: corsHeaders,
            body: JSON.stringify({ error: err.message }),
        };
    }
}
