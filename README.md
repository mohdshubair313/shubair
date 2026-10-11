This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Chatbot configuration and checks

The chatbot retrieves versioned portfolio content locally and optionally uses Groq to explain it. Set `GROQ_API_KEY` in `.env.local` and Vercel for AI answers. `GROQ_MODEL` defaults to `openai/gpt-oss-20b`. Basic answers and useful fallbacks work without any provider credentials.

Edit `src/content/portfolio.json` to update project facts, stacks, experience and contact details. Homepage projects, the Projects page and chatbot all read this file. Blog passages are generated from MDX by `scripts/build-knowledge.cjs`, automatically before development and production builds. This is lightweight lexical retrieval, not semantic vector search; it suits this small, mostly static portfolio. New content needs a rebuild/deploy.

```bash
npm run test:chat      # Offline regression tests, including stalled services and stream failures
npm run diagnose:chat  # Optional legacy Astra/Google/Groq diagnostics; no keys are printed
```

Common recruiter questions are answered from published facts in the browser, without an API request. Complex questions use local retrieval and one Groq request, with retries disabled. If no first text arrives within five seconds, the server returns published details. Streams have a 20-second deadline inside a 30-second function limit. An instance-local, one-minute cooldown skips repeated provider failures; it is not a distributed rate limiter.

The browser independently handles offline connections, 5xx errors, empty replies and stalled streams. It switches to saved details after seven seconds without first text, and bounds the remaining stream to 20 seconds. An already-loaded chat can answer basic questions offline; initial page/chunk loading still needs connectivity. The original Astra ingestion and diagnostics remain available, but Astra and Google embeddings are no longer required by `/api/chat`.

The contact form requires `RESEND_API_KEY`. `CONTACT_FROM_EMAIL` optionally selects a verified sender; the default remains `Portfolio Contact <onboarding@resend.dev>`. Success appears only after the provider accepts the message, not merely when an email app opens. Requests are bounded, drafts survive errors, and direct email is always available. Automated contact tests mock the email provider and never send email.

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
