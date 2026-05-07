import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), 'content');

// These content/ subdirs are NOT article categories — skip them
// 'reviews' has its own route (app/reviews/[slug]) and lib (lib/reviews.js)
// 'platforms' holds JSON data files, not markdown articles
const EXCLUDED_DIRS = ['platforms', 'reviews'];

// Converts Date objects from gray-matter back to ISO strings.
// YAML auto-parses bare dates (2026-05-07) as JS Dates, which
// React and Next.js static export cannot serialise.
function stringifyDates(data) {
  const out = { ...data };
  for (const key of Object.keys(out)) {
    if (out[key] instanceof Date) {
      out[key] = out[key].toISOString().slice(0, 10);
    }
  }
  return out;
}

function getCategoryDirs() {
  if (!fs.existsSync(contentDir)) return [];
  return fs
    .readdirSync(contentDir, { withFileTypes: true })
    .filter(d => d.isDirectory() && !EXCLUDED_DIRS.includes(d.name))
    .map(d => d.name);
}

/** Returns all published articles across every category folder. */
export function getAllArticles() {
  const categories = getCategoryDirs();
  const articles = [];

  for (const category of categories) {
    const dir = path.join(contentDir, category);
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

    for (const filename of files) {
      const raw = fs.readFileSync(path.join(dir, filename), 'utf8');
      const { data } = matter(raw);
      const safe = stringifyDates(data);
      articles.push({
        ...safe,
        slug: safe.slug || filename.replace(/\.md$/, ''),
        categorySlug: category, // the folder name = URL segment
      });
    }
  }

  return articles
    .filter(a => a.status === 'published')
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

/** Reads a single article by its category folder + slug. */
export function getArticleBySlug(categorySlug, slug) {
  const filepath = path.join(contentDir, categorySlug, `${slug}.md`);
  if (!fs.existsSync(filepath)) return null;
  const raw = fs.readFileSync(filepath, 'utf8');
  const { data, content } = matter(raw);
  const safe = stringifyDates(data);
  return { ...safe, slug, categorySlug, content };
}

/**
 * Returns { category, slug } pairs for every markdown file across all
 * category folders. Used by generateStaticParams in the dynamic route.
 */
export function getAllArticleParams() {
  const categories = getCategoryDirs();
  const params = [];

  for (const category of categories) {
    const dir = path.join(contentDir, category);
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
    for (const filename of files) {
      params.push({ category, slug: filename.replace(/\.md$/, '') });
    }
  }

  return params;
}
