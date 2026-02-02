import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { Document } from "@langchain/core/documents";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { getEmbeddingsCollection, getVectorStore } from "../src/lib/astradb";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

async function GenerateEmbeddings() {
    const vectorStore = await getVectorStore();
    const db = await getEmbeddingsCollection();
    const collection = process.env.ASTRA_DB_COLLECTION || "collectionName";
    
    // Drop existing collection if it exists
    try {
        await db.dropCollection(collection);
        console.log(`Dropped existing collection: ${collection}`);
    } catch (error) {
        console.log(`Collection ${collection} does not exist, creating new one`);
    }

    const documents: Document[] = [];

    // 1. Home Page Content
    documents.push(new Document({
        pageContent: `Hey, I am Shubair! I'm a passionate full-stack developer crafting dynamic web apps and exploring AI-driven possibilities, turning ideas into reality—one line of code at a time! I build modern web applications with Next.js, React, and AI technologies.`,
        metadata: {
            url: `https://shubair.vercel.app/`,
            source: "page",
            title: "Home"
        },
    }));

    // 2. Projects Page Content
    const projects = [
        {
            title: "Friends AI",
            description: "AI-based virtual friend that understands emotions and provides meaningful conversations powered by advanced language models. User can interact with voice and live chat mode in premium section",
            tags: ["AI", "Next.js", "OpenAI", "Emotion AI"],
            link: "https://friends-ai-sunf.vercel.app/"
        },
        {
            title: "Next Stripe",
            description: "Premium subscription management platform with Stripe payment gateway integration for seamless billing experiences.",
            tags: ["Stripe", "Payments", "Next.js", "SaaS"],
            link: "https://next-stripe-smoky.vercel.app/"
        },
        {
            title: "iPhone Landing Page",
            description: "Stunning 3D landing page for iPhone 14 Pro Max featuring smooth animations and interactive product showcase.",
            tags: ["3D", "GSAP", "Three.js", "Animations"],
            link: "https://apple3-d-page-sepia.vercel.app/"
        },
        {
            title: "Chaty AI",
            description: "Intelligent research assistant that helps with papers, resume improvements, and even resume roasting with AI humor.",
            tags: ["Chatbot", "RAG", "LangChain", "AI"],
            link: "https://chaty-ai.vercel.app/"
        },
        {
            title: "Trade AI",
            description: "A FastAPI service that analyzes market data and provides trade opportunity insights for specific sectors in India.",
            tags: ["FastAPI", "AI", "Market Analysis", "Trading"],
            link: "https://trade-opportunity-by-ai.vercel.app/"
        },
        {
            title: "Travelbook",
            description: "AI-powered travel assistant that handles flight bookings, hotel reservations, and meal planning tailored to your budget. Premium users get a personal concierge chatbot.",
            tags: ["AI", "Travel", "Next.js", "Chatbot"],
            link: "Under Development"
        }
    ];

    projects.forEach(project => {
        documents.push(new Document({
            pageContent: `${project.title}: ${project.description} - Tags: ${project.tags.join(", ")}. This project demonstrates expertise in ${project.tags.join(", ")}.`,
            metadata: {
                url: `https://shubair.vercel.app/projects`,
                source: "project",
                title: project.title,
                tags: project.tags,
                link: project.link
            },
        }));
    });

    // 3. Experience Page Content
    const experiences = [
        {
            company: "Bestlatech Solutions",
            position: "MERN stack intern",
            period: "August 2025 - October 2025",
            location: "Remote",
            description: "Worked on full stack projects like social media, e-commerce with tech stack Django, React, Nodejs, mongodb etc.",
            skills: ["React", "Node.js", "AWS"]
        },
        {
            company: "Stealth Startup",
            position: "Full Stack Developer",
            period: "Dec 2025 - Current",
            location: "Remote",
            description: "Developed and deployed multiple client projects with different technologies, implemented CI/CD pipelines, and optimized application performance.",
            skills: ["Next.js", "TypeScript", "PostgreSQL", "Docker"]
        }
    ];

    experiences.forEach(exp => {
        documents.push(new Document({
            pageContent: `Worked at ${exp.company} as ${exp.position} from ${exp.period} (${exp.location}). ${exp.description} Key skills: ${exp.skills.join(", ")}.`,
            metadata: {
                url: `https://shubair.vercel.app/experience`,
                source: "experience",
                title: `${exp.position} at ${exp.company}`,
                company: exp.company,
                skills: exp.skills
            },
        }));
    });

    // 4. Contact Page Content
    documents.push(new Document({
        pageContent: `Contact Shubair through the contact form on his portfolio. You can send him a message using the contact form. He is available for freelance work, collaborations, and job opportunities.`,
        metadata: {
            url: `https://shubair.vercel.app/contact`,
            source: "page",
            title: "Contact"
        },
    }));

    // 5. Load all blog posts from src/content/blogs/
    const blogDir = path.join(process.cwd(), "src/content/blogs");
    const blogFiles = fs.readdirSync(blogDir).filter(file => file.endsWith(".mdx"));

    for (const file of blogFiles) {
        const filePath = path.join(blogDir, file);
        const source = fs.readFileSync(filePath, "utf-8");
        const { content, data } = matter(source);
        
        documents.push(new Document({
            pageContent: content,
            metadata: {
                url: `https://shubair.vercel.app/blogs/${file.replace(".mdx", "")}`,
                source: "blog",
                title: data.title || file.replace(".mdx", ""),
                publishedAt: data.publishedAt,
                readingTime: data.readingTime,
                summary: data.summary
            },
        }));
    }

    // 6. Split documents for better retrieval
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
    });

    const splitDocs = await splitter.splitDocuments(documents);
    console.log(`Split ${documents.length} documents into ${splitDocs.length} chunks`);

    // 7. Add documents to vector store
    console.log("Adding documents to Astra DB...");
    await vectorStore.addDocuments(splitDocs);
    console.log("Documents added successfully!");
}

// Call the GenerateEmbeddings function
GenerateEmbeddings();
