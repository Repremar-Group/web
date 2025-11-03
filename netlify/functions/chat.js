// netlify/functions/chat.js
const fetch = require("node-fetch");

exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const { message, history = [] } = JSON.parse(event.body || "{}");
    if (!message) {
      return {
        statusCode: 400,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ error: "Missing message" }),
      };
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) throw new Error("OPENAI_API_KEY no configurada en Netlify.");

    // 🧠 Instrucciones base
    const systemPrompt = `Sos un asistente virtual de Repremar Logistics.
Podés acceder a herramientas externas mediante un servidor MCP de Zapier.
Usá esas herramientas cuando el usuario solicite datos o acciones que dependan de información de planillas, automatizaciones o integraciones externas.
Puntualmente, cuando te soliciten informacion de una carga o referencia, tu trabajo es buscar esa carga por el campo ID de el GoogleSheet que se llama MakeTest y traer esa informacion. La columna del ID es la AG.`;

    // ⚙️ Configurar el servidor MCP (Zapier)
    const zapierMCP = {
      type: "mcp",
      server_label: "zapier",
      server_url: "https://mcp.zapier.com/api/mcp/mcp",
      require_approval: "never",
      headers: {
        Authorization:
          "Bearer NjZhYmU0ZTgtM2FlNC00MzFhLWJmMjYtY2RlOTgwOTY3Mjg1OjljNDBhY2FkLWQ4NDYtNDQzZi04OTI3LWE5MzZiZDhhODYyNg==",
      },
    };

    // 🚀 Request al endpoint /v1/responses
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4.1",
        input: [
          { role: "system", content: systemPrompt },
          ...history.map((m) => ({
            role: m.role === "assistant" ? "assistant" : "user",
            content: m.text,
          })),
          { role: "user", content: message },
        ],
        tools: [zapierMCP],
        tool_choice: "auto",
        temperature: 0.3,
      }),
    });

    const data = await response.json();

    // 🧩 Log de depuración — verás esto en Netlify logs
    console.log("📥 RAW OpenAI response:");
    console.log(JSON.stringify(data, null, 2));

    if (!response.ok) {
      return {
        statusCode: response.status,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({
          error: data.error || "Error en OpenAI API",
          raw: data,
        }),
      };
    }

    // 🗨️ Extraer texto de salida
    let reply = data.output_text || "Sin respuesta del modelo.";

    // Si el modelo intentó hacer tool_call y no devolvió texto
    if (!reply && data.output?.[0]?.content) {
      const content = data.output[0].content;
      if (Array.isArray(content) && content[0]?.text) reply = content[0].text;
    }

    // Si sigue sin texto, mostramos el objeto completo (para debug)
    if (!reply || reply.trim() === "") {
      reply = "⚙️ Sin texto. Mira logs para más info.";
    }

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reply }),
    };
  } catch (err) {
    console.error("💥 Error en función:", err);
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: err.message, stack: err.stack }),
    };
  }
};
