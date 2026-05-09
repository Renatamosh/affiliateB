---
name: bridge-playbook-writer
description: 'Write a fully SEO-optimized article for BridgePlaybook.com. Use when asked to write an article, new content, bridge article, or given a keyword to write about.'
version: "1.0.0"
license: private
compatibility: "Claude Code, Cowork"
when_to_use: "Use for any Bridge Playbook content creation request. Triggers: write an article, new article, bridge article, write about [keyword], I need content about, create a post about, what should we write about, topic suggestions."
argument-hint: "<topic or keyword>"
metadata:
  author: bridgeplaybook
  version: "1.0.0"
  tags:
    - bridge
    - seo
    - content-writing
    - affiliate
    - bridgeplaybook
  triggers:
    - "write an article"
    - "new article"
    - "bridge article"
    - "write about"
    - "I need content about"
    - "create a post about"
    - "what should we write about"
    - "topic suggestions"
---

# Bridge Playbook Article Writer

You are writing SEO content for **BridgePlaybook.com** — an affiliate site for the online bridge community. Read `references/site-context.md` immediately before doing anything else.

## Workflow — follow every step in order

### Step 1: Get the topic
If the user gave a keyword or topic, use it. If they asked for suggestions, propose 3 long-tail keyword ideas and wait for them to choose.

### Step 2: Research with SearchFit
Use the **`searchfit-seo:create-topic`** skill to research the keyword. Get:
- Search intent (what the reader actually wants)
- Competing content and how to differentiate
- Related questions and keywords
- Best content angle

### Step 3: Pick the category

| Category | Use for | Live URL |
|---|---|---|
| Guides | Overviews, comparisons, best-of lists | /guides/slug |
| Strategy | Bidding, card play, tactics | /strategy/slug |
| How-To | Step-by-step tutorials | /how-to/slug |
| Comparisons | Platform vs platform | /comparisons/slug |
| Articles | News, community, other | /articles/slug |

Reviews use a separate process — this skill handles article types only.

### Step 4: Write with SearchFit
Use the **`searchfit-seo:create-content`** skill. Pass:
- Primary keyword and content angle from Step 2
- Target length: 1,200–2,000 words for guides; 800–1,400 for how-to/strategy
- Audience: bridge players, roughly 55–70 years old

Then apply the Style Rules below before using the output.

### Step 5: Build the complete markdown file

Use this exact frontmatter. Do not skip any field.

```
---
title: "Full title here"
slug: url-slug-all-lowercase-hyphens
date: "YYYY-MM-DD"
status: draft
category: "Guides"
tags:
  - primary keyword
  - secondary keyword
featured_image: "/images/slug-descriptor.jpg"
featured_image_alt: "Descriptive alt text"
excerpt: "1-2 sentence summary. Under 160 characters. Include primary keyword."
key_takeaways:
  - "First key point"
  - "Second key point"
  - "Third key point"
faq:
  - question: "Question phrased as a real Google search?"
    answer: "Direct answer in 2-4 sentences."
  - question: "Second question?"
    answer: "Answer."
  - question: "Third question?"
    answer: "Answer."
affiliate_links:
  - label: "CTA label"
    url: "https://affiliate-url"
    nofollow: true
internal_links:
  - label: "Related article title"
    url: "/category/related-slug/"
meta_title: "Primary Keyword - Supporting phrase | Bridge Playbook"
meta_description: "Under 160 chars. Primary keyword. Clear reason to click."
og_title: ""
og_description: ""
og_image: ""
canonical: ""
entity_tags:
  - Bridge Base Online
  - online bridge
  - contract bridge
---

[Article body in markdown]
```

### Step 6: Add internal links
Include 2-4 internal links in the body AND in the `internal_links` field. See site-context.md for existing pages.

### Step 7: FAQ — minimum 4 questions
Write questions as real Google searches. Answers: 2-4 sentences, complete on their own. FAQs render as an accordion with JSON-LD schema — they matter for SEO.

### Step 8: Save to Google Drive
Save the complete file to Drive folder ID: **`1kaXFZSVMl7Inbu5yP0YZP13YguzP9L9E`**
Use the Google Drive connector `create_file` tool. Title = the slug.

### Step 9: Save locally
Save the identical file to:
`C:\Users\renat\Documents\affiliateB\templates\[slug].md`

### Step 10: Present for review
Tell Renata:
- The live URL it will have once published
- She needs a featured image named `[slug]-descriptor.jpg` dropped in the templates folder before pushing
- The exact push command:

```
cd "C:\Users\renat\Documents\affiliateB"
python push-content.py templates/[slug].md
```

- Remind her: it goes up as **draft**. She opens `/admin`, finds the article, changes status to published, saves. Live in ~60 seconds.

---

## Style Rules — apply to every article

**Audience:** Bridge players aged 55–70. Smart, experienced at the game, comfortable online. Write like a knowledgeable friend, not a marketing department.

**Tone:** Warm, direct, conversational. Confident without being salesy.

**Banned — never use these:**
- Em dashes (—) — use a comma, period, or rewrite the sentence
- "Let's delve into"
- "In today's digital landscape / fast-paced world"
- "Comprehensive guide" or "ultimate guide" in the body
- "It's worth noting that" / "It's important to understand"
- Hollow openers like "Bridge is a fascinating game that..."
- Heavy bullet-point structure — write in paragraphs

**Sentences:** Short to medium. Active voice. One idea per sentence.

**Numbers:** Be specific. "Three platforms" not "several platforms."

**Links in body:** Natural. "You can read our full [BBO review](/reviews/bridge-base-online-bbo-review/) for pricing details" — not "click here."

---

## Rewrites and user-written content

If Renata asks for changes before pushing: edit the template file and update the Drive doc. Nothing is live until she runs the push command and publishes in the CMS.

If she wrote her own article: ask her to paste it or point to the file. Format it into the template, add frontmatter, FAQ, schema fields, apply style rules, save via the same pipeline.
