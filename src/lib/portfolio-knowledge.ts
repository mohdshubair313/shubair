import portfolio from "../content/portfolio.json";
import blogs from "../content/generated/blog-catalog.json";

export type ConversationMessage = { role: string; content: string };
export type KnowledgeDocument = { id: string; title: string; url: string; content: string; kind: string };
export const QUICK_QUESTIONS = [
    { label: "Projects", question: "What projects has Shubair built?" },
    { label: "Experience", question: "What is Shubair's work experience?" },
    { label: "Skills", question: "What are Shubair's technical skills?" },
    { label: "Contact", question: "How can I contact Shubair?" },
];

const normalize = (text: string) => text.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();
const contact = `[Email Shubair](mailto:${portfolio.email}) · [LinkedIn](${portfolio.socials[1].url}) · [Book a call](${portfolio.booking})`;
const projectAnswer = (project: (typeof portfolio.projects)[number]) => {
    const published = project.link !== "#" ? `[Live demo](${project.link})` : "In development";
    const github = project.github !== "#" ? ` · [Source code](${project.github})` : "";
    return `**${project.title}**\n\n${project.description}\n\n**Published tech stack:** ${project.tags.join(", ")}\n\n${published}${github}`;
};
const experienceAnswer = portfolio.experiences.map((item) => `**${item.title} · ${item.company}**\n${item.date} · ${item.location}\n\n${item.description}\n\nTools: ${item.skills.join(", ")}`).join("\n\n---\n\n");
const projectsAnswer = "Here are Shubair's projects:\n\n" + portfolio.projects.map((project) => `- **${project.title}** — ${project.description} ${project.link !== "#" ? `[Demo](${project.link})` : "(In development)"}`).join("\n") + `\n\n[Explore all projects](${portfolio.website}/projects)`;
const blogsAnswer = "Shubair's published articles:\n\n" + blogs.map((blog) => `- [${blog.title}](${blog.url}) — ${blog.summary} (${blog.readingTime})`).join("\n");

export const portfolioDocuments: KnowledgeDocument[] = [
    { id: "about", title: "About Mohd Shubair", url: portfolio.website, content: `${portfolio.name}: ${portfolio.role}. ${portfolio.summary}`, kind: "profile" },
    { id: "skills", title: "Technical skills", url: portfolio.website, content: `Published skills and tools: ${portfolio.skills.join(", ")}. These describe Shubair's overall experience, not the stack of every individual project.`, kind: "skills" },
    { id: "contact", title: "Contact and social profiles", url: `${portfolio.website}/contact`, content: portfolio.socials.map((social) => `[${social.label}](${social.url})`).join("\n") + `\n${contact}`, kind: "contact" },
    { id: "availability", title: "Roles and opportunities", url: `${portfolio.website}/contact`, content: `${portfolio.availability}\n${contact}`, kind: "availability" },
    { id: "experience", title: "Work experience", url: `${portfolio.website}/experience`, content: experienceAnswer, kind: "experience" },
    ...portfolio.projects.map((project) => ({ id: `project-${normalize(project.title).replace(/ /g, "-")}`, title: project.title, url: `${portfolio.website}/projects`, content: projectAnswer(project), kind: "project" })),
    ...blogs.map((blog, index) => ({ id: `blog-${index}`, title: blog.title, url: blog.url, content: `${blog.summary}\nReading time: ${blog.readingTime}\n[Read article](${blog.url})`, kind: "blog" })),
];

function mentionedProject(text: string) {
    const normalized = ` ${normalize(text)} `;
    const matches = portfolio.projects.filter((project) => normalized.includes(` ${normalize(project.title)} `)
        || (project.title.endsWith(" AI") && normalized.includes(` ${normalize(project.title.replace(/ AI$/, ""))} `)));
    return matches.length === 1 ? matches[0] : undefined;
}

function referencedProject(query: string, history: ConversationMessage[]) {
    const explicit = mentionedProject(query);
    if (explicit) return explicit;
    if (!/\b(it|its|this|that|these|they|iska|uska|isaki|usaki|isme|usme|ye|woh|wahi)\b/.test(normalize(query))) return undefined;
    for (const message of [...history].reverse()) {
        const project = mentionedProject(message.content);
        if (project) return project;
    }
}

// Common recruiter questions use published facts immediately, with no external calls.
export function getDirectPortfolioAnswer(query: string, history: ConversationMessage[] = []): string | null {
    const text = normalize(query);
    if (/\b(salary|compensation|phone|mobile number|age|birthday|visa|sponsorship|resume|cv|start date)\b/.test(text)) {
        return `That detail isn't published on this portfolio. For the latest information, ${contact}.`;
    }
    if (/^(hi|hello|hey|namaste|hello shubair|hi shubair)$/.test(text)) {
        return `Hi! I can help you explore Shubair's projects, experience and skills. You can also ${contact}.`;
    }
    if (/\b(contact|email|social|handles|github|linkedin|twitter|peerlist|leetcode|book|schedule|sampark)\b/.test(text) && !mentionedProject(query)) {
        const selected = portfolio.socials.filter((social) => text.includes(normalize(social.label).split(" ")[0]));
        return (selected.length ? selected.map((social) => `[${social.label}](${social.url})`).join(" · ") : portfolio.socials.map((social) => `[${social.label}](${social.url})`).join(" · ")) + `\n\n${contact}`;
    }
    const project = referencedProject(query, history);
    if (project && !/\b(why|how|compare|architecture|explain|design|implementation|tradeoff|kaise|kyun)\b/.test(text)) return projectAnswer(project);
    if (/\b(experience|employment|internship|worked|career|anubhav)\b/.test(text)) return experienceAnswer;
    if (/\b(blogs|blog|articles|article|written|writing)\b/.test(text) && !/\b(explain|why|how)\b/.test(text)) return blogsAnswer;
    if (/\b(projects|project|portfolio projects|built|kaam)\b/.test(text) && !/\b(explain|why|how|compare|architecture)\b/.test(text)) return projectsAnswer;
    if (/\b(skills|skill|tech stack|technologies|tools|technology|takneek)\b/.test(text) && !project) return `Shubair's published skills and tools include:\n\n${portfolio.skills.map((skill) => `- ${skill}`).join("\n")}\n\nAsk about a specific project to see its own tech stack.`;
    if (/\b(available|availability|hire|hiring|opportunities|opportunity|roles|recruiter|remote)\b/.test(text)) return `${portfolio.availability}\n\n${contact}`;
    if (/\b(who|introduce|introduction|about shubair|about mohd|yourself|kaun)\b/.test(text)) return `**${portfolio.name}**\n\n${portfolio.role}. ${portfolio.summary}\n\n${portfolio.availability}\n\n${contact}`;
    return null;
}

const stopWords = new Set("what which where when why how does do is are was were the a an and or for to of in on his he him her she shubair mohd me you your it its this that about tell explain please can could would with use uses built project projects work more kya hai hain ke ki ka se mujhe bata batao".split(" "));
export function rankPortfolioDocuments(query: string, documents: KnowledgeDocument[], history: ConversationMessage[] = []) {
    const project = referencedProject(query, history);
    const tokens = [...new Set(normalize(`${query} ${project?.title || ""}`).split(" ").filter((token) => token.length > 2 && !stopWords.has(token)))];
    return documents.map((document) => {
        const title = normalize(document.title);
        const text = normalize(document.content);
        const score = tokens.reduce((sum, token) => sum + (title.includes(token) ? 5 : 0) + (text.includes(token) ? 1 : 0), 0)
            + (project && document.title === project.title ? 15 : 0);
        return { document, score };
    }).filter((match) => match.score > 0).sort((a, b) => b.score - a.score).slice(0, 4).map((match) => match.document);
}

export function getSavedPortfolioAnswer(query: string, history: ConversationMessage[] = [], documents = portfolioDocuments) {
    const direct = getDirectPortfolioAnswer(query, history);
    if (direct) return direct;
    const matches = rankPortfolioDocuments(query, documents, history).slice(0, 2);
    if (!matches.length) return `That detail isn't published on this portfolio. You can ask about projects, experience, skills or blogs, or ${contact}.`;
    return "Here are the relevant details published on Shubair's portfolio:\n\n" + matches.map((document) => `${document.kind === "project" ? "" : `**${document.title}**\n\n`}${document.content}\n\n[View source](${document.url})`).join("\n\n---\n\n");
}
