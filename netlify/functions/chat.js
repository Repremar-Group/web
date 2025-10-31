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

    // 🔐 API Key
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) throw new Error("OPENAI_API_KEY no configurada en Netlify.");

    // 💬 Armar historial de conversación en formato OpenAI
    const messages = [
      ...history.map(msg => ({
        role: msg.role === "assistant" ? "assistant" : "user",
        content: msg.text,
      })),
      { role: "user", content: message },
    ];

    // 🚀 Llamada directa a OpenAI REST API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // 🔁 estable y económico
        messages,
        temperature: 0.7,
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

    const reply = data.choices?.[0]?.message?.content?.trim() || "Sin respuesta del modelo.";

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
