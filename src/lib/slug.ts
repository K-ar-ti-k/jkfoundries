const stopWords = new Set([
  "a",
  "an",
  "and",
  "for",
  "from",
  "how",
  "in",
  "of",
  "on",
  "or",
  "the",
  "to",
  "with",
]);

export function createShortSlug(title: string): string {
  const words = title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/[\s-]+/)
    .filter(Boolean);

  const meaningfulWords = words.filter(
    (word, index) => index === 0 || !stopWords.has(word),
  );
  const selectedWords = (meaningfulWords.length ? meaningfulWords : words).slice(0, 6);
  let slug = selectedWords.join("-");

  while (slug.length > 60 && selectedWords.length > 1) {
    selectedWords.pop();
    slug = selectedWords.join("-");
  }

  return slug;
}
