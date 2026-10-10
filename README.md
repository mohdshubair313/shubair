This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Chatbot configuration and checks

The RAG chatbot uses Groq for answers, Google `gemini-embedding-001` for embeddings, and an existing Astra DB collection containing 3,072-dimensional vectors. Set `GROQ_API_KEY`, `GOOGLE_API_KEY`, `ASTRA_DB_ENDPOINT`, `ASTRA_DB_APPLICATION`, and `ASTRA_DB_COLLECTION` in `.env.local` and in the Vercel project's environment variables. `GROQ_MODEL` is optional and defaults to `openai/gpt-oss-20b`.

```bash
npm run test:chat      # Offline regression tests, including stalled services and stream failures
npm run diagnose:chat  # Read-only checks against the configured live services; no keys are printed
```

Chat requests read the existing collection without provisioning it. Retrieval has an eight-second deadline, and the whole response has a 50-second deadline inside a 60-second Vercel function limit. Failed retrieval uses the verified portfolio facts already in the prompt. A failed answer request displays a friendly message and a retry button. Runtime logs show retrieval and first-answer timing without logging questions or credentials.

`FUNCTION_INVOCATION_TIMEOUT` means Vercel stopped a request that exceeded its allowed runtime; it does not identify which upstream service caused the delay. See [Vercel's timeout documentation](https://vercel.com/docs/errors/function_invocation_timeout). Redeploy after changing the route code so its duration setting and fixes take effect. The saved `astra-collection-info.json` is a historical snapshot; `diagnose:chat` checks the actual collection.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
