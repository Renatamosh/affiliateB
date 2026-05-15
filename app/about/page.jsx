import AboutClient from './AboutClient';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';

async function getAboutData() {
  try {
    const filepath = path.join(process.cwd(), 'content', 'about.md');
    if (!fs.existsSync(filepath)) return null;
    const raw = fs.readFileSync(filepath, 'utf8');
    const { data: frontmatter, content } = matter(raw);
    let body_html = null;
    const bodySource = frontmatter.body || content || '';
    if (bodySource.trim()) {
      body_html = (await remark().use(remarkHtml, { sanitize: false }).process(bodySource)).toString();
    }
    return { ...frontmatter, body_html };
  } catch {
    return null;
  }
}

export async function generateMetadata() {
  const cms = await getAboutData();
  return {
    title: cms?.meta_title || 'About Bridge Playbook — Our Story & Mission',
    description: cms?.meta_description || 'Bridge Playbook is an independent guide to online bridge for players of all levels. Learn about our mission, our team and how to get in touch.',
    openGraph: {
      title: cms?.og_title || cms?.meta_title || 'About Bridge Playbook',
      description: cms?.og_description || cms?.meta_description || 'Bridge Playbook is an independent guide to online bridge.',
      url: cms?.canonical || 'https://bridgeplaybook.com/about/',
      ...(cms?.og_image && { images: [{ url: cms.og_image }] }),
    },
    alternates: { canonical: cms?.canonical || 'https://bridgeplaybook.com/about/' },
  };
}

export default async function AboutPage() {
  const data = await getAboutData();
  return <AboutClient data={data} />;
}
