import fs from 'fs';
import path from 'path';
import safeMatter from './safeMatter.js';

const reviewsDir = path.join(process.cwd(), 'content', 'reviews');

export function getAllReviews() {
  if (!fs.existsSync(reviewsDir)) return [];
  const files = fs.readdirSync(reviewsDir).filter(f => f.endsWith('.md'));
  return files
    .map(filename => {
      const raw = fs.readFileSync(path.join(reviewsDir, filename), 'utf8');
      const { data } = safeMatter(raw);
      return { ...data, slug: data.slug || filename.replace(/\.md$/, '') };
    })
    .filter(r => r.status === 'published')
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getReviewBySlug(slug) {
  const filepath = path.join(reviewsDir, `${slug}.md`);
  if (!fs.existsSync(filepath)) return null;
  const raw = fs.readFileSync(filepath, 'utf8');
  const { data, content } = safeMatter(raw);
  return { ...data, slug: data.slug || slug, content };
}

export function getAllReviewSlugs() {
  if (!fs.existsSync(reviewsDir)) return [];
  return fs.readdirSync(reviewsDir)
    .filter(f => f.endsWith('.md'))
    .map(f => f.replace(/\.md$/, ''));
}
