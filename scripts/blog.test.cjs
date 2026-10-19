/* eslint-disable @typescript-eslint/no-require-imports -- Register the CommonJS ts-node test loader before importing TypeScript. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { test } = require('node:test');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const matter = require('gray-matter');
const ts = require('typescript');

require('ts-node').register({ transpileOnly: true, compilerOptions: { module: 'CommonJS', moduleResolution: 'node' } });
const { createBlogMarkupPlugin } = require('../src/lib/blog-markup');

async function render(source) {
  const { compileMDX } = await import('next-mdx-remote/rsc');
  const { default: rehypeSlug } = await import('rehype-slug');
  const { default: remarkGfm } = await import('remark-gfm');
  const toc = [];
  const blocks = [];
  const captureCode = ({ 'data-code': code, 'data-language': language, children }) => {
    blocks.push({ code, language });
    return React.createElement('pre', null, code ?? children);
  };
  const demo = () => null;
  const { content } = await compileMDX({
    source,
    options: { mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug, createBlogMarkupPlugin(toc)] } },
    components: {
      pre: captureCode,
      HarnessDiagram: demo, ToolCallFlow: demo, FeatureStateMachine: demo,
      VerificationLayers: demo, RalphLoop: demo, CleanStateChecklist: demo,
    },
  });
  return { html: renderToStaticMarkup(content), blocks, toc };
}

test('tagged and plain fenced source survives MDX rendering, including indentation and symbols', async () => {
  const source = ['## Setup & `useModel`', '', '`inlineCode()` stays inline.', '',
    '```typescript', '  const label = "<code> & value";', '# this is code, not a heading', '```', '',
    '```', 'plain text diagram -> next step', '```', '', '## Setup & `useModel`'].join('\n');
  const result = await render(source);
  assert.equal(result.blocks.length, 2);
  assert.equal(result.blocks[0].language, 'typescript');
  assert.equal(result.blocks[0].code, '  const label = "<code> & value";\n# this is code, not a heading\n');
  assert.equal(result.blocks[1].language, 'text');
  assert.match(result.html, /<code>inlineCode\(\)<\/code>/);
  assert.equal(result.toc.length, 2);
  assert.equal(result.toc[0].text, 'Setup & useModel');
  assert.notEqual(result.toc[0].id, result.toc[1].id);
  for (const item of result.toc) assert.ok(result.html.includes(`id="${item.id}"`));
});

const directory = path.join(__dirname, '../src/content/blogs');
for (const filename of fs.readdirSync(directory).filter(name => name.endsWith('.mdx'))) {
  test(`${filename}: every published code block contains source and navigation matches real headings`, async () => {
    const { content } = matter(fs.readFileSync(path.join(directory, filename), 'utf8'));
    const result = await render(content);
    assert.ok(result.blocks.length > 0);
    for (const block of result.blocks) {
      assert.equal(typeof block.code, 'string');
      assert.ok(block.code.trim().length > 0, 'An empty code example was published');
      if (block.language === 'typescript') {
        const compiled = ts.transpileModule(block.code, {
          reportDiagnostics: true,
          compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
        });
        assert.deepEqual(compiled.diagnostics?.filter(item => item.category === ts.DiagnosticCategory.Error), []);
      }
    }
    for (const item of result.toc) assert.ok(result.html.includes(`id="${item.id}"`));
  });
}

test('the published Python attention example runs and its causal-mask invariants hold', t => {
  const runtime = [['python', []], ['py', ['-3']]].find(([command, args]) => {
    const result = spawnSync(command, [...args, '--version'], { encoding: 'utf8' });
    return !result.error && result.status === 0;
  });
  if (!runtime) return t.skip('Python is not installed');
  const article = fs.readFileSync(path.join(directory, 'AOYN_PAPER.mdx'), 'utf8');
  const code = article.match(/```python\r?\n([\s\S]*?)```/)[1];
  const result = spawnSync(runtime[0], [...runtime[1], '-c', code], { encoding: 'utf8', timeout: 10000 });
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /\[\[10\.0, 0\.0\], \[3\.302, 6\.698\]\]/);
});
