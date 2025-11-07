export async function handler(event) {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, x-api-key",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: corsHeaders };
  }

  try {
    // 🔐 Variables seguras de entorno (desde Netlify Dashboard)
    const MAKE_WEBHOOK = process.env.MAKE_WEBHOOK_URL;
    const MAKE_API_KEY = process.env.MAKE_API_KEY;

    // 🔒 Clave pública que valida el acceso desde el widget
    const FRONT_API_KEY = "59ebae58-c332-4993-84c9-153870ea38d3";

    // Verificar la API key recibida del navegador
    const providedKey =
      event.headers["x-api-key"] ||
      event.headers["X-Api-Key"] ||
      event.headers["X-API-KEY"];

    if (!providedKey || providedKey.trim() !== FRONT_API_KEY.trim()) {
      return {
        statusCode: 401,
        headers: corsHeaders,
        body: JSON.stringify({ error: "Unauthorized: invalid x-api-key" }),
      };
    }

    // Parsear el mensaje
    const body = event.body ? JSON.parse(event.body) : {};

    // ✅ Llamar al webhook de Make con autenticación
    const response = await fetch(MAKE_WEBHOOK, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-make-apikey": MAKE_API_KEY, // ✅ Make lo exige así
      },
      body: JSON.stringify(body),
    });

    const text = await response.text();

    return {
      statusCode: response.status,
      headers: corsHeaders,
      body: JSON.stringify({ ok: response.ok, result: text }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: err.message }),
    };
  }
}