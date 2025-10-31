// netlify/functions/chat.js
const fetch = require("node-fetch");
const { Agent, Runner, withTrace } = require("@openai/agents");

exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const { message, history = [] } = body;

    if (!message) {
      return {
        statusCode: 400,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ error: "Missing message" }),
      };
    }

    // 🧠 Crear el agente
    const myAgent = new Agent({
      name: "Asistente Repremar",
      instructions: `Sos el asistente virtual de Repremar Logistics.
Recordá las operaciones anteriores si se te pasan en la conversación.`,
      model: "gpt-4o-mini", // 🔁 más estable que gpt-5-nano en serverless
      modelSettings: {
        reasoning: { effort: "low", summary: "auto" },
        store: false,
      },
    });

    // ⚙️ Runner
    const runner = new Runner({
      traceMetadata: {
        __trace_source__: "agent-builder",
        workflow_id: "wf_6904f825047481909f36198a0a2a269d0687102ba226cd40",
      },
    });

    // 💬 Armar historial de conversación
    const conversation = [
      ...history.map((msg) => ({
        role: msg.role,
        content: [{ type: "input_text", text: msg.text }],
      })),
      { role: "user", content: [{ type: "input_text", text: message }] },
    ];

    // 🚀 Ejecutar el agente
    const response = await withTrace("Repremar Agent Run", async () => {
      return await runner.run(myAgent, conversation);
    });

    console.log("📤 Respuesta bruta del modelo:", JSON.stringify(response, null, 2));

    // 🔍 Aseguramos que la respuesta siempre sea texto
    let reply =
      response?.finalOutput ||
      response?.output_text ||
      response?.output ||
      "Sin respuesta del agente.";

    if (typeof reply !== "string") {
      try {
        reply = JSON.stringify(reply);
      } catch {
        reply = "⚠️ Error interpretando respuesta del modelo.";
      }
    }

    // ✨ Enviar resultado
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reply }),
    };
  } catch (err) {
    console.error("💥 Error interno:", err);
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({
        error: err.message,
        stack: err.stack,
      }),
    };
  }
};
