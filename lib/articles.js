import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const articlesDir = path.join(process.cwd(), 'content', 'articles');

export function getAllArticles() {
  if (!fs.existsSync(articlesDir)) return [];
  const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md'));
  return files
    .map(filename => {
      const raw = fs.readFileSync(path.join(articlesDir, filename), 'utf8');
      const { data } = matter(raw);
      if (data.date instanceof Date) data.date = data.date.toISOString().split('T')[0];
      return { ...data, slug: filename.replace(/\.md$/, '') };
    })
    .filter(a => a.status === 'published')
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getArticleBySlug(slug) {
  const filepath = path.join(articlesDir, `${slug}.md`);
  if (!fs.existsSync(filepath)) return null;
  const raw = fs.readFileSync(filepath, 'utf8');
  const { data, content } = matter(raw);
  if (data.date instanceof Date) data.date = data.date.toISOString().split('T')[0];
  return { ...data, slug, content };
}

export function getAllArticleSlugs() {
  if (!fs.existsSync(articlesDir)) return [];
  return fs.readdirSync(articlesDir)
    .filter(f => f.endsWith('.md'))
    .map(f => f.replace(/\.md$/, ''));
}
