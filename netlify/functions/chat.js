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
    const { message, history = [] } = JSON.parse(event.body || "{}");
    if (!message) {
      return {
        statusCode: 400,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ error: "Missing message" }),
      };
    }

    const myAgent = new Agent({
      name: "Asistente Repremar",
      instructions: `Sos un asistente virtual de Repremar Logistics.
Podés recordar las operaciones anteriores en esta conversación si te las pasan.`,
      model: "gpt-5-nano",
      modelSettings: {
        reasoning: { effort: "low", summary: "auto" },
        store: false
      }
    });

    const runner = new Runner({
      traceMetadata: {
        __trace_source__: "agent-builder",
        workflow_id: "wf_6904f825047481909f36198a0a2a269d0687102ba226cd40"
      }
    });

    // Construimos el historial
    const conversation = [
      ...history.map(msg => ({
        role: msg.role,
        content: [{ type: "input_text", text: msg.text }]
      })),
      { role: "user", content: [{ type: "input_text", text: message }] }
    ];

    const result = await withTrace("Repremar Agent Run", async () => {
      const agentResponse = await runner.run(myAgent, conversation);
      if (!agentResponse.finalOutput) throw new Error("Sin salida final del agente");
      return agentResponse.finalOutput;
    });

    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ reply: result })
    };

  } catch (err) {
    console.error("💥 Error:", err);
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: err.message })
    };
  }
};
