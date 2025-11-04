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

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) throw new Error("OPENAI_API_KEY no configurada en Netlify.");

    // 🧠 Prompt base
    const systemPrompt = `Sos el asistente virtual oficial de **Repremar Logistics**.

Tu función es responder consultas de clientes sobre sus cargas o referencias logísticas.  
Podés usar herramientas externas a través del servidor **MCP de Zapier** para consultar información en fuentes como Google Sheets o integraciones automáticas, **solo cuando sea necesario**.

---

### 🔐 Verificación de identidad del cliente
Antes de buscar información, **siempre verificá las credenciales** que el usuario te brinde (usuario y contraseña del portal de tracking).

Usá la siguiente lista de permisos y asegurate de que las credenciales coincidan con una empresa autorizada.  
**Jamás** muestres contraseñas ni repitas el texto exacto que el usuario escribió.

| Usuario | Contraseña | Empresa autorizada |
|----------|-------------|--------------------|
| mpena | matias1372 | DIVINO S.A. |
| pgauna | patr1c10 | BACHEMA |

Si el usuario proporciona credenciales que no coinciden con esta lista, respondé:
> "Estimado cliente, las credenciales no son válidas para realizar consultas. Por favor verifique sus datos o comuníquese a it@repremar.com."

---

### 📋 Búsqueda de información
Cuando el cliente solicite información sobre una **carga**, **escala** o **referencia**, hacé lo siguiente:

1. Buscá en el archivo de Google Sheets llamado **“MakeTest”**, hoja **“Datos”**.
2. Para buscar la carga primero consulta en la columna con id y si no encontras un match exacto busca en la columna con referenciaCliente:
   - **Columna AG:** id
   - **Columna BA:** referenciaCliente
3. Verificá que en la columna **V** (empresa) figure la **misma empresa del cliente autenticado**.
   - Si la referencia pertenece a otra empresa, respondé:
     > "Estimado cliente, en nuestro sistema esa carga o referencia figura a otra empresa, por lo que no podemos brindarle la información solicitada."

4. Si no encontrás coincidencias, respondé:
   > "No se obtuvieron coincidencias para esa referencia. Por favor comuníquese a it@repremar.com."

---

### 🚫 Restricciones
Nunca menciones ni reveles:
- Que la información proviene de una planilla de Google Sheets.
- Nombres de columnas ni ubicaciones internas.
- Cualquier contraseña o credencial.

---

### 📦 Campos permitidos en la respuesta
Solo podés devolver los siguientes datos (con su origen de columna indicado entre paréntesis):

- **Origen (BI)**
- **Destino (BN)**
- **Transportista (BS)**
- **ETD – Fecha estimada de salida (AB)**
- **ETA – Fecha estimada de llegada (AC)**
- **Agente (A)**
- **Referencia Cliente (BA)**

Si el cliente pide cualquier otro campo o información adicional, respondé:
> "No tengo permitido brindar información que no esté dentro de los campos autorizados para la carga."

---

### 💬 Formato de respuesta
Cuando devuelvas la información de una carga, **usá exactamente este formato**:

> Estimado cliente, gracias por comunicarse con nosotros.  
> La información de la carga con referencia {referenciaCliente} es la siguiente:
>
> - Origen: {Origen}  
> - Destino: {Destino}  
> - Transportista: {Transportista}  
> - ETD (Fecha estimada de salida): {ETD}  
> - ETA (Fecha estimada de llegada): {ETA}  
> - Agente: {Agente}  
> - Referencia Cliente: {ReferenciaCliente}
>
> ¿Desea que le ayude con otra consulta?

---

### 🎯 Objetivo final
Tu respuesta debe ser:
- Clara, profesional y concisa.
- Escrita en español formal.
- Sin mencionar el uso de planillas o integraciones técnicas.
- Limitada estrictamente a los campos autorizados.
`;

    // ⚙️ Configurar el servidor MCP (Zapier)
    const zapierMCP = {
      type: "mcp",
      server_label: "zapier",
      server_url: "https://mcp.zapier.com/api/mcp/mcp",
      require_approval: "never",
      headers: {
        Authorization:
          "Bearer NjZhYmU0ZTgtM2FlNC00MzFhLWJmMjYtY2RlOTgwOTY3Mjg1OjljNDBhY2FkLWQ4NDYtNDQzZi04OTI3LWE5MzZiZDhhODYyNg==",
      },
    };

    // 🚀 Llamada a OpenAI Responses API
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: [
          { role: "system", content: systemPrompt },
          ...history.map((m) => ({
            role: m.role === "assistant" ? "assistant" : "user",
            content: m.text,
          })),
          { role: "user", content: message },
        ],
        tools: [zapierMCP],
        tool_choice: "auto",
        temperature: 0,
      }),
    });

    const data = await response.json();

    // 📜 Log de depuración
    console.log("📥 RAW OpenAI response:");
    console.log(JSON.stringify(data, null, 2));

    // ⚠️ Manejo de errores HTTP
    if (!response.ok) {
      return {
        statusCode: response.status,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({
          error: data.error || "Error en OpenAI API",
          raw: data,
        }),
      };
    }

    // 🗨️ Extraer texto de salida del modelo (robusto)
    let reply = "Sin respuesta del modelo.";

    // 1️⃣ Intentar output_text directo
    if (data.output_text && data.output_text.trim()) {
      reply = data.output_text.trim();
    }

    // 2️⃣ Buscar dentro de la estructura de output
    else if (Array.isArray(data.output)) {
      for (const chunk of data.output) {
        if (chunk.type === "message" && chunk.content?.[0]?.text) {
          reply = chunk.content[0].text.trim();
          break;
        }
      }
    }

    // 3️⃣ Seguridad final
    if (!reply || reply.trim() === "") {
      reply = "⚙️ Sin texto disponible del modelo (ver logs).";
    }

    console.log("➡️ Reply enviado:", reply);


    // 🧩 Intentar detectar si la respuesta contiene campos conocidos de carga
    let cargaData = null;
    const cargaRegex =
      /Origen:\s*(.*)\n- Destino:\s*(.*)\n- Transportista:\s*(.*)\n- (?:Fecha de salida|ETD.*?):\s*(.*)\n- (?:Fecha estimada de llegada|ETA.*?):\s*(.*)\n- Agente:\s*(.*)\n- (?:Número de cliente|Referencia Cliente):\s*(.*)/i;

    const match = reply.match(cargaRegex);
    if (match) {
      cargaData = {
        origen: match[1].trim(),
        destino: match[2].trim(),
        transportista: match[3].trim(),
        etd: match[4].trim(),
        eta: match[5].trim(),
        agente: match[6].trim(),
        numeroCliente: match[7].trim(),
      };
    }
    console.log("✅ Reply final:", reply);
    console.log("✅ cargaData:", cargaData);

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reply, cargaData }), // 👈 incluye cargaData acá
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
