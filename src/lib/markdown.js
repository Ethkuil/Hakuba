import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'

export const processor = unified()
  .use(remarkParse)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeSlug)
  .use(rehypeAutolinkHeadings)
  .use(rehypeExternalLinks, { target: '_blank' })
  .use(rehypeAddClasses, {
    'h1,h2,h3,h4,h5,h6': 'group'
  })
  .use(rehypeStringify, { allowDangerousHtml: true });

/**
 * @param {string} content
 */
export async function processMarkdown(content) {
  const result = await processor.process(content);
  return {
    html: result.toString(),
    data: result.data // frontmatter 数据
  };
}

/**
 * @param {string} filePath
 */
export async function processMarkdownFile(filePath) {
  const { readFileSync } = await import('fs');
  const { join } = await import('path');

  const fullPath = join(process.cwd(), filePath);
  const content = readFileSync(fullPath, 'utf-8');

  return processMarkdown(content);
}