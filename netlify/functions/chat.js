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
    const systemPrompt = `Cuando te pasen la referencia de una carga busca en la columna AG del google sheet "MakeTest" Hoja "Datos" y pasa la siguiente info de la carga:
    Origen (BI), Destino (BN), Transportista (BS), ETD (AB), ETA (AC), Agente (A), Referencia Cliente (BA).

    Todo de una forma profesional y consisa.
`;

    // ⚙️ Configurar el servidor MCP (Zapier)
    const zapierMCP = {
      type: "mcp",
      server_label: "zapier",
      server_url: "https://mcp.zapier.com/api/mcp/mcp",
      require_approval: "never",
      headers: {
        Authorization:
          "Bearer NjZhYmU0ZTgtM2FlNC00MzFhLWJmMjYtY2RlOTgwOTY3Mjg1OmJjNjE2NjRkLWNmMGItNDk3Mi1hZmU0LTBkZGJiMzc1OTQzNw==",
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
        model: "gpt-4.1-mini",
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
        temperature: 0,
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


    // 🧩 Intentar detectar si la respuesta contiene campos conocidos de carga
    let cargaData = null;
    const cargaRegex =
      /Origen:\s*(.*)\n- Destino:\s*(.*)\n- Transportista:\s*(.*)\n- (?:Fecha de salida|ETD.*?):\s*(.*)\n- (?:Fecha estimada de llegada|ETA.*?):\s*(.*)\n- Agente:\s*(.*)\n- (?:Número de cliente|Referencia Cliente):\s*(.*)/i;

    const match = reply.match(cargaRegex);
    if (match) {
      cargaData = {
        origen: match[1].trim(),
        destino: match[2].trim(),
        transportista: match[3].trim(),
        etd: match[4].trim(),
        eta: match[5].trim(),
        agente: match[6].trim(),
        numeroCliente: match[7].trim(),
      };
    }
    console.log("✅ Reply final:", reply);
    console.log("✅ cargaData:", cargaData);

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reply, cargaData }), // 👈 incluye cargaData acá
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
