
// netlify/functions/chatkit-session.js
const fetch = require("node-fetch");

exports.handler = async () => {
  try {
    // Llama a OpenAI para crear la sesión
    const response = await fetch("https://api.openai.com/v1/chatkit/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "OpenAI-Beta": "chatkit_beta=v1",
        "Authorization": "Bearer " + process.env.OPENAI_API_KEY
      },
      body: JSON.stringify({
        workflow: {
          id: "TU_WORKFLOW_ID_ACÁ"   // ⚠️ reemplazalo
        },
        user: "device_" + Date.now() // algo único por sesión
      })
    });

    const data = await response.json();

    if (!data.client_secret) {
      throw new Error("No se recibió client_secret de OpenAI. Respuesta: " + JSON.stringify(data));
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ client_secret: data.client_secret })
    };

  } catch (err) {
    console.error("Error creando sesión ChatKit:", err);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "No se pudo generar el client_secret",
        detail: err.message
      })
    };
  }
};
