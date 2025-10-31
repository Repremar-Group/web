// netlify/functions/chat.js

export async function handler(event) {
  // Solo permitimos POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const { message } = JSON.parse(event.body || "{}");

    if (!message) {
      return {
        statusCode: 400,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ error: "Missing message" }),
      };
    }

    // 🔐 Variables de entorno en Netlify
    const apiKey = process.env.OPENAI_API_KEY;
    const agentId = process.env.WORKFLOW_ID; // Usamos workflow ID como agent ID

    // 📡 Endpoint correcto para Agents API
    const url = "https://api.openai.com/v1/agents/runs";

    console.log("🛰️ Enviando a OpenAI:", { agentId, message });

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        agent_id: agentId,
        input: message, // 👈 formato correcto para agents
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("❌ OpenAI API error:", data);
      return {
        statusCode: response.status,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({
          error: "OpenAI API error",
          detail: data,
        }),
      };
    }

    // 🧠 Buscar respuesta del agente
    const reply =
      data.output?.[0]?.content?.[0]?.text ||
      data.output?.content?.[0]?.text ||
      data.output?.[0]?.content?.text ||
      "Sin respuesta del agente.";

    console.log("✅ Respuesta del agente:", reply);

    // ✨ Devolvemos resultado al frontend
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reply }),
    };
  } catch (err) {
    console.error("💥 Server Error:", err);

    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: err.message }),
    };
  }
}
