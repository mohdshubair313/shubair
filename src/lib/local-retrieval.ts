import articles from "../content/generated/article-index.json";
import { ConversationMessage, getSavedPortfolioAnswer, portfolioDocuments, rankPortfolioDocuments } from "./portfolio-knowledge";

const documents = [...portfolioDocuments, ...articles];
export function retrieveLocalPortfolio(query: string, history: ConversationMessage[]) {
    const matches = rankPortfolioDocuments(query, documents, history);
    return {
        context: matches.map((document) => `Source: ${document.title} (${document.url})\n${document.content}`).join("\n\n").slice(0, 12000),
        fallback: getSavedPortfolioAnswer(query, history, documents),
        found: matches.length > 0,
    };
}
