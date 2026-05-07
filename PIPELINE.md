# Bridge Playbook — Content Pipeline
## From idea to live on site, end to end

---

## THE FULL FUNNEL AT A GLANCE

```
STEP 1: Decide topic (keyword research with Claude)
         ↓
STEP 2: Fill in the Google Doc template
         ↓
STEP 3: Source or create images
         ↓
STEP 4: Hand to Claude → she formats + pushes to GitHub
         ↓
STEP 5: You review in Netlify CMS admin (bridgeplaybook.com/admin)
         ↓
STEP 6: Change status "draft" → "published" → Save
         ↓
STEP 7: Netlify auto-builds → LIVE in ~60 seconds ✅
```

---

## STEP 1 — DECIDING WHAT TO WRITE

**Who does this:** You + Claude

Ask Claude: *"Give me 10 long-tail keyword ideas for the bridge affiliate site around [topic]"*

Claude will use keyword research to find terms with:
- Low competition (so you can rank fast)
- Clear search intent (someone looking for a platform or guide)
- Good for affiliate conversion

**Decide: Article or Review?**

| Type | When to use | Example |
|------|------------|---------|
| **Article** | Guides, strategy, how-tos, comparisons, news | "How to find a bridge partner online", "Best bidding systems for beginners" |
| **Review** | Platform-specific deep dives | "Funbridge Review 2026", "RealBridge Review" |

---

## STEP 2 — FILL IN THE GOOGLE DOC TEMPLATE

**Templates are in your repo at:**
- `templates/article-template.md` → for guides, comparisons, strategy
- `templates/review-template.md` → for platform reviews

**How to use them with Google Docs:**
1. Open the template file
2. Copy all the content
3. Paste into a new Google Doc
4. Fill in every field (the comments in `<!-- ... -->` tell you what to write)
5. Share the Google Doc link with Claude OR download it as .md / .txt

**Key fields you must fill:**
- `title` — the H1 of the page
- `slug` — the URL (e.g. `best-online-bridge-platforms-2026`)
- `date` — today's date
- `category` — pick from the list
- `excerpt` — 1–2 sentence summary (shows on the article card)
- `meta_title` — max 60 chars, include primary keyword
- `meta_description` — max 160 chars, include keyword + reason to click
- `key_takeaways` — 3–5 bullet points (targets featured snippets)
- `faq` — 4–6 questions in long-tail keyword format
- The article **body** — your full content in Markdown

**Status must always be "draft"** — Claude will push it as draft. You publish it.

---

## STEP 3 — IMAGES

You need at minimum:
- 1 **featured image** (shows at top of article + OG share image)
- 1–3 **body images** (screenshots, diagrams, etc.)

**For reviews:** also a platform logo PNG.

### Where to get images

**Option A — Free stock (for articles):**
- [Unsplash](https://unsplash.com) — search "bridge card game", "playing cards", "card table"
- [Pexels](https://pexels.com)
- Download at highest resolution

**Option B — Screenshots (for reviews):**
- Take screenshots directly from the platform (BBO, Funbridge, RealBridge)
- Crop to show the most relevant UI
- Name them clearly: `funbridge-lobby-2026.jpg`

**Option C — AI-generated (ask Claude):**
- Claude can generate images via Adobe Creative (once connected)
- Just describe what you want: *"Generate a featured image for an article about online bridge bidding strategies — clean, editorial style"*

### Naming convention
Always name images with the slug + descriptor:
```
funbridge-review-2026-featured.jpg
funbridge-lobby-screenshot.jpg
bbo-vs-funbridge-comparison-chart.jpg
```

### Where to put images
Put the image files in the **same folder as your .md template file**.
The push script will auto-upload them to `/public/images/` in the repo.

### Image sizes
- Featured image: **1200×630px** (also used as OG image for social sharing)
- Body images: **800–1200px wide**, any height
- Platform logos: **400×400px**, PNG with transparent background if possible

### SEO on images — CRITICAL
Every image needs an `alt` text in the template. Write it like a sentence describing the image AND include a keyword:
```
featured_image_alt: "Funbridge app interface showing AI opponent bidding — best bridge app for solo practice 2026"
```

---

## STEP 4 — HAND TO CLAUDE

Once your template is filled and images are ready, give Claude:
1. The filled `.md` file (or the Google Doc link — she'll read it from Drive)
2. The image files (named correctly)

Claude will:
- Validate the frontmatter is correct
- Ensure SEO fields are filled and within character limits
- Check the body for keyword density and internal links
- Run the push script → content goes to GitHub as a draft
- Confirm with the exact URL to find it in your CMS admin

---

## STEP 5 — REVIEW IN NETLIFY CMS

Go to: **https://bridgeplaybook.com/admin/**

- Click **Articles** or **Platform Reviews** in the left menu
- Find your new draft (it'll be at the top, marked "draft")
- Read through everything in the visual editor
- Make any edits you want directly in the CMS
- Check the featured image looks right

---

## STEP 6 — PUBLISH

In the CMS editor:
1. Find the **Status** field (dropdown)
2. Change from `draft` → `published`
3. Click **Save** (top right)

That's it. This commits the change to GitHub.

---

## STEP 7 — GOES LIVE

Netlify detects the GitHub commit and rebuilds the site automatically.
**Build time: ~45–90 seconds.**

Watch it here: [Netlify deploys dashboard](https://app.netlify.com) → your site → Deploys tab.

The article is now live at:
- `https://bridgeplaybook.com/articles/YOUR-SLUG/` (for articles)
- `https://bridgeplaybook.com/reviews/YOUR-SLUG/` (for reviews)

---

## SEO CHECKLIST — before you publish

Run through this before changing status to published:

- [ ] `meta_title` is under 60 characters and contains the primary keyword
- [ ] `meta_description` is under 160 characters and has a clear click reason
- [ ] `featured_image_alt` describes the image AND includes a keyword
- [ ] `key_takeaways` has 3–5 clear bullet points
- [ ] `faq` has 4–6 questions phrased as real search queries
- [ ] `entity_tags` includes all relevant platforms, organizations, and concepts
- [ ] `internal_links` links to at least 2 other pages on BridgePlaybook.com
- [ ] Body has the primary keyword in the first 100 words
- [ ] Body has the keyword in at least one H2 heading
- [ ] Article is 1,200+ words (guides) or 800+ words (news/features)
- [ ] At least one affiliate link is included (if relevant)

---

## HOW TO RUN THE PUSH SCRIPT MANUALLY

If you ever want to push a file yourself (or Claude is unavailable):

**Install dependencies (one time only):**
```bash
pip install requests PyYAML
```

**Push a file:**
```bash
python push-content.py templates/my-article.md
```

The script will:
1. Read the .md file
2. Force status = draft
3. Upload any images to `public/images/`
4. Push the markdown to `content/articles/` or `content/reviews/`
5. Print the link to find it in your CMS

---

## CONTENT TYPES & THEIR GOALS

| Type | Goal | Avg length | Update frequency |
|------|------|-----------|-----------------|
| Platform Review | Affiliate conversion | 1,500–2,500w | Every 3–6 months |
| Comparison Article | Catch "X vs Y" searches | 1,200–2,000w | Every 6 months |
| How-to Guide | Top of funnel, build trust | 1,200–2,000w | Evergreen |
| Strategy/Tips | Bridge community traffic | 800–1,500w | Evergreen |
| News/Updates | Fresh content signal | 400–800w | As news happens |

---

## QUICK REFERENCE — TEMPLATE FIELDS

### Articles (`content/articles/`)
| Field | Required | Notes |
|-------|----------|-------|
| title | ✅ | H1 of page |
| slug | ✅ | URL path, lowercase, hyphens |
| date | ✅ | YYYY-MM-DD |
| status | ✅ | Always "draft" until you publish |
| category | ✅ | Features / Reviews / Guides / News / Strategy / Community |
| tags | Optional | 3–6 keywords |
| featured_image | Recommended | 1200×630px |
| featured_image_alt | If image used | Include keyword |
| excerpt | ✅ | 1–2 sentences, shown on article cards |
| key_takeaways | ✅ | 3–5 bullets, snippet bait |
| faq | ✅ | 4–6 Q&As, long-tail keyword questions |
| affiliate_links | If relevant | Use your affiliate URLs |
| internal_links | ✅ | 2+ links to other BridgePlaybook pages |
| meta_title | ✅ | Max 60 chars |
| meta_description | ✅ | Max 160 chars |
| entity_tags | ✅ | Platforms, orgs, concepts |

### Reviews (`content/reviews/`)
All of the above, PLUS:
| Field | Required | Notes |
|-------|----------|-------|
| rating | ✅ | 1–5 in 0.5 steps |
| best_for | ✅ | One-liner, e.g. "Solo AI training" |
| acbl_masterpoints | ✅ | true or false |
| free_trial | ✅ | true or false |
| last_verified | ✅ | Month + Year |
| pricing | ✅ | List of plan objects |
| pros | ✅ | 3–6 bullet pros |
| cons | ✅ | 2–4 bullet cons |
| screenshots | Recommended | 2–4 screenshots |
| cta_label | ✅ | Button text, e.g. "Try Funbridge Free" |
| cta_url | ✅ | Your affiliate link |
| verdict | ✅ | 2–3 sentence editor summary |
| platform_logo | Recommended | 400×400px PNG |
