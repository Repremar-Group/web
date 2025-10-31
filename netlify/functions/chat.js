// netlify/functions/chat.js

import fetch from "node-fetch"; // 👈 Importamos fetch manualmente

export async function handler(event) {
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

    const apiKey = process.env.OPENAI_API_KEY;
    const agentId = process.env.WORKFLOW_ID;

    if (!apiKey || !agentId) {
      throw new Error("Missing environment variables: OPENAI_API_KEY or WORKFLOW_ID");
    }

    const url = "https://api.openai.com/v1/agents/runs";

    console.log("🛰️ Sending message to OpenAI:", { agentId, message });

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        agent_id: agentId,
        input: message,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("❌ OpenAI API error:", data);
      return {
        statusCode: response.status,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ error: "OpenAI API error", detail: data }),
      };
    }

    const reply =
      data.output?.[0]?.content?.[0]?.text ||
      data.output?.content?.[0]?.text ||
      data.output?.[0]?.content?.text ||
      "Sin respuesta del agent
