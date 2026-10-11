import { getDirectPortfolioAnswer, getSavedPortfolioAnswer, type ConversationMessage } from "./portfolio-knowledge";

// Common answers also work when the already-loaded page loses its connection.
export const fetchPortfolioChat: typeof fetch = async (input, init) => {
    const body = JSON.parse(String(init?.body || "{}"));
    const messages: ConversationMessage[] = body.messages || [];
    const query = messages.at(-1)?.content || "";
    const history = messages.slice(0, -1).slice(-12);
    const saved = () => new Response(getSavedPortfolioAnswer(query, history), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
    if (init?.signal?.aborted) throw init.signal.reason;
    if (!query.trim() || query.length > 8000) throw new Error("Please enter a message up to 8,000 characters.");
    const direct = getDirectPortfolioAnswer(query, history);
    if (direct) return new Response(direct);

    const controller = new AbortController();
    const onCancel = () => controller.abort(init?.signal?.reason);
    init?.signal?.addEventListener("abort", onCancel, { once: true });
    let deadline = setTimeout(() => controller.abort(new DOMException("Answer deadline exceeded", "TimeoutError")), 7000);
    const cleanup = () => { clearTimeout(deadline); init?.signal?.removeEventListener("abort", onCancel); };
    let reader: ReadableStreamDefaultReader<Uint8Array> | undefined;
    async function bounded<T>(work: Promise<T>): Promise<T> {
        let cancel = () => {};
        const aborted = new Promise<never>((_, reject) => {
            cancel = () => reject(controller.signal.reason);
            controller.signal.addEventListener("abort", cancel, { once: true });
            if (controller.signal.aborted) cancel();
        });
        try { return await Promise.race([work, aborted]); }
        finally { controller.signal.removeEventListener("abort", cancel); }
    }
    try {
        const response = await bounded(fetch(input, { ...init, body: JSON.stringify({ ...body, messages: messages.slice(-25) }), signal: controller.signal }));
        if (!response.ok || !response.body) throw new Error("Chat unavailable");
        reader = response.body.getReader();
        let first = await bounded(reader.read());
        while (!first.done && !first.value.length) first = await bounded(reader.read());
        if (first.done) throw new Error("Empty answer");
        clearTimeout(deadline);
        deadline = setTimeout(() => controller.abort(new DOMException("Stream deadline exceeded", "TimeoutError")), 20000);
        let sentFirst = false;
        let cancelled = false;
        return new Response(new ReadableStream<Uint8Array>({
            async pull(stream) {
                try {
                    const part = sentFirst ? await bounded(reader!.read()) : first;
                    sentFirst = true;
                    if (cancelled) return;
                    if (part.done) { cleanup(); stream.close(); }
                    else stream.enqueue(part.value);
                } catch {
                    if (cancelled) return;
                    if (!init?.signal?.aborted) stream.enqueue(new TextEncoder().encode(`\n\n---\n\n${getSavedPortfolioAnswer(query, history)}`));
                    cleanup(); controller.abort();
                    void reader?.cancel().catch(() => {});
                    stream.close();
                }
            },
            cancel() { cancelled = true; cleanup(); controller.abort(); void reader?.cancel().catch(() => {}); },
        }), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
    } catch {
        cleanup(); controller.abort();
        void reader?.cancel().catch(() => {});
        if (init?.signal?.aborted) throw init.signal.reason;
        return saved();
    }
};
