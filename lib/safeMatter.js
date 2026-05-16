/**
 * safeMatter — a wrapper around gray-matter that silently deduplicates
 * top-level YAML frontmatter keys before parsing.
 *
 * Why: Netlify CMS / Decap CMS occasionally appends a second `category`
 * (or other field) at the end of the frontmatter block, especially when a
 * file has been through a git merge conflict. js-yaml (used by gray-matter)
 * throws a YAMLException on duplicate mapping keys, which crashes the build.
 *
 * This module fixes the raw string before gray-matter ever sees it, so the
 * build is resilient regardless of which key is duplicated.
 */

import matter from 'gray-matter';

/**
 * Splits the YAML block into per-top-level-key "blocks", then filters out
 * any block whose key has already been seen (first occurrence wins).
 *
 * Top-level keys are identified as lines that start at column 0 with a
 * word character followed by a colon, e.g. `title:` or `meta_description:`.
 * Indented lines (list items, multi-line values) are treated as continuations
 * of the preceding top-level key block.
 */
function dedupeFrontmatter(raw) {
  // Match the opening ---, the YAML body, and the closing ---
  const fmRegex = /^(---[ \t]*\r?\n)([\s\S]*?)(\r?\n---[ \t]*(?:\r?\n|$))/;
  const match = raw.match(fmRegex);
  if (!match) return raw; // no frontmatter — nothing to do

  const [fullMatch, open, yaml, close] = match;
  const rest = raw.slice(fullMatch.length);

  // Group lines into blocks, where each block belongs to one top-level key.
  const lines = yaml.split('\n');
  const blocks = []; // Array of { key: string|null, lines: string[] }
  let current = null;

  for (const line of lines) {
    const topKeyMatch = line.match(/^([a-zA-Z_][a-zA-Z0-9_-]*)\s*:/);
    if (topKeyMatch) {
      if (current) blocks.push(current);
      current = { key: topKeyMatch[1], lines: [line] };
    } else {
      if (current) {
        current.lines.push(line);
      } else {
        // Lines before any key (shouldn't normally happen)
        blocks.push({ key: null, lines: [line] });
      }
    }
  }
  if (current) blocks.push(current);

  // Keep only the first occurrence of each key.
  const seen = new Set();
  const kept = blocks.filter(b => {
    if (b.key === null) return true;
    if (seen.has(b.key)) return false;
    seen.add(b.key);
    return true;
  });

  const deduped = kept.map(b => b.lines.join('\n')).join('\n');
  return open + deduped + close + rest;
}

/**
 * Drop-in replacement for `matter(raw)`.
 * Behaves identically to gray-matter for valid files.
 * For files with duplicate frontmatter keys, it deduplicates and retries.
 */
export default function safeMatter(raw) {
  try {
    return matter(raw);
  } catch (e) {
    if (e.name === 'YAMLException' && e.message && e.message.includes('duplicated mapping key')) {
      return matter(dedupeFrontmatter(raw));
    }
    throw e;
  }
}
