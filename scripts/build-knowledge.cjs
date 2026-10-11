// Build retrieval data from versioned content, without any network or credentials.
const fs = require('node:fs');
const path = require('node:path');
const matter = require('gray-matter');
const portfolio = require('../src/content/portfolio.json');
const blogs = [];
const chunks = [];
const directory = 'src/content/blogs';
for (const file of fs.readdirSync(directory).filter((name) => name.endsWith('.mdx')).sort()) {
  const { content, data } = matter(fs.readFileSync(path.join(directory, file), 'utf8'));
  const slug = file.replace(/\.mdx$/, '');
  const url = `${portfolio.website}/blogs/${slug}`;
  blogs.push({ title: data.title || slug, summary: data.summary || '', url, readingTime: data.readingTime || `${Math.ceil(content.split(/\s+/).length / 200)} min read` });
  const text = content.replace(/^import .*$/gm, '').replace(/\{\/\*[\s\S]*?\*\/\}/g, '').replace(/<[^>]+>/g, '').trim();
  const paragraphs = text.split(/\n\s*\n/);
  let section = '';
  let index = 0;
  const save = () => {
    if (section.trim()) chunks.push({ id: `blog-${slug}-${index++}`, title: data.title || slug, url, content: section.trim(), kind: 'article' });
    section = '';
  };
  for (const paragraph of paragraphs) {
    if (section.length + paragraph.length > 1800) save();
    // Long code blocks are bounded too; no giant prompt chunks.
    for (let offset = 0; offset < paragraph.length; offset += 1800) {
      section += paragraph.slice(offset, offset + 1800) + '\n\n';
      if (section.length >= 1800) save();
    }
  }
  save();
}
fs.mkdirSync('src/content/generated', { recursive: true });
fs.writeFileSync('src/content/generated/blog-catalog.json', JSON.stringify(blogs, null, 2) + '\n');
fs.writeFileSync('src/content/generated/article-index.json', JSON.stringify(chunks) + '\n');
console.log(`Built local knowledge: ${portfolio.projects.length} projects, ${blogs.length} blogs, ${chunks.length} article passages.`);
