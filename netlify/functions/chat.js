// netlify/functions/chat.js
import fetch from "node-fetch";

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const { message } = JSON.parse(event.body || "{}");
    if (!message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing message" }),
      };
    }

    // Variables desde entorno
    const apiKey = process.env.OPENAI_API_KEY;
    const workflowId = process.env.WORKFLOW_ID; // ⚠️ cambio de nombre

    // ✅ Nuevo endpoint para Workflows
    const url = `https://api.openai.com/v1/workflows/${workflowId}/runs`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        input: { userMessage: message }, // 👈 'input' se pasa como objeto
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenAI error:", data);
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: "OpenAI API error", detail: data }),
      };
    }

    // Buscar respuesta de texto dentro del output del workflow
    const reply =
      data.output?.[0]?.content?.[0]?.text ||
      data.output?.content?.[0]?.text ||
      JSON.stringify(data.output) ||
      "Sin respuesta del agente.";

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reply }),
    };
  } catch (err) {
    console.error("Server Error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
