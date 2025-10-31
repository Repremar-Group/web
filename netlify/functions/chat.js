// netlify/functions/chat.js
const fetch = require("node-fetch");
const { Agent, Runner, withTrace, hostedMcpTool } = require("@openai/agents");

exports.handler = async function (event) {
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

    // 🔧 Configuración del agente (idéntico a tu código original)
    const mcp = hostedMcpTool({
      serverLabel: "zapier",
      allowedTools: [
        "google_sheets_lookup_spreadsheet_rows_advanced",
        "google_sheets_get_spreadsheet_by_id",
        "google_sheets_create_spreadsheet_row",
      ],
      authorization:
        '{"expression":"\\"NjZhYmU0ZTgtM2FlNC00MzFhLWJmMjYtY2RlOTgwOTY3Mjg1OmM4MzA4ZmNjLWE1MjEtNDVmMS1hNTk1LWY1OTBjYmJiNDI3MA==\\"","format":"cel"}',
      requireApproval: "always",
      serverDescription: "MCP Sheets",
      serverUrl: "https://mcp.zapier.com/api/mcp/mcp",
    });

    const myAgent = new Agent({
      name: "Asistente Repremar",
      instructions: `Sos un asistente virtual. Por ahora, responde siempre:
"Estamos trabajando para implementar nuestro asistente virtual..."`,
      model: "gpt-5-nano",
      tools: [mcp],
      modelSettings: {
        reasoning: { effort: "low", summary: "auto" },
        store: true,
      },
    });

    const runner = new Runner({
      traceMetadata: {
        __trace_source__: "agent-builder",
        workflow_id: "wf_6904f825047481909f36198a0a2a269d0687102ba226cd40",
      },
    });

    const result = await withTrace("Repremar Agent Run", async () => {
      const agentResponse = await runner.run(myAgent, [
        {
          role: "user",
          content: [{ type: "input_text", text: message }],
        },
      ]);

      if (!agentResponse.finalOutput) {
        throw new Error("El agente no devolvió salida final");
      }

      return agentResponse.finalOutput;
    });

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reply: result }),
    };
  } catch (err) {
    console.error("💥 Error en el servidor:", err);
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: err.message }),
    };
  }
};
