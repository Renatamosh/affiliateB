import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const articlesDir = path.join(process.cwd(), 'content', 'articles');

// Converts any field value that gray-matter parsed as a Date object back to
// an ISO date string (YYYY-MM-DD). YAML auto-parses bare dates like 2026-05-07
// as JS Date objects, which React cannot render directly and Next.js cannot
// serialise during static prerendering.
function stringifyDates(data) {
  const out = { ...data };
  for (const key of Object.keys(out)) {
    if (out[key] instanceof Date) {
      out[key] = out[key].toISOString().slice(0, 10);
    }
  }
  return out;
}

export function getAllArticles() {
  if (!fs.existsSync(articlesDir)) return [];
  const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md'));
  return files
    .map(filename => {
      const raw = fs.readFileSync(path.join(articlesDir, filename), 'utf8');
      const { data } = matter(raw);
      const safe = stringifyDates(data);
      return { ...safe, slug: filename.replace(/\.md$/, '') };
    })
    .filter(a => a.status === 'published')
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getArticleBySlug(slug) {
  const filepath = path.join(articlesDir, `${slug}.md`);
  if (!fs.existsSync(filepath)) return null;
  const raw = fs.readFileSync(filepath, 'utf8');
  const { data, content } = matter(raw);
  const safe = stringifyDates(data);
  return { ...safe, slug, content };
}

export function getAllArticleSlugs() {
  if (!fs.existsSync(articlesDir)) return [];
  return fs.readdirSync(articlesDir)
    .filter(f => f.endsWith('.md'))
    .map(f => f.replace(/\.md$/, ''));
}
