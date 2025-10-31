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
    const { message } = JSON.parse(event.body || "{}");
    if (!message) {
      return {
        statusCode: 400,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ error: "Missing message" }),
      };
    }

    // 🧠 Definición simple del agente
    const myAgent = new Agent({
      name: "Asistente Repremar",
      instructions: `Sos un asistente virtual de Repremar Logistics.
Por ahora solo tenes que hacer la cuenta que te manden y devolver el resultado`,
      model: "gpt-5-nano",
      modelSettings: {
        reasoning: { effort: "low", summary: "auto" },
        store: false
      }
    });

    // 🚀 Ejecutamos el agente con el mensaje recibido
    const runner = new Runner({
      traceMetadata: {
        __trace_source__: "agent-builder",
        workflow_id: "wf_6904f825047481909f36198a0a2a269d0687102ba226cd40"
      }
    });

    const result = await withTrace("Repremar Agent Run", async () => {
      const agentResponse = await runner.run(myAgent, [
        {
          role: "user",
          content: [{ type: "input_text", text: message }]
        }
      ]);

      if (!agentResponse.finalOutput) {
        throw new Error("El agente no devolvió salida final");
      }

      return agentResponse.finalOutput;
    });

    // ✨ Devolvemos la respuesta al frontend
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ reply: result })
    };
  } catch (err) {
    console.error("💥 Error en el servidor:", err);
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: err.message })
    };
  }
};
