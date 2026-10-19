import type { Root, RootContent } from "hast";

export interface TOCItem {
  id: string;
  text: string;
  level: number;
}

function nodeText(node: Root | RootContent): string {
  if (node.type === "text") return node.value;
  if (node.type === "element" && node.tagName === "img") {
    return String(node.properties.alt || "");
  }
  return "children" in node ? node.children.map(nodeText).join("") : "";
}

// Run after rehype-slug so navigation and rendered heading IDs always agree.
export function createBlogMarkupPlugin(toc: TOCItem[]) {
  return () => (tree: Root) => {
    const visit = (node: Root | RootContent) => {
      if (node.type === "element") {
        if (/^h[1-3]$/.test(node.tagName) && typeof node.properties.id === "string") {
          toc.push({ id: node.properties.id, text: nodeText(node), level: Number(node.tagName[1]) });
        }
        if (node.tagName === "pre") {
          const code = node.children.find((child) => child.type === "element" && child.tagName === "code");
          if (code?.type === "element") {
            // Pass source as a plain prop, independent of RSC child rendering order.
            node.properties["data-code"] = nodeText(code);
            const classes = Array.isArray(code.properties.className) ? code.properties.className : [];
            const language = classes.map(String).find((name) => name.startsWith("language-"));
            node.properties["data-language"] = language?.slice(9) || "text";
          }
        }
      }
      if ("children" in node) node.children.forEach(visit);
    };
    visit(tree);
  };
}
