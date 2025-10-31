// netlify/functions/chat.js
const fetch = require("node-fetch");
const { Agent, Runner, withTrace } = require("@openai/agents");

exports.handler = async function (event) {
  // Solo permitimos POST
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

    // 🧠 Definición del agente
    const myAgent = new Agent({
      name: "Asistente Repremar",
      instructions: `Sos un asistente virtual de Repremar Logistics.
Podés recordar las operaciones anteriores de esta conversación para mantener contexto y continuidad.`,
      model: "gpt-5-nano",
      modelSettings: {
        reasoning: { effort: "low", summary: "auto" },
        store: false,
      },
    });

    // 🧩 Inicializamos el runner
    const runner = new Runner({
      traceMetadata: {
        __trace_source__: "agent-builder",
        workflow_id: "wf_6904f825047481909f36198a0a2a269d0687102ba226cd40",
      },
    });

    // 💬 Armamos el historial completo de conversación
    const conversation = [
      ...history.map(msg => ({
        role: msg.role,
        content: [{ type: "input_text", text: msg.text }],
      })),
      { role: "user", content: [{ type: "input_text", text: message }] },
    ];

    // 🚀 Ejecutamos el agente
    const result = await withTrace("Repremar Agent Run", async () => {
      const response = await runner.run(myAgent, conversation);

      if (!response) throw new Error("No se recibió respuesta del modelo.");

      // 🧠 Aseguramos que se devuelva texto aunque la estructura cambie
      const output =
        response.finalOutput ||
        response.output_text ||
        response.output ||
        response.toString();

      return output;
    });

    // ✨ Devolvemos la respuesta al frontend
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reply: result }),
    };

  } catch (err) {
    console.error("💥 Error interno del agente:", err);
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
