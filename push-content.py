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
  python push-content.py templates/my-new-article.md
  python push-content.py templates/funbridge-2026-review.md

IMAGES:
  Place image files in the SAME folder as your .md file.
  The script auto-detects and uploads all images referenced in the file.

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
GITHUB_TOKEN  = "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"
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
    "articles": "content/articles",
    "reviews":  "content/reviews",
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
    """Determine if this is an article or review based on fields present."""
    if "rating" in frontmatter or "verdict" in frontmatter:
        return "reviews"
    return "articles"


def get_slug(frontmatter, filepath):
    """Get slug from frontmatter or derive from filename."""
    if frontmatter.get("slug"):
        return frontmatter["slug"]
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
        if val and val.startswith("/images/"):
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


def push_image(image_path_in_repo, local_dir, image_ref):
    """Upload an image file to GitHub if it exists locally."""
    # image_ref is like "/images/my-photo.jpg"
    filename = os.path.basename(image_ref)
    local_path = os.path.join(local_dir, filename)

    if not os.path.exists(local_path):
        print(f"  ⚠️  Image not found locally: {local_path} — skipping upload")
        return

    with open(local_path, "rb") as f:
        image_bytes = f.read()

    # Repo path for images: public/images/filename.jpg
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

    print(f"📂 Collection: {collection}")
    print(f"🔗 Slug:       {slug}")
    print(f"📁 Repo path:  {repo_content_path}")

    # ── Upload images ──────────────────────────────────────────────────────
    local_dir = os.path.dirname(os.path.abspath(filepath))
    image_refs = find_images_in_content(raw, frontmatter)

    if image_refs:
        print(f"\n🖼️  Found {len(image_refs)} image reference(s) — uploading...")
        for ref in image_refs:
            push_image("public/images", local_dir, ref)
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
        f"{action} {collection[:-1]}: {slug} [draft]",
        sha=sha,
    )

    print(f"\n✅ Done! '{slug}' pushed as DRAFT.")
    print(f"\n👉 Review it here:")
    print(f"   https://bridgeplaybook.com/admin/#/collections/{collection}")
    print(f"\n   Find '{frontmatter.get('title', slug)}' → change Status to 'published' → Save")
    print(f"   Netlify will build automatically. Live in ~60 seconds.\n")


if __name__ == "__main__":
    main()
