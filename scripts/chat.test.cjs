const assert = require('node:assert/strict');
const { test } = require('node:test');
const { setImmediate: nextTurn } = require('node:timers/promises');
require('ts-node').register({ transpileOnly: true, compilerOptions: { module: 'CommonJS', moduleResolution: 'node' } });

const astra = require('../src/lib/astradb');
const { ChatGroq } = require('@langchain/groq');
const { AIMessage, AIMessageChunk } = require('@langchain/core/messages');
const { ChatGenerationChunk } = require('@langchain/core/outputs');
const { Document } = require('@langchain/core/documents');
const { createChatResponse } = require('../src/lib/chat');
const prompt = 'Verified GitHub: https://github.com/mohdshubair313. Context: {context}';
const user = { role: 'user', content: 'What projects has Shubair built?' };

function request(messages = [user], signal) {
    return new Request('http://localhost/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages }), signal });
}
function setup(t) {
    const previousKey = process.env.GROQ_API_KEY;
    process.env.GROQ_API_KEY = 'test-key';
    t.after(() => {
        if (previousKey === undefined) delete process.env.GROQ_API_KEY;
        else process.env.GROQ_API_KEY = previousKey;
    });
    t.mock.method(console, 'info', () => {});
    t.mock.method(console, 'warn', () => {});
    t.mock.method(console, 'error', () => {});
    const retrieval = t.mock.method(astra, 'retrievePortfolioDocuments', async () => [new Document({ pageContent: 'Chaty AI is a RAG research assistant.' })]);
    const generation = t.mock.method(ChatGroq.prototype, '_streamResponseChunks', async function* () {
        for (const text of ['Chaty AI ', 'uses RAG.']) {
            yield new ChatGenerationChunk({ text, message: new AIMessageChunk(text) });
        }
    });
    return { retrieval, generation };
}
async function flush() {
    for (let i = 0; i < 12; i++) await nextTurn();
}

test('streams retrieved facts and skips rewriting the welcome message', async (t) => {
    const { retrieval, generation } = setup(t);
    const rewrite = t.mock.method(ChatGroq.prototype, '_generate', async () => { throw Error('Unnecessary rewrite'); });
    const response = await createChatResponse(request([{ role: 'assistant', content: 'Welcome!' }, user]), prompt);
    assert.equal(response.status, 200);
    assert.equal(await response.text(), 'Chaty AI uses RAG.');
    assert.equal(retrieval.mock.calls[0].arguments[0], user.content);
    assert.equal(rewrite.mock.callCount(), 0);
    assert.match(generation.mock.calls[0].arguments[0][0].content, /Chaty AI is a RAG research assistant/);
});

test('rewrites a follow-up question using conversation history', async (t) => {
    const { retrieval } = setup(t);
    const rewrite = t.mock.method(ChatGroq.prototype, '_generate', async () => ({ generations: [{ text: 'Which technology does Chaty AI use?', message: new AIMessage('Which technology does Chaty AI use?') }] }));
    const response = await createChatResponse(request([user, { role: 'assistant', content: 'Chaty AI uses RAG.' }, { role: 'user', content: 'Which technology does it use?' }]), prompt);
    assert.equal(await response.text(), 'Chaty AI uses RAG.');
    assert.equal(rewrite.mock.callCount(), 1);
    assert.equal(retrieval.mock.calls[0].arguments[0], 'Which technology does Chaty AI use?');
});

test('a failed question rewrite still retrieves using the original question', async (t) => {
    const { retrieval } = setup(t);
    t.mock.method(ChatGroq.prototype, '_generate', async () => { throw Error('Rate limited'); });
    const latest = { role: 'user', content: 'Tell me more about Chaty AI.' };
    const response = await createChatResponse(request([user, { role: 'assistant', content: 'Chaty AI.' }, latest]), prompt);
    assert.equal(response.status, 200);
    await response.text();
    assert.equal(retrieval.mock.calls[0].arguments[0], latest.content);
});

test('database or embedding errors fall back before answer streaming', async (t) => {
    const { retrieval, generation } = setup(t);
    retrieval.mock.mockImplementation(async () => { throw Error('Database unavailable'); });
    const response = await createChatResponse(request(), prompt);
    assert.equal(response.status, 200);
    assert.equal(await response.text(), 'Chaty AI uses RAG.');
    const system = generation.mock.calls[0].arguments[0][0].content;
    assert.match(system, /https:\/\/github.com\/mohdshubair313/);
    assert.doesNotMatch(system, /Chaty AI is a RAG research assistant/);
});

test('hung retrieval falls back at eight seconds and aborts its signal', async (t) => {
    const { retrieval } = setup(t);
    retrieval.mock.mockImplementation(() => new Promise(() => {}));
    t.mock.timers.enable({ apis: ['setTimeout'] });
    const pending = createChatResponse(request(), prompt);
    await flush();
    assert.equal(retrieval.mock.callCount(), 1);
    t.mock.timers.tick(8001);
    const response = await pending;
    assert.equal(response.status, 200);
    assert.equal(await response.text(), 'Chaty AI uses RAG.');
    assert.equal(retrieval.mock.calls[0].arguments[1].aborted, true);
});

test('a provider error on its first stream chunk returns a helpful 503', async (t) => {
    const { generation } = setup(t);
    generation.mock.mockImplementation(async function* () { throw Error('Provider failure with sensitive detail'); });
    const response = await createChatResponse(request(), prompt);
    assert.equal(response.status, 503);
    assert.match(await response.text(), /temporarily unavailable/);
});

test('a provider that never produces its first chunk gets a bounded 504', async (t) => {
    const { generation } = setup(t);
    generation.mock.mockImplementation(async function* () { await new Promise(() => {}); });
    t.mock.timers.enable({ apis: ['setTimeout'] });
    const pending = createChatResponse(request(), prompt);
    await flush();
    assert.equal(generation.mock.callCount(), 1);
    t.mock.timers.tick(50001);
    const response = await pending;
    assert.equal(response.status, 504);
    assert.match(await response.text(), /took too long/);
});

test('a mid-stream failure closes with a readable interruption message', async (t) => {
    const { generation } = setup(t);
    generation.mock.mockImplementation(async function* () {
        yield new ChatGenerationChunk({ text: 'Partial answer.', message: new AIMessageChunk('Partial answer.') });
        throw Error('Connection lost');
    });
    const response = await createChatResponse(request(), prompt);
    const text = await response.text();
    assert.match(text, /Partial answer/);
    assert.match(text, /response was interrupted/);
});

test('empty reasoning and metadata chunks do not stall the text stream', async (t) => {
    const { generation } = setup(t);
    generation.mock.mockImplementation(async function* () {
        for (const text of ['', 'Answer ', '', '', 'completed.', '']) {
            yield new ChatGenerationChunk({ text, message: new AIMessageChunk(text) });
        }
    });
    const response = await createChatResponse(request(), prompt);
    assert.equal(await response.text(), 'Answer completed.');
});

test('a stalled stream is closed at the overall deadline', async (t) => {
    const { generation } = setup(t);
    generation.mock.mockImplementation(async function* () {
        yield new ChatGenerationChunk({ text: 'Partial answer.', message: new AIMessageChunk('Partial answer.') });
        await new Promise(() => {});
    });
    t.mock.timers.enable({ apis: ['setTimeout'] });
    const response = await createChatResponse(request(), prompt);
    const body = response.text();
    await flush();
    t.mock.timers.tick(50001);
    const text = await body;
    assert.match(text, /Partial answer/);
    assert.match(text, /response was interrupted/);
});

test('cancelling the response aborts the provider request', async (t) => {
    const { generation } = setup(t);
    const response = await createChatResponse(request(), prompt);
    const providerSignal = generation.mock.calls[0].arguments[1].signal;
    await response.body.cancel();
    assert.equal(providerSignal.aborted, true);
});

test('invalid payloads return 400 without contacting AI services', async (t) => {
    const { retrieval, generation } = setup(t);
    for (const messages of [[], [{ role: 'user', content: '' }], [{ role: 'user', content: '  ' }], [{ role: 'assistant', content: 'Hello' }], [{ role: 'user', content: 42 }], [{ role: 'user', content: 'x'.repeat(8001) }]]) {
        const response = await createChatResponse(request(messages), prompt);
        assert.equal(response.status, 400);
    }
    const malformed = new Request('http://localhost/api/chat', { method: 'POST', body: '{invalid' });
    assert.equal((await createChatResponse(malformed, prompt)).status, 400);
    assert.equal(retrieval.mock.callCount(), 0);
    assert.equal(generation.mock.callCount(), 0);
});

test('missing Groq configuration returns 503 instead of crashing the route', async (t) => {
    const { retrieval } = setup(t);
    delete process.env.GROQ_API_KEY;
    const response = await createChatResponse(request(), prompt);
    assert.equal(response.status, 503);
    assert.equal(retrieval.mock.callCount(), 0);
});
