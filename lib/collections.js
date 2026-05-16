import fs from 'fs'
import path from 'path'
import safeMatter from './safeMatter.js'
import { remark } from 'remark'
import html from 'remark-html'

export function getCollectionSlugs(collection) {
  const dir = path.join(process.cwd(), 'content', collection)
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir).filter(f => f.endsWith('.md')).map(f => f.replace('.md', ''))
}

export function getCollectionItem(collection, slug) {
  const filepath = path.join(process.cwd(), 'content', collection, `${slug}.md`)
  if (!fs.existsSync(filepath)) return null
  const raw = fs.readFileSync(filepath, 'utf8')
  const { data, content } = safeMatter(raw)
  return { ...data, content }
}

export async function getCollectionItemWithHtml(collection, slug) {
  const item = getCollectionItem(collection, slug)
  if (!item) return null
  const bodyHtml = (await remark().use(html).process(item.content || '')).toString()
  const seoBodyHtml = item.seo_body ? (await remark().use(html).process(item.seo_body)).toString() : null
  return { ...item, bodyHtml, seoBodyHtml }
}

export function getAllCollectionItems(collection) {
  const slugs = getCollectionSlugs(collection)
  return slugs.map(slug => getCollectionItem(collection, slug)).filter(Boolean)
}

/**
 * Reads a category page from content/categories/{slug}.md
 * Converts the body (frontmatter `body` field OR markdown after the --- ) to HTML.
 * Returns all frontmatter fields plus { bodyHtml }.
 */
export async function getCategoryDataWithHtml(slug) {
  const filepath = path.join(process.cwd(), 'content', 'categories', `${slug}.md`)
  if (!fs.existsSync(filepath)) return null
  const raw = fs.readFileSync(filepath, 'utf8')
  const { data, content } = safeMatter(raw)
  // body may live in the frontmatter YAML (data.body) or after the closing --- (content)
  const bodySource = (data.body || '').trim() || content.trim()
  const bodyHtml = bodySource
    ? (await remark().use(html).process(bodySource)).toString()
    : null
  return { ...data, bodyHtml }
}
