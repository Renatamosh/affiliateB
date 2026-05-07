#!/usr/bin/env python3
"""
Bridge Playbook — Content Push Script
======================================
Reads a filled-in markdown template and pushes it (plus any images)
to the GitHub repo as a DRAFT. The content appears in your Netlify CMS
admin at https://bridgeplaybook.com/admin/ ready for review.

USAGE:
  python push-content.py <path-to-content-file.md>

EXAMPLES:
  python push-content.py templates/my-new-guide.md
  python push-content.py templates/funbridge-2026-review.md

IMAGES:
  Place image files in the SAME folder as your .md file.
  The script auto-detects and uploads all images referenced in the file.

CONTENT FOLDERS → LIVE URLs:
  content/guides/       → bridgeplaybook.com/guides/slug
  content/strategy/     → bridgeplaybook.com/strategy/slug
  content/how-to/       → bridgeplaybook.com/how-to/slug
  content/comparisons/  → bridgeplaybook.com/comparisons/slug
  content/articles/     → bridgeplaybook.com/articles/slug  (misc/legacy)
  content/reviews/      → bridgeplaybook.com/reviews/slug

  The script reads the `category` field in your frontmatter and routes
  to the correct folder automatically. Reviews are detected by the
  presence of a `rating` or `verdict` field.

REQUIREMENTS:
  pip install requests PyYAML
"""

import sys
import os
import re
import base64
import json
import time
import requests
import yaml

# ── CONFIG ────────────────────────────────────────────────────────────────────
# Token is stored in .env (never committed to GitHub)
# If you need to update your token, edit .env in the project folder.
def _load_token():
    env_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '.env')
    if os.path.exists(env_path):
        with open(env_path, 'r') as f:
            for line in f:
                line = line.strip()
                if line.startswith('GITHUB_TOKEN='):
                    return line.split('=', 1)[1].strip().strip('"').strip("'")
    token = os.environ.get('GITHUB_TOKEN', '')
    if not token:
        print("\n❌  No GitHub token found.")
        print("    Create a file called .env in the project folder with this line:")
        print("    GITHUB_TOKEN=your_token_here\n")
        sys.exit(1)
    return token

GITHUB_TOKEN  = _load_token()
GITHUB_OWNER  = "Renatamosh"
GITHUB_REPO   = "affiliateB"
GITHUB_BRANCH = "main"
GITHUB_API    = "https://api.github.com"
# ─────────────────────────────────────────────────────────────────────────────

HEADERS = {
    "Authorization": f"token {GITHUB_TOKEN}",
    "Accept": "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
}

# Where each collection's files live in the repo
COLLECTION_PATHS = {
    "guides":      "content/guides",
    "strategy":    "content/strategy",
    "how-to":      "content/how-to",
    "comparisons": "content/comparisons",
    "articles":    "content/articles",   # misc / legacy
    "reviews":     "content/reviews",
}

# Maps the `category` frontmatter value (lowercase) to a collection key
CATEGORY_TO_COLLECTION = {
    "guides":      "guides",
    "guide":       "guides",
    "strategy":    "strategy",
    "how-to":      "how-to",
    "how to":      "how-to",
    "howto":       "how-to",
    "comparisons": "comparisons",
    "comparison":  "comparisons",
    "compare":     "comparisons",
    # anything else falls back to "articles"
}


def read_local_file(path):
    with open(path, "r", encoding="utf-8") as f:
        return f.read()


def parse_frontmatter(content):
    """Extract YAML frontmatter and body from a markdown file."""
    match = re.match(r"^---\n(.*?)\n---\n?(.*)", content, re.DOTALL)
    if not match:
        raise ValueError("No frontmatter found. Make sure the file starts with ---")
    fm = yaml.safe_load(match.group(1))
    body = match.group(2).strip()
    return fm, body


def detect_collection(frontmatter, filepath):
    """
    Determine the target collection (= content folder) for this file.

    Priority:
      1. Reviews  — detected by the presence of `rating` or `verdict` fields
      2. Category — read from the `category` frontmatter field and mapped to a folder
      3. Fallback — "articles" (misc bucket)
    """
    # Reviews always go to content/reviews/
    if "rating" in frontmatter or "verdict" in frontmatter:
        return "reviews"

    raw_category = str(frontmatter.get("category", "")).strip().lower()
    collection = CATEGORY_TO_COLLECTION.get(raw_category, "articles")
    return collection


def get_slug(frontmatter, filepath):
    """Get slug from frontmatter or derive from filename."""
    if frontmatter.get("slug"):
        return str(frontmatter["slug"]).strip()
    return os.path.splitext(os.path.basename(filepath))[0]


def find_images_in_content(content, frontmatter):
    """Find all image paths referenced in the file."""
    images = set()
    # Images in markdown body: ![alt](/images/file.jpg)
    for match in re.findall(r"!\[.*?\]\((/images/[^\)]+)\)", content):
        images.add(match)
    # Images in frontmatter fields
    for key in ["featured_image", "platform_logo", "og_image"]:
        val = frontmatter.get(key, "")
        if val and str(val).startswith("/images/"):
            images.add(val)
    # Screenshots list
    for screenshot in frontmatter.get("screenshots", []):
        img = screenshot.get("image", "")
        if img and img.startswith("/images/"):
            images.add(img)
    return list(images)


def github_get_file(repo_path):
    """Get existing file SHA from GitHub (needed for updates)."""
    url = f"{GITHUB_API}/repos/{GITHUB_OWNER}/{GITHUB_REPO}/contents/{repo_path}"
    r = requests.get(url, headers=HEADERS)
    if r.status_code == 200:
        return r.json().get("sha")
    return None


def github_push_file(repo_path, content_bytes, message, sha=None):
    """Create or update a file in GitHub."""
    url = f"{GITHUB_API}/repos/{GITHUB_OWNER}/{GITHUB_REPO}/contents/{repo_path}"
    payload = {
        "message": message,
        "content": base64.b64encode(content_bytes).decode("utf-8"),
        "branch": GITHUB_BRANCH,
    }
    if sha:
        payload["sha"] = sha
    r = requests.put(url, headers=HEADERS, json=payload)
    if r.status_code not in (200, 201):
        raise RuntimeError(f"GitHub push failed for {repo_path}: {r.status_code} {r.text}")
    return r.json()


def github_delete_file(repo_path, sha, message):
    """Delete a file from GitHub."""
    url = f"{GITHUB_API}/repos/{GITHUB_OWNER}/{GITHUB_REPO}/contents/{repo_path}"
    payload = {
        "message": message,
        "sha": sha,
        "branch": GITHUB_BRANCH,
    }
    r = requests.delete(url, headers=HEADERS, json=payload)
    if r.status_code not in (200, 204):
        raise RuntimeError(f"GitHub delete failed for {repo_path}: {r.status_code} {r.text}")


def push_image(local_dir, image_ref):
    """Upload an image file to GitHub if it exists locally."""
    filename = os.path.basename(image_ref)
    local_path = os.path.join(local_dir, filename)

    if not os.path.exists(local_path):
        print(f"  ⚠️  Image not found locally: {local_path} — skipping upload")
        return

    with open(local_path, "rb") as f:
        image_bytes = f.read()

    repo_image_path = f"public/images/{filename}"
    sha = github_get_file(repo_image_path)
    action = "Update" if sha else "Add"
    github_push_file(
        repo_image_path,
        image_bytes,
        f"{action} image: {filename}",
        sha=sha,
    )
    print(f"  ✅ Image uploaded: {repo_image_path}")
    time.sleep(0.5)  # Avoid rate limiting


def rebuild_frontmatter(frontmatter):
    """Serialise frontmatter back to YAML string.

    Dates are explicitly converted to strings before dumping so that
    gray-matter (and PyYAML) never write bare YYYY-MM-DD values that
    YAML parsers auto-convert to Date objects — which breaks Next.js
    static prerendering.
    """
    import datetime
    safe = {}
    for k, v in frontmatter.items():
        if isinstance(v, (datetime.date, datetime.datetime)):
            safe[k] = v.strftime("%Y-%m-%d")
        else:
            safe[k] = v
    return yaml.dump(safe, allow_unicode=True, sort_keys=False, default_flow_style=False)


def migrate_if_needed(slug, collection):
    """
    If the same slug exists under content/articles/ but now belongs to
    a different collection, delete the old file so there's no duplicate.
    Only runs when the target collection is NOT 'articles'.
    """
    if collection == "articles":
        return
    old_path = f"content/articles/{slug}.md"
    old_sha = github_get_file(old_path)
    if old_sha:
        print(f"  🔄 Found old file at {old_path} — removing it to avoid duplicate...")
        github_delete_file(old_path, old_sha, f"Remove duplicate: move {slug} to {collection}")
        print(f"  ✅ Old file removed: {old_path}")
        time.sleep(0.5)


def main():
    if len(sys.argv) < 2:
        print("Usage: python push-content.py <path-to-content-file.md>")
        sys.exit(1)

    filepath = sys.argv[1]
    if not os.path.exists(filepath):
        print(f"File not found: {filepath}")
        sys.exit(1)

    print(f"\n📄 Reading: {filepath}")
    raw = read_local_file(filepath)
    frontmatter, body = parse_frontmatter(raw)

    # Force status to draft for safety
    frontmatter["status"] = "draft"

    collection = detect_collection(frontmatter, filepath)
    slug = get_slug(frontmatter, filepath)
    repo_content_path = f"{COLLECTION_PATHS[collection]}/{slug}.md"

    print(f"📂 Collection: {collection}  →  content/{collection}/")
    print(f"🔗 Slug:       {slug}")
    print(f"📁 Repo path:  {repo_content_path}")
    print(f"🌐 Live URL:   https://bridgeplaybook.com/{collection}/{slug}/")

    # ── Auto-migrate if slug existed in content/articles/ previously ─────────
    migrate_if_needed(slug, collection)

    # ── Upload images ──────────────────────────────────────────────────────
    local_dir = os.path.dirname(os.path.abspath(filepath))
    image_refs = find_images_in_content(raw, frontmatter)

    if image_refs:
        print(f"\n🖼️  Found {len(image_refs)} image reference(s) — uploading...")
        for ref in image_refs:
            push_image(local_dir, ref)
    else:
        print("  ℹ️  No images referenced in this file.")

    # ── Build final markdown ───────────────────────────────────────────────
    final_content = f"---\n{rebuild_frontmatter(frontmatter)}---\n\n{body}\n"

    # ── Push content file ──────────────────────────────────────────────────
    print(f"\n🚀 Pushing content to GitHub...")
    sha = github_get_file(repo_content_path)
    action = "Update" if sha else "Add"

    github_push_file(
        repo_content_path,
        final_content.encode("utf-8"),
        f"{action} {collection[:-1] if collection.endswith('s') else collection}: {slug} [draft]",
        sha=sha,
    )

    print(f"\n✅ Done! '{slug}' pushed as DRAFT.")
    print(f"\n👉 Review it in the CMS:")
    print(f"   https://bridgeplaybook.com/admin/#/collections/{collection}")
    print(f"\n   Find '{frontmatter.get('title', slug)}' → change Status to 'published' → Save")
    print(f"   Netlify will build automatically. Live in ~60 seconds.")
    print(f"   Live URL: https://bridgeplaybook.com/{collection}/{slug}/\n")


if __name__ == "__main__":
    main()
