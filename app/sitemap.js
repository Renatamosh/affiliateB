export const dynamic = 'force-static';

import fs from 'fs';
import path from 'path';
import { getAllArticles } from '../lib/articles';

const BASE_URL = 'https://bridgeplaybook.com';

// ─── Static structural pages ──────────────────────────────────────────────────
// These pages are hardcoded in the app — update this list when you add/remove pages.
const STATIC_PAGES = [
  { path: '/',                                       changeFrequency: 'weekly',  priority: 1.0  },
  { path: '/reviews/',                               changeFrequency: 'monthly', priority: 0.95 },
  { path: '/how-to-play-bridge-online/',             changeFrequency: 'monthly', priority: 0.9  },
  { path: '/compare/bbo-vs-funbridge-2026/',         changeFrequency: 'monthly', priority: 0.9  },
  { path: '/bidding-basics/',                        changeFrequency: 'monthly', priority: 0.85 },
  { path: '/glossary/',                              changeFrequency: 'monthly', priority: 0.85 },
  { path: '/card-play-strategy/',                    changeFrequency: 'monthly', priority: 0.8  },
  { path: '/rules/',                                 changeFrequency: 'monthly', priority: 0.7  },
  { path: '/practice-boards/',                       changeFrequency: 'monthly', priority: 0.7  },
  { path: '/bidding-quiz/',                          changeFrequency: 'monthly', priority: 0.7  },
  { path: '/articles/',                              changeFrequency: 'weekly',  priority: 0.7  },
  { path: '/community/',                             changeFrequency: 'weekly',  priority: 0.6  },
  { path: '/about/',                                 changeFrequency: 'monthly', priority: 0.5  },
];

export default function sitemap() {
  const now = new Date();

  // 1. Static structural pages
  const staticEntries = STATIC_PAGES.map(p => ({
    url: `${BASE_URL}${p.path}`,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));

  // 2. Platform review pages — read dynamically from content/platforms/*.json
  //    Adds a sitemap entry for each JSON file that exists.
  const platformsDir = path.join(process.cwd(), 'content', 'platforms');
  const platformSlugMap = {
    'bbo.json':        '/reviews/bridge-base-online-bbo-review/',
    'funbridge.json':  '/reviews/funbridge-review/',
    'realbridge.json': '/reviews/realbridge-review/',
  };
  const reviewEntries = [];
  if (fs.existsSync(platformsDir)) {
    for (const [filename, urlPath] of Object.entries(platformSlugMap)) {
      const filePath = path.join(platformsDir, filename);
      if (fs.existsSync(filePath)) {
        reviewEntries.push({
          url: `${BASE_URL}${urlPath}`,
          lastModified: now,
          changeFrequency: 'monthly',
          priority: 0.9,
        });
      }
    }
  }

  // 3. CMS-managed articles from content/{category}/*.md
  //    Only published articles are included (getAllArticles filters by status).
  const articles = getAllArticles();
  const articleEntries = articles.map(article => ({
    url: `${BASE_URL}/${article.categorySlug}/${article.slug}/`,
    lastModified: article.date ? new Date(article.date) : now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // 4. Deduplicate by URL — first seen wins (static pages take priority).
  const seen = new Set();
  return [...staticEntries, ...reviewEntries, ...articleEntries].filter(entry => {
    if (seen.has(entry.url)) return false;
    seen.add(entry.url);
    return true;
  });
}
