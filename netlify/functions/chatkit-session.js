// netlify/functions/chatkit-session.js
import { OpenAI } from "openai";

export async function handler(event, context) {
  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const session = await openai.chatkit.sessions.create({
      workflow: { id: process.env.WORKFLOW_ID },
      user: "web-user-" + crypto.randomUUID()
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ client_secret: session.client_secret })
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.message })
    };
  }
}
