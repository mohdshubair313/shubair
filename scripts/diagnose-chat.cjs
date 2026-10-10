// Read-only checks: never prints credentials or changes the vector collection.
const dotenv = require('dotenv');
const { DataAPIClient } = require('@datastax/astra-db-ts');

dotenv.config({ path: '.env.local' });
const secrets = Object.entries(process.env)
  .filter(([key]) => /KEY|TOKEN|APPLICATION/.test(key))
  .map(([, value]) => value)
  .filter(Boolean);
const redact = (message) => secrets.reduce((text, secret) => text.split(secret).join('[redacted]'), String(message));

async function check(name, action) {
  const started = Date.now();
  try {
    const result = await action();
    console.log(JSON.stringify({ check: name, ms: Date.now() - started, ...result }));
    return result;
  } catch (error) {
    console.log(JSON.stringify({ check: name, ms: Date.now() - started, error: redact(error.message) }));
    return null;
  }
}

async function main() {
  await Promise.all([
    check('astra-collection', async () => {
      const db = new DataAPIClient(process.env.ASTRA_DB_APPLICATION).db(process.env.ASTRA_DB_ENDPOINT);
      const collections = await db.listCollections({ maxTimeMS: 10000 });
      const collection = collections.find((entry) => entry.name === process.env.ASTRA_DB_COLLECTION);
      return { exists: Boolean(collection), dimension: collection?.options?.vector?.dimension };
    }),
    check('google-embedding', async () => {
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': process.env.GOOGLE_API_KEY },
        body: JSON.stringify({ model: 'models/gemini-embedding-001', content: { parts: [{ text: 'What projects has Shubair built?' }] } }),
        signal: AbortSignal.timeout(10000),
      });
      const data = await response.json();
      return { status: response.status, dimension: data.embedding?.values?.length, error: data.error ? redact(data.error.message) : undefined };
    }),
    check('groq-answer', async () => {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.GROQ_API_KEY}` },
        body: JSON.stringify({ model: process.env.GROQ_MODEL || 'openai/gpt-oss-20b', messages: [{ role: 'user', content: 'Reply with hello.' }], max_tokens: 128 }),
        signal: AbortSignal.timeout(15000),
      });
      const data = await response.json();
      return { status: response.status, answered: Boolean(data.choices?.[0]?.message?.content), error: data.error ? redact(data.error.message) : undefined };
    }),
  ]);
}

main().catch((error) => { console.error(redact(error.message)); process.exitCode = 1; });
