import { readFileSync, writeFileSync } from 'fs';
import { glob } from 'glob';

// unified framework
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'

// remark plugins
import remarkFrontmatter from 'remark-frontmatter';
import remarkParseFrontmatter from 'remark-parse-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';

// rehype plugins
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeAddClasses from 'rehype-add-classes';

const processor = unified()
  .use(remarkParse)
  .use(remarkFrontmatter)
  .use(remarkParseFrontmatter)
  .use(remarkGfm)
  .use(remarkBreaks)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeSlug)
  .use(rehypeAutolinkHeadings)
  .use(rehypeExternalLinks, { target: '_blank' })
  .use(rehypeAddClasses, { 'h1,h2,h3,h4,h5,h6': 'group' })
  .use(rehypeStringify, { allowDangerousHtml: true });

async function processMarkdown(content: string) {
  const result = await processor.process(content);
  return {
    metadata: (result.data as any).frontmatter,
    html: result.toString(),
  };
}

async function buildMarkdownFile(filePath: string) {
  const content = readFileSync(filePath, 'utf-8');
  const { metadata, html } = await processMarkdown(content);

  // generate a .js file alongside the .md file
  const jsFilePath = filePath.replace(/\.md$/, '.js');
  const jsContent = `
export const metadata = ${JSON.stringify(metadata, null, 2)};
export const html = ${JSON.stringify(html)};
`;
  writeFileSync(jsFilePath, jsContent.trim());
}


export async function buildMarkdownFiles(sourceDir: string) {
  const markdownFiles = await glob(`${sourceDir}/*.md`);
  for (const filePath of markdownFiles) {
    await buildMarkdownFile(filePath);
  }
}