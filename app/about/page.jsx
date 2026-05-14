import AboutClient from './AboutClient';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export const metadata = {
  title: 'About Bridge Playbook — Our Story & Mission',
  description: 'Bridge Playbook is an independent guide to online bridge for players of all levels. Learn about our mission, our team and how to get in touch.',
  alternates: { canonical: 'https://bridgeplaybook.com/about/' },
};

export default async function AboutPage() {
  let data = null;
  try {
    const filepath = path.join(process.cwd(), 'content', 'about.md');
    if (fs.existsSync(filepath)) {
      const raw = fs.readFileSync(filepath, 'utf8');
      const { data: frontmatter, content } = matter(raw);
      let body_html = null;
      // Decap CMS markdown widget named 'body' may store content in frontmatter.body
      // or the page may use the markdown content area — check both
      const bodySource = frontmatter.body || content || '';
      if (bodySource.trim()) {
        body_html = (await remark().use(html).process(bodySource)).toString();
      }
      data = { ...frontmatter, body_html };
    }
  } catch {
    data = null;
  }

  return <AboutClient data={data} />;
}
