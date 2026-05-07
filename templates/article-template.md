---
# ═══════════════════════════════════════════════════════════
# BRIDGE PLAYBOOK — ARTICLE TEMPLATE
# Fill every field. Leave nothing blank unless marked OPTIONAL.
# Status must stay "draft" — Claude will push this for review.
# ═══════════════════════════════════════════════════════════

title: "ARTICLE TITLE HERE"
slug: "url-slug-all-lowercase-with-hyphens"
date: "2026-05-07"
status: "draft"

# Category controls the URL and content folder — pick ONE:
#   Guides      -> bridgeplaybook.com/guides/slug       (content/guides/)
#   Strategy    -> bridgeplaybook.com/strategy/slug     (content/strategy/)
#   How-To      -> bridgeplaybook.com/how-to/slug       (content/how-to/)
#   Comparisons -> bridgeplaybook.com/comparisons/slug  (content/comparisons/)
#   (anything else -> bridgeplaybook.com/articles/slug)
category: "Guides"

# Tags: comma-separated bridge-related keywords
tags:
  - "online bridge"
  - "bridge strategy"
  - "ADD MORE"

# ── IMAGES ──────────────────────────────────────────────────
# Drop image filename here. Put the actual image file in the
# same folder as this .md file when you hand it to Claude.
featured_image: "/images/FILENAME.jpg"
featured_image_alt: "Describe the image clearly for SEO — e.g. 'Player bidding in an online bridge tournament on BBO'"

# ── EXCERPT ─────────────────────────────────────────────────
# 1–2 sentences. Shows on article cards and used as meta fallback.
excerpt: "Write a compelling 1–2 sentence summary of the article. Include the primary keyword naturally."

# ── KEY TAKEAWAYS ───────────────────────────────────────────
# 3–5 bullet points. Used for featured snippet targeting.
key_takeaways:
  - "First key point from the article"
  - "Second key point"
  - "Third key point"
  - "ADD MORE AS NEEDED"

# ── AFFILIATE LINKS ─────────────────────────────────────────
# OPTIONAL — add if the article promotes a platform
affiliate_links:
  - label: "Try BBO Free"
    url: "https://YOUR-AFFILIATE-LINK.com"
    nofollow: true

# ── INTERNAL LINKS ──────────────────────────────────────────
# Link to related articles/pages on BridgePlaybook.com
internal_links:
  - label: "BBO Review"
    url: "/reviews/bridge-base-online-bbo-review/"
  - label: "How to Play Bridge Online With Friends"
    url: "/how-to/how-to-play-bridge-online-with-friends/"

# ── SEO ─────────────────────────────────────────────────────
# meta_title: max 60 characters — include primary keyword
meta_title: "PRIMARY KEYWORD | Bridge Playbook"
# meta_description: max 160 characters — compelling, include keyword
meta_description: "Write a 150–160 character meta description that includes the primary keyword and a clear reason to click."
og_title: ""       # OPTIONAL — leave blank to use meta_title
og_description: "" # OPTIONAL — leave blank to use meta_description
og_image: ""       # OPTIONAL — leave blank to use featured_image
canonical: ""      # OPTIONAL — only fill if this page has a canonical elsewhere

# ── ENTITY TAGS (Semantic SEO) ───────────────────────────────
# Proper nouns, platforms, organizations Google should associate with this page
entity_tags:
  - "Bridge Base Online"
  - "ACBL"
  - "online bridge"
  - "ADD RELEVANT ENTITIES"

---

<!-- ═══════════════════════════════════════════════════════
     ARTICLE BODY — Write in Markdown below this line
     Use ## for H2 subheadings, ### for H3
     Include the primary keyword in the first 100 words
     Aim for 1,200–2,000 words for guides; 800–1,200 for news/features
     ═══════════════════════════════════════════════════════ -->

## Introduction (H2 — include primary keyword here)

Write the opening paragraph here. State clearly what the reader will learn. Include the primary keyword naturally within the first 100 words.

## [Second Section Heading] (H2)

Body text for this section. Each section should be 150–300 words.

You can add an image here with:
![Alt text describing the image](/images/FILENAME.jpg)

## [Third Section Heading] (H2)

Continue the article...

### [Optional Sub-section] (H3)

Use H3 for sub-points within an H2 section.

## [Fourth Section Heading] (H2)

...

## Conclusion (H2)

Summarise the key point. Include a call to action — link to a related article or affiliate platform.

---

<!-- ═══════════════════════════════════════════════════════
     FAQ SECTION — fill these out for FAQ schema markup
     3–6 questions. Use long-tail keywords as questions.
     ═══════════════════════════════════════════════════════ -->

faq:
  - question: "Question one — phrased exactly as someone would type it into Google?"
    answer: "Direct, complete answer in 2–4 sentences. Include the keyword naturally."
  - question: "Question two?"
    answer: "Answer two."
  - question: "Question three?"
    answer: "Answer three."
