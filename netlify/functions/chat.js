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
Primero que nada tenes que identificar que el cliente tenga permiso para buscar información. Para ello el cliente te va a pasar sus credenciales del portal de tracking y verifica que en la siguiente lista esten correctas, la "EMPRESA A BUSCAR" es como aparece en la planilla la empresa del cliente, es decir que SOLO y es muy importate que SOLO TRAIGAS INFORMACION QUE CORRESPONDA A LA EMPRESA DEL CLIENTE (la columna en el sheets de la empresa es la V, si en la planilla para la referencia que te pasen figura otra empresa, devolve el mensaje: "Estimado cliente, en nuestro sistema esa carga/referencia figura a otra empresa, por lo que no podemos brindarle la información solicitada."

USUARIO/CONTRASEÑA - EMPRESA A BUSCAR
mpena/matias1372 - DIVINO S.A.
pgauna/patr1c10 - BACHEMA

Cuando te pidan información sobre una carga, escala o referencia, buscá en el Google Sheet "MakeTest", hoja "Datos" y la fila de la referencia pueden ser varias, el id (Columna AG) o referenciaCliente (Columna BA). Busca en las 2 columnas el input que te pasen a ver si encontras una carga que corresponda a lo que paso el cliente. En caso de no encontrar devolve el mensaje "No se obtuvieron coincidencias para esa referencia. Por favor comuníquese a it@repremar.com"
NUNCA menciones que los datos los sacas de un googlesheets y solo devolve la siguiente informacion de la carga (entre parentesis te paso la columna en la planilla):
Origen (BI), Destino (BN), Transportista (BS), ETD (AB), ETA (AC), Agente (A) y Referencia Cliente (BA).

Si el cliente solicita información de un campo que no sea los mencionados antes, contesta que no tenes permitido dar la información solicitada. `;

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
    const cargaRegex = /Origen:\s*(.*)\n- Destino:\s*(.*)\n- Transportista:\s*(.*)\n- Fecha de salida:\s*(.*)\n- Fecha estimada de llegada:\s*(.*)\n- Agente:\s*(.*)\n- Número de cliente:\s*(.*)/i;

    const match = reply.match(cargaRegex);
    if (match) {
      cargaData = {
        origen: match[1].trim(),
        destino: match[2].trim(),
        transportista: match[3].trim(),
        fechaSalida: match[4].trim(),
        fechaEstimadaLlegada: match[5].trim(),
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
