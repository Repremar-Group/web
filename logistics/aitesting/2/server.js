// Minimal Express server to create ChatKit sessions
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

// Create ChatKit session and return client_secret
app.post('/api/chatkit/session', async (req, res) => {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    const workflowId = process.env.WORKFLOW_ID;

    if (!apiKey || !workflowId) {
      return res.status(500).json({ error: 'Missing OPENAI_API_KEY or WORKFLOW_ID' });
    }

    const deviceId = req.body && req.body.user ? String(req.body.user) : req.ip || 'anonymous';

    const response = await fetch('https://api.openai.com/v1/chatkit/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'OpenAI-Beta': 'chatkit_beta=v1',
      },
      body: JSON.stringify({
        workflow: { id: workflowId },
        user: deviceId,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).json({ error: 'OpenAI error', details: text });
    }

    const data = await response.json();
    const { client_secret } = data || {};
    if (!client_secret) {
      return res.status(500).json({ error: 'Missing client_secret in response' });
    }

    res.json({ client_secret });
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: String(err) });
  }
});

app.listen(port, () => {
  console.log(`ChatKit session server listening at http://localhost:${port}`);
});


