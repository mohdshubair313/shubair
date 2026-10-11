const assert = require('node:assert/strict');
const { test } = require('node:test');
const { setImmediate: nextTurn } = require('node:timers/promises');
require('ts-node').register({ transpileOnly: true, compilerOptions: { module: 'CommonJS', moduleResolution: 'node' } });
const { ChatGroq } = require('@langchain/groq');
const { AIMessageChunk } = require('@langchain/core/messages');
const { ChatGenerationChunk } = require('@langchain/core/outputs');
const { getDirectPortfolioAnswer, getSavedPortfolioAnswer, QUICK_QUESTIONS } = require('../src/lib/portfolio-knowledge');
const { retrieveLocalPortfolio } = require('../src/lib/local-retrieval');
const { fetchPortfolioChat } = require('../src/lib/chat-client');
const { POST: contact } = require('../src/app/api/contact/route');
const question = 'Explain how Chaty AI helps with document research';
const prompt = 'Use only published context: {context}';
const msg = content => ({ role: 'user', content });
const request = (messages = [msg(question)], signal) => new Request('http://localhost/api/chat', { method: 'POST', body: JSON.stringify({ messages }), signal });
const options = (content = question, signal) => ({ method: 'POST', body: JSON.stringify({ messages: [msg(content)] }), signal });
const chunk = text => new ChatGenerationChunk({ text, message: new AIMessageChunk(text) });
async function flush() { for (let i = 0; i < 15; i++) await nextTurn(); }
function setup(t) {
  const old = process.env.GROQ_API_KEY;
  process.env.GROQ_API_KEY = 'offline-test';
  t.after(() => { if (old === undefined) delete process.env.GROQ_API_KEY; else process.env.GROQ_API_KEY = old; });
  t.mock.method(console, 'info', () => {});
  t.mock.method(console, 'warn', () => {});
  delete require.cache[require.resolve('../src/lib/chat')];
  const { createChatResponse: chat } = require('../src/lib/chat');
  const generation = t.mock.method(ChatGroq.prototype, '_streamResponseChunks', async function* () { yield chunk('Grounded answer.'); });
  const network = t.mock.method(global, 'fetch', async () => { throw Error('All external services down'); });
  return { chat, generation, network };
}

test('all recruiter quick questions work without any provider or network calls', async t => {
  const { chat, generation, network } = setup(t);
  delete process.env.GROQ_API_KEY;
  for (const item of QUICK_QUESTIONS) {
    const response = await chat(request([msg(item.question)]), prompt);
    assert.equal(response.status, 200);
    assert.ok((await response.text()).length > 50);
    const browser = await fetchPortfolioChat('/api/chat', options(item.question));
    assert.ok((await browser.text()).length > 50);
  }
  assert.equal(generation.mock.callCount(), 0);
  assert.equal(network.mock.callCount(), 0);
});
test('Friends AI stack matches confirmed data, including follow-up context', () => {
  const result = getDirectPortfolioAnswer('What is its tech stack?', [msg('Tell me about Friends AI')]);
  for (const tool of ['Next.js', 'TypeScript', 'Groq', 'WebRTC', 'LangChain', 'LangGraph', 'Vercel AI SDK']) assert.ok(result.includes(tool));
  assert.doesNotMatch(result, /Python|FastAPI|Transformers/);
});
test('unknown personal information is not invented', () => {
  assert.match(getDirectPortfolioAnswer('What salary does he expect?'), /isn't published/);
  assert.match(getSavedPortfolioAnswer('zzzzzz'), /isn't published/);
});
test('published article passages can be retrieved without a vector service', () => {
  const result = retrieveLocalPortfolio('Explain self attention transformer architecture', []);
  assert.equal(result.found, true);
  assert.match(result.context, /attention/i);
  assert.match(result.context, /\/blogs\//);
});
test('complex questions stream from local context with no embedding/DB/rewrite request', async t => {
  const { chat, generation, network } = setup(t);
  const result = await chat(request(), prompt);
  assert.equal(await result.text(), 'Grounded answer.');
  assert.equal(result.headers.get('X-Chat-Source'), 'ai');
  assert.equal(generation.mock.callCount(), 1);
  assert.match(generation.mock.calls[0].arguments[0][0].content, /Chaty AI/);
  assert.equal(network.mock.callCount(), 0);
});
test('missing AI config returns useful saved facts', async t => {
  const { chat, generation } = setup(t);
  delete process.env.GROQ_API_KEY;
  const response = await chat(request(), prompt);
  assert.equal(response.status, 200);
  assert.match(await response.text(), /Chaty AI/);
  assert.equal(generation.mock.callCount(), 0);
});
test('provider failures return saved details and briefly skip repeated failures', async t => {
  const { chat, generation } = setup(t);
  generation.mock.mockImplementation(async function* () { throw Error('secret upstream error'); });
  for (let i = 0; i < 2; i++) {
    const response = await chat(request(), prompt);
    assert.equal(response.status, 200);
    const text = await response.text();
    assert.match(text, /Chaty AI/);
    assert.doesNotMatch(text, /secret upstream/);
  }
  assert.equal(generation.mock.callCount(), 1);
});
test('hung AI produces saved details after five seconds', async t => {
  const { chat, generation } = setup(t);
  generation.mock.mockImplementation(async function* () { await new Promise(() => {}); });
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const pending = chat(request(), prompt);
  await flush();
  t.mock.timers.tick(5001);
  assert.match(await (await pending).text(), /Chaty AI/);
});
test('empty metadata chunks do not stall streaming', async t => {
  const { chat, generation } = setup(t);
  generation.mock.mockImplementation(async function* () { for (const text of ['', 'A', '', 'B', '']) yield chunk(text); });
  assert.equal(await (await chat(request(), prompt)).text(), 'AB');
});
test('mid-stream errors finish with published details', async t => {
  const { chat, generation } = setup(t);
  generation.mock.mockImplementation(async function* () { yield chunk('Partial.'); throw Error('Disconnect'); });
  const text = await (await chat(request(), prompt)).text();
  assert.match(text, /Partial/);
  assert.match(text, /published on Shubair/);
});
test('stalled server streams finish at the overall deadline', async t => {
  const { chat, generation } = setup(t);
  generation.mock.mockImplementation(async function* () { yield chunk('Partial.'); await new Promise(() => {}); });
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const response = await chat(request(), prompt);
  const pending = response.text();
  await flush();
  t.mock.timers.tick(20001);
  assert.match(await pending, /published on Shubair/);
});
test('cancelling a server stream aborts generation safely', async t => {
  const { chat, generation } = setup(t);
  const response = await chat(request(), prompt);
  await response.body.cancel();
  assert.equal(generation.mock.calls[0].arguments[1].signal.aborted, true);
});
test('invalid payloads are rejected without contacting services', async t => {
  const { chat, generation } = setup(t);
  for (const messages of [[], [msg('')], [msg(' ')], [msg(42)], [msg('x'.repeat(8001))], [{ role: 'assistant', content: 'Hi' }]]) {
    assert.equal((await chat(request(messages), prompt)).status, 400);
  }
  assert.equal((await chat(new Request('http://localhost', { method: 'POST', body: '{invalid' }), prompt)).status, 400);
  assert.equal(generation.mock.callCount(), 0);
});
for (const failure of ['offline', '502', 'empty']) test(`browser returns saved facts on ${failure}`, async t => {
  t.mock.method(global, 'fetch', async () => {
    if (failure === 'offline') throw Error('Offline');
    return new Response(failure === '502' ? 'Bad gateway' : '', { status: failure === '502' ? 502 : 200 });
  });
  assert.match(await (await fetchPortfolioChat('/api/chat', options())).text(), /Chaty AI/);
});
for (const stalled of ['headers', 'body']) test(`browser handles stalled ${stalled} in seven seconds`, async t => {
  t.mock.method(global, 'fetch', () => stalled === 'headers' ? new Promise(() => {}) : Promise.resolve(new Response(new ReadableStream({ pull() { return new Promise(() => {}); } }))));
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const pending = fetchPortfolioChat('/api/chat', options());
  await flush();
  t.mock.timers.tick(7001);
  assert.match(await (await pending).text(), /Chaty AI/);
});
test('browser streams a healthy answer unchanged', async t => {
  t.mock.method(global, 'fetch', async () => new Response('Full answer'));
  assert.equal(await (await fetchPortfolioChat('/api/chat', options())).text(), 'Full answer');
});
test('browser adds saved facts when a response stalls after its first token', async t => {
  t.mock.method(global, 'fetch', async () => new Response(new ReadableStream({ start(c) { c.enqueue(new TextEncoder().encode('Partial.')); }, pull() { return new Promise(() => {}); } })));
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const response = await fetchPortfolioChat('/api/chat', options());
  const pending = response.text();
  await flush();
  t.mock.timers.tick(20001);
  assert.match(await pending, /published on Shubair/);
});
test('user stop aborts browser requests without adding an unwanted fallback', async t => {
  t.mock.method(global, 'fetch', () => new Promise(() => {}));
  const controller = new AbortController();
  const pending = fetchPortfolioChat('/api/chat', options(question, controller.signal));
  const assertion = assert.rejects(pending, { name: 'AbortError' });
  controller.abort();
  await assertion;
});
const contactRequest = body => new Request('http://localhost/api/contact', { method: 'POST', body: JSON.stringify(body) });
test('contact rejects malformed types and oversized messages', async t => {
  const network = t.mock.method(global, 'fetch', async () => { throw Error('Must not send'); });
  for (const body of [null, { email: 4, message: 'Hi' }, { email: 'bad', message: 'Hi' }, { email: 'test@example.com', message: 'x'.repeat(5001) }]) assert.equal((await contact(contactRequest(body))).status, 400);
  assert.equal(network.mock.callCount(), 0);
});
test('contact reports success only after provider acceptance; uses plain text and reply address', async t => {
  const old = process.env.RESEND_API_KEY;
  process.env.RESEND_API_KEY = 'offline-test';
  t.after(() => { if (old === undefined) delete process.env.RESEND_API_KEY; else process.env.RESEND_API_KEY = old; });
  const network = t.mock.method(global, 'fetch', async () => Response.json({ id: 'mock-message' }));
  const response = await contact(contactRequest({ name: 'Test', email: 'test@example.com', message: '<script>test</script>' }));
  assert.deepEqual(await response.json(), { success: true });
  const sent = JSON.parse(network.mock.calls[0].arguments[1].body);
  assert.equal(sent.reply_to, 'test@example.com');
  assert.equal(sent.html, undefined);
  network.mock.mockImplementation(async () => { throw Error('Timeout'); });
  assert.equal((await contact(contactRequest({ email: 'test@example.com', message: 'Hello' }))).status, 503);
});
