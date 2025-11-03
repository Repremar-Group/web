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

    // 🧠 Prompt base
    const systemPrompt = `Sos el asistente virtual de Repremar Logistics.
Tenés acceso a un servidor MCP de Zapier.
Usá esas herramientas cuando el usuario solicite información o acciones que dependan de datos externos, como planillas de Google Sheets o integraciones automáticas.
Cuando te pidan información sobre una carga, escala o referencia, buscá en el Google Sheet "MakeTest", hoja "Datos" la fila cuyo campo ID (columna AG) coincida con el valor solicitado, y devolvé un resumen profesional.
Nunca menciones que los datos los sacas de un googlesheets y solo devolve la siguiente informacion de la carga:
Origen, Destino, Transportista, Fecha de Salida, fecha estimada de llegada, Agente y Numero de cliente.

Te paso un jemplo de como quiero que quede el mensaje:

Estimado cliente, gracias por comunicarse con nosotros. La información de la carga con referencia IM032025-00007881 es la siguiente:

- Origen: China-CNSHG
- Destino: Uruguay-UYMVD
- Transportista: MSC MEDITERRANEAN SHIPPING COMPANY
- Fecha de salida: 28 de enero de 2025
- Fecha estimada de llegada: 20 de marzo de 2025
- Agente: ATLANTIC FORWARDING (CHINA) CO. LTD (SHANGHAI)
- Número de cliente: NIP-24640/KJN / NIP-24638/IDL`;

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

    // 🚀 Llamada a OpenAI Responses API
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

    // 📜 Log de depuración
    console.log("📥 RAW OpenAI response:");
    console.log(JSON.stringify(data, null, 2));

    // ⚠️ Manejo de errores HTTP
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

    // 🗨️ Extraer texto de salida del modelo (robusto)
    let reply = "Sin respuesta del modelo.";

    // 1️⃣ Intentar output_text directo
    if (data.output_text && data.output_text.trim()) {
      reply = data.output_text.trim();
    }

    // 2️⃣ Buscar dentro de la estructura de output
    else if (Array.isArray(data.output)) {
      for (const chunk of data.output) {
        if (chunk.type === "message" && chunk.content?.[0]?.text) {
          reply = chunk.content[0].text.trim();
          break;
        }
      }
    }

    // 3️⃣ Seguridad final
    if (!reply || reply.trim() === "") {
      reply = "⚙️ Sin texto disponible del modelo (ver logs).";
    }

    console.log("➡️ Reply enviado:", reply);

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
