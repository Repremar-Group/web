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

    // 🧠 Instrucciones iniciales
    const systemInstruction = {
      role: "system",
      content: `Sos un asistente virtual de Repremar Logistics.
Podés acceder a herramientas externas mediante un servidor MCP de Zapier.
Usá esas herramientas cuando el usuario solicite datos o acciones que dependan de información de planillas, automatizaciones o integraciones externas.
Cuando se te consulta por una carga o referenca tu trabajo es buscar la linea de esa carga en el sheet MakeTest y devolver sus datos.`,
    };

    // 💬 Construir historial
    const messages = [
      systemInstruction,
      ...history.map((msg) => ({
        role: msg.role === "assistant" ? "assistant" : "user",
        content: msg.text,
      })),
      { role: "user", content: message },
    ];

    // ⚙️ Definir el MCP server (Zapier)
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

    // 🚀 Llamada a la nueva API de respuestas con herramientas MCP
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4.1", // el modelo compatible con tools/MCP
        input: message,
        tools: [zapierMCP],
        tool_choice: "auto", // puede ser "auto" o "required" si querés forzar el uso
        temperature: 0.3,
        messages,
      }),
    });

    const data = await response.json();
    console.log("📤 Respuesta de OpenAI:", JSON.stringify(data, null, 2));

    if (!response.ok) {
      return {
        statusCode: response.status,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ error: data.error || "Error en OpenAI API" }),
      };
    }

    // 🗨️ El texto final que responde el modelo
    const reply =
      data.output?.[0]?.content?.[0]?.text ||
      data.choices?.[0]?.message?.content?.trim() ||
      "Sin respuesta del modelo.";

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
