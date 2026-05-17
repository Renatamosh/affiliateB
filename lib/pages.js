import fs from 'fs';
import path from 'path';
import safeMatter from './safeMatter.js';

const pagesDir = path.join(process.cwd(), 'content', 'pages');

/**
 * Reads a singleton page from content/pages/[slug].md
 * Returns the frontmatter data, or null if the file does not exist.
 */
export function getPageData(slug) {
  const filepath = path.join(pagesDir, `${slug}.md`);
  if (!fs.existsSync(filepath)) return null;
  const raw = fs.readFileSync(filepath, 'utf8');
  const { data, content } = safeMatter(raw);
  return { ...data, content };
}
