export const dynamic = 'force-static';

import { getAllArticles } from '../lib/articles';
import { getAllReviews } from '../lib/reviews';

const BASE_URL = 'https://bridgeplaybook.com';

// Hard-coded static pages — add/remove entries here when you add/remove pages
const STATIC_PAGES = [
  { path: '/',                                       changeFrequency: 'weekly',  priority: 1.0  },
  { path: '/reviews/',                               changeFrequency: 'monthly', priority: 0.95 },
  { path: '/reviews/bridge-base-online-bbo-review/', changeFrequency: 'monthly', priority: 0.9  },
  { path: '/reviews/funbridge-review/',              changeFrequency: 'monthly', priority: 0.9  },
  { path: '/reviews/realbridge-review/',             changeFrequency: 'monthly', priority: 0.9  },
  { path: '/compare/bbo-vs-funbridge-2026/',         changeFrequency: 'monthly', priority: 0.9  },
  { path: '/compare/trickster-vs-realbridge/',       changeFrequency: 'monthly', priority: 0.9  },
  { path: '/how-to-play-bridge-online/',             changeFrequency: 'monthly', priority: 0.9  },
  { path: '/platforms/',                             changeFrequency: 'monthly', priority: 0.85 },
  { path: '/platforms/bridge-base-online/',          changeFrequency: 'monthly', priority: 0.85 },
  { path: '/platforms/funbridge/',                   changeFrequency: 'monthly', priority: 0.85 },
  { path: '/platforms/realbridge/',                  changeFrequency: 'monthly', priority: 0.85 },
  { path: '/bidding-basics/',                        changeFrequency: 'monthly', priority: 0.85 },
  { path: '/glossary/',                              changeFrequency: 'monthly', priority: 0.85 },
  { path: '/card-play-strategy/',                    changeFrequency: 'monthly', priority: 0.8  },
  { path: '/how-to-play/',                           changeFrequency: 'monthly', priority: 0.8  },
  { path: '/rules/',                                 changeFrequency: 'monthly', priority: 0.7  },
  { path: '/practice-boards/',                       changeFrequency: 'monthly', priority: 0.7  },
  { path: '/bidding-quiz/',                          changeFrequency: 'monthly', priority: 0.7  },
  { path: '/articles/',                              changeFrequency: 'weekly',  priority: 0.7  },
  { path: '/community/',                             changeFrequency: 'weekly',  priority: 0.6  },
  { path: '/about/',                                 changeFrequency: 'monthly', priority: 0.5  },
  { path: '/contact/',                               changeFrequency: 'yearly',  priority: 0.4  },
];

export default function sitemap() {
  const now = new Date();

  // 1. Static JSX pages
  const staticEntries = STATIC_PAGES.map(p => ({
    url: `${BASE_URL}${p.path}`,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));

  // 2. Published markdown articles in content/{category}/*.md
  //    URL pattern: /{category}/{slug}/
  const articles = getAllArticles();
  const articleEntries = articles.map(article => ({
    url: `${BASE_URL}/${article.categorySlug}/${article.slug}/`,
    lastModified: article.date ? new Date(article.date) : now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // 3. Published markdown reviews in content/reviews/*.md
  //    URL pattern: /reviews/{slug}/
  const reviews = getAllReviews();
  const reviewEntries = reviews.map(review => ({
    url: `${BASE_URL}/reviews/${review.slug}/`,
    lastModified: review.date ? new Date(review.date) : now,
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  // Deduplicate by URL — static pages win (first seen wins)
  const seen = new Set();
  return [...staticEntries, ...articleEntries, ...reviewEntries].filter(entry => {
    if (seen.has(entry.url)) return false;
    seen.add(entry.url);
    return true;
  });
}
