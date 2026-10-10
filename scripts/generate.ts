import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { Document } from "@langchain/core/documents";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { getEmbeddingsCollection, getVectorStore } from "../src/lib/astradb";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

async function GenerateEmbeddings() {
    const db = await getEmbeddingsCollection();
    const collection = process.env.ASTRA_DB_COLLECTION || "embeddings";

    // Drop existing collection if it exists
    try {
        await db.dropCollection(collection);
        console.log(`Dropped existing collection: ${collection}`);
    } catch (error) {
        console.log(`Collection ${collection} does not exist, creating new one`);
    }

    const vectorStore = await getVectorStore({ provision: true });

    const documents: Document[] = [];

    // 1. Home / Bio / About Content
    documents.push(new Document({
        pageContent: `About Mohd Shubair:
Mohd Shubair is a Software Engineer and AI Engineer Intern actively mastering Machine Learning (ML) and Deep Learning (DL). He builds modern web applications and AI-powered systems with Next.js, React, TypeScript, Python, FastAPI, and LangChain.
Passionate about crafting dynamic, intelligent web applications and turning complex AI ideas into intuitive reality.
Interested in global opportunities, especially in tech-forward hubs like Japan, Germany, and remote worldwide roles.
Portfolio Website: https://shubair.vercel.app/
Booking a meeting/call: https://cal.com/mohdshubair313/30min`,
        metadata: {
            url: `https://shubair.vercel.app/`,
            source: "about",
            title: "About Mohd Shubair"
        },
    }));

    // 2. Official Social Media Profiles & Contact Info (CRITICAL)
    documents.push(new Document({
        pageContent: `Mohd Shubair's Verified Official Social Media Handles and Contact Links:
- GitHub: https://github.com/mohdshubair313 (Username: mohdshubair313)
- LinkedIn: https://www.linkedin.com/in/mohd-shubair-b1a454250/ (Profile: Mohd Shubair)
- Twitter / X: https://x.com/shubair313/ (Handle: @shubair313)
- Peerlist: https://peerlist.io/shubair (Profile: @shubair)
- LeetCode: https://leetcode.com/mohd_shubair (Username: mohd_shubair)
- Email: hey@shubair.in and shubair313@gmail.com
- Portfolio Website: https://shubair.vercel.app/
- Schedule a Call: https://cal.com/mohdshubair313/30min

When asked for Shubair's social media, profiles, github, linkedin, twitter, peerlist, leetcode, or email, always use these exact links.`,
        metadata: {
            url: `https://shubair.vercel.app/contact`,
            source: "social_media",
            title: "Social Media & Contact Handles"
        },
    }));

    // 3. Technical Skills & Tech Stack
    documents.push(new Document({
        pageContent: `Technical Skills and Tech Stack of Mohd Shubair:
- Frontend: Next.js 15, React 19, TypeScript, Tailwind CSS, Framer Motion, Three.js, GSAP, HTML5, CSS3, JavaScript (ES6+).
- Backend & AI: Python, FastAPI, Node.js, Express.js, Django, LangChain, LangGraph, RAG (Retrieval-Augmented Generation), Vector Databases (Astra DB / DataStax, Pinecone), OpenAI API, Groq, Google Gemini, Ollama.
- Databases: PostgreSQL, MongoDB, Astra DB, Redis.
- DevOps & Tools: Docker, Git, GitHub, GitHub Actions, CI/CD, AWS, Vercel, Turbopack.
- Machine Learning & Data Science: NumPy, Pandas, Matplotlib, Seaborn, Scikit-Learn, Deep Learning, Multithreading Data Pipelines.`,
        metadata: {
            url: `https://shubair.vercel.app/`,
            source: "skills",
            title: "Skills & Tech Stack"
        },
    }));

    // 4. Projects Master List and Individual Deep Dives
    const projects = [
        {
            title: "TradeInsight",
            description: "A FastAPI service that analyzes market data and provides trade opportunity insights for specific sectors in India.",
            tags: ["FastAPI", "AI", "Market Analysis", "Trading"],
            link: "https://trade-opportunity-by-ai.vercel.app/",
            github: "https://github.com/mohdshubair313/Trade_opportunity_ByAI"
        },
        {
            title: "Friends AI",
            description: "AI-based virtual friend that understands emotions and provides meaningful conversations powered by advanced language models. Users can interact with voice and live chat modes.",
            tags: ["AI", "Next.js", "Groq", "Emotion AI"],
            link: "https://friends-ai-sunf.vercel.app/",
            github: "https://github.com/mohdshubair313"
        },
        {
            title: "Chaty AI",
            description: "Intelligent research assistant that helps with papers, resume improvements, and contextual Q&A using vector embeddings, LangChain, and LLMs.",
            tags: ["Chatbot", "RAG", "LangChain", "AI"],
            link: "https://chaty-ai.vercel.app/",
            github: "https://github.com/mohdshubair313/ChatyBackend/"
        },
        {
            title: "Bollyscript AI",
            description: "AI-powered Bollywood script generation platform that creates movie scripts with custom scenes, dialogues, and characters.",
            tags: ["Next.js", "OpenAI", "AI", "Creativity"],
            link: "https://bollyscript.vercel.app",
            github: "https://github.com/mohdshubair313"
        },
        {
            title: "Next Stripe",
            description: "Premium subscription management platform with Stripe payment gateway integration for seamless billing experiences.",
            tags: ["Stripe", "Payments", "Next.js", "SaaS"],
            link: "https://next-stripe-smoky.vercel.app/",
            github: "https://github.com/mohdshubair313"
        },
        {
            title: "iPhone Landing Page",
            description: "Stunning 3D landing page for iPhone featuring smooth animations, Three.js 3D models, and interactive product showcase with GSAP.",
            tags: ["3D", "GSAP", "Three.js", "Animations"],
            link: "https://apple3-d-page-sepia.vercel.app/",
            github: "https://github.com/mohdshubair313/Apple3DPage"
        },
        {
            title: "Travelbook",
            description: "AI-powered travel assistant that handles vacation planning, tickets, stays, and meals tailored to your budget with an AI chatbot concierge.",
            tags: ["AI", "Travel", "Next.js", "Chatbot"],
            link: "Under Development",
            github: "https://github.com/mohdshubair313/Travelbook"
        }
    ];

    // Master list of all projects
    documents.push(new Document({
        pageContent: `All Projects Built by Mohd Shubair:
1. TradeInsight: A FastAPI service analyzing market data and providing trade opportunity insights for specific sectors in India. Demo: https://trade-opportunity-by-ai.vercel.app/ | GitHub: https://github.com/mohdshubair313/Trade_opportunity_ByAI
2. Friends AI: Virtual friend that understands emotions and provides meaningful conversations with voice and live chat modes. Demo: https://friends-ai-sunf.vercel.app/ | GitHub: https://github.com/mohdshubair313
3. Chaty AI: Intelligent research assistant for papers, resume improvements, and contextual Q&A using vector embeddings & LangChain. Demo: https://chaty-ai.vercel.app/ | GitHub: https://github.com/mohdshubair313/ChatyBackend/
4. Bollyscript AI: AI-powered Bollywood script generation platform creating custom scenes and dialogues. Demo: https://bollyscript.vercel.app | GitHub: https://github.com/mohdshubair313
5. Next Stripe: Premium subscription management platform with Stripe payment gateway integration. Demo: https://next-stripe-smoky.vercel.app/ | GitHub: https://github.com/mohdshubair313
6. iPhone Landing Page: 3D landing page with Three.js and GSAP animations. Demo: https://apple3-d-page-sepia.vercel.app/ | GitHub: https://github.com/mohdshubair313/Apple3DPage
7. Travelbook: AI-powered vacation planning assistant handling flights, stays, and meals. GitHub: https://github.com/mohdshubair313/Travelbook (In Development)

Projects Page URL: https://shubair.vercel.app/projects`,
        metadata: {
            url: `https://shubair.vercel.app/projects`,
            source: "projects_master",
            title: "Master Projects Catalog"
        },
    }));

    projects.forEach(project => {
        documents.push(new Document({
            pageContent: `Project Title: ${project.title}
Description: ${project.description}
Technologies & Tags: ${project.tags.join(", ")}
Live Demo URL: ${project.link}
GitHub Repository: ${project.github}`,
            metadata: {
                url: `https://shubair.vercel.app/projects`,
                source: "project",
                title: project.title,
                tags: project.tags,
                link: project.link,
                github: project.github
            },
        }));
    });

    // 5. Experience Page Content
    const experiences = [
        {
            company: "Stealth Startup",
            position: "Full-Stack Developer",
            period: "Dec 2025 – April 2026",
            location: "Remote",
            description: "Developing and deploying client projects, implementing CI/CD pipelines, and optimizing application performance across the stack.",
            skills: ["Next.js", "TypeScript", "PostgreSQL", "Docker"]
        },
        {
            company: "Bestlatech Solutions",
            position: "MERN Stack Intern",
            period: "Aug 2025 – Oct 2025",
            location: "Remote",
            description: "Worked on full-stack projects including social media and e-commerce platforms using Django, React, Node.js, and MongoDB.",
            skills: ["React", "Node.js", "Django", "MongoDB", "AWS"]
        }
    ];

    experiences.forEach(exp => {
        documents.push(new Document({
            pageContent: `Work Experience:
Role: ${exp.position} at ${exp.company}
Duration: ${exp.period} (${exp.location})
Details: ${exp.description}
Key Skills: ${exp.skills.join(", ")}`,
            metadata: {
                url: `https://shubair.vercel.app/experience`,
                source: "experience",
                title: `${exp.position} at ${exp.company}`,
                company: exp.company,
                skills: exp.skills
            },
        }));
    });

    // 6. ML Learnings & Proof of Work (From /ml-learnings)
    const mlLearnings = [
        {
            title: "NASA Meteorite Data Science Project",
            platform: "LinkedIn / X",
            date: "Feb 14, 2026",
            description: "Space science and data analytics project analyzing NASA's raw Meteorite Landings dataset. Cleaned and preprocessed raw NASA data, resolved missing entries using Pandas dropna, mapped latitude/longitude coordinates on interactive scatter maps, generated distribution plots of meteorite sizes, and identified historical reporting biases.",
            url: "https://www.linkedin.com/posts/mohd-shubair-b1a454250_datascience-machinelearning-python-ugcPost-7468237360691044353-sMLn/"
        },
        {
            title: "Multithreading in ML Pipelines (4.7x Speedup)",
            platform: "LinkedIn",
            date: "Mar 3, 2026",
            description: "Demonstrated how multithreading with Python's concurrent.futures ThreadPoolExecutor prevents sequential execution blocking during I/O-bound data fetching and preprocessing. Reduced preprocessing time from 6.23s down to 1.33s (4.7x speed improvement).",
            url: "https://www.linkedin.com/posts/mohd-shubair-b1a454250_machinelearning-multithreading-multiprocessing-share-7471544124979195906-i6aD/"
        },
        {
            title: "Infinite Nesting in Notion (System Design & Tree Data Structures)",
            platform: "LinkedIn",
            date: "Jan 25, 2026",
            description: "System design deep dive analyzing how Notion manages infinite nested blocks (/page inside /page) using Adjacency Lists, Path Enumeration, Nested Sets, and recursive SQL Common Table Expressions (CTEs) in distributed document stores.",
            url: "https://www.linkedin.com/posts/mohd-shubair-b1a454250_systemdesign-softwareengineering-notion-share-7461368273679462400-1Mdd/"
        }
    ];

    mlLearnings.forEach(item => {
        documents.push(new Document({
            pageContent: `ML Learning & Proof of Work:
Topic: ${item.title}
Platform: ${item.platform} (${item.date})
Summary: ${item.description}
Post URL: ${item.url}`,
            metadata: {
                url: item.url,
                source: "ml_learning",
                title: item.title
            },
        }));
    });

    // 7. Master Blogs Catalog & Individual Summaries
    const blogDir = path.join(process.cwd(), "src/content/blogs");
    const blogFiles = fs.readdirSync(blogDir).filter(file => file.endsWith(".mdx"));

    // Master list of all blogs written by Mohd Shubair
    documents.push(new Document({
        pageContent: `All Technical Blog Posts Written by Mohd Shubair (Total: 3 in-depth blogs):
1. Title: "Attention Is All You Need - The Complete Story"
   - Category / Type: AI Architecture, Transformer Deep Dive, NLP, Deep Learning.
   - Published: 2026-01-28 | Reading Time: 30 minutes
   - Summary: A deep dive into the most important paper in AI history. Explains why RNNs and LSTMs struggled with long sequences, how the Self-Attention and Multi-Head Attention mechanisms work, and how the Transformer architecture revolutionized modern LLMs.
   - URL: https://shubair.vercel.app/blogs/AOYN_PAPER

2. Title: "Harness Engineering: The Secret to Making AI Agents Actually Work"
   - Category / Type: AI Agent Engineering, Autonomous Systems, Production MLOps.
   - Published: 2026-06-07 | Reading Time: 45 minutes
   - Summary: The ultimate guide to Harness Engineering. Explains why AI agents fail silently in production (breaking styles, hallucinating completions), how test harnesses and execution environments fix agent reliability, and how to build production-grade AI harnesses from scratch.
   - URL: https://shubair.vercel.app/blogs/HarnessEngineering

3. Title: "LangChain in Real-World Apps"
   - Category / Type: LLM Application Frameworks, TypeScript / JavaScript, LCEL, RAG.
   - Published: 2025-01-05 | Reading Time: 25 minutes
   - Summary: Practical, hands-on guide on implementing LangChain in JavaScript/TypeScript stacks. Covers LangChain Expression Language (LCEL), creating history-aware retrievers, combining document chains, and deploying real-world agentic workflows.
   - URL: https://shubair.vercel.app/blogs/langchain-guide

Summary: Mohd Shubair has written 3 comprehensive technical blogs on his portfolio covering AI Transformers, AI Agent Harness Engineering, and LangChain development.
Blogs Page URL: https://shubair.vercel.app/blogs`,
        metadata: {
            url: `https://shubair.vercel.app/blogs`,
            source: "blogs_master",
            title: "Master Blogs Catalog"
        },
    }));

    for (const file of blogFiles) {
        const filePath = path.join(blogDir, file);
        const source = fs.readFileSync(filePath, "utf-8");
        const { content, data } = matter(source);
        const slug = file.replace(".mdx", "");

        // Standalone summary document for high-relevance retrieval
        documents.push(new Document({
            pageContent: `Blog Post Summary:
Title: ${data.title || slug}
Published Date: ${data.publishedAt || "N/A"}
Reading Time: ${data.readingTime || "N/A"}
Summary / Overview: ${data.summary || ""}
Direct URL: https://shubair.vercel.app/blogs/${slug}
Author: Mohd Shubair`,
            metadata: {
                url: `https://shubair.vercel.app/blogs/${slug}`,
                source: "blog_summary",
                title: data.title || slug,
                publishedAt: data.publishedAt,
                readingTime: data.readingTime,
                summary: data.summary
            },
        }));

        // Full content document for detailed technical queries
        documents.push(new Document({
            pageContent: `Blog Article: ${data.title || slug}
Published: ${data.publishedAt || "N/A"}
Reading Time: ${data.readingTime || "N/A"}
URL: https://shubair.vercel.app/blogs/${slug}

${content}`,
            metadata: {
                url: `https://shubair.vercel.app/blogs/${slug}`,
                source: "blog",
                title: data.title || slug,
                publishedAt: data.publishedAt,
                readingTime: data.readingTime,
                summary: data.summary
            },
        }));
    }

    // 8. Split documents for better retrieval
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
    });

    const splitDocs = await splitter.splitDocuments(documents);
    console.log(`Split ${documents.length} documents into ${splitDocs.length} chunks`);

    // 9. Add documents to vector store
    console.log("Adding documents to Astra DB vector store...");
    await vectorStore.addDocuments(splitDocs);
    console.log("All documents and embeddings added successfully!");
}

// Call the GenerateEmbeddings function
GenerateEmbeddings();
