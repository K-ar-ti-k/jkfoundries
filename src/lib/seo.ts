const STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "as",
  "at",
  "be",
  "by",
  "for",
  "from",
  "has",
  "he",
  "in",
  "is",
  "it",
  "its",
  "of",
  "on",
  "or",
  "that",
  "the",
  "their",
  "this",
  "to",
  "was",
  "were",
  "with",
  "about",
  "into",
  "your",
  "our",
  "you",
  "we",
  "what",
  "when",
  "why",
  "how",
  "can",
  "should",
  "will",
  "also",
  "more",
  "most",
  "than",
  "they",
  "them",
  "these",
  "those",
  "are",
  "after",
  "before",
  "between",
  "using",
  "used",
  "through",
  "over",
  "under",
  "up",
  "down",
  "out",
  "within",
  "without",
  "while",
  "such",
  "not",
  "no",
  "yes",
  "if",
  "then",
  "else",
  "there",
  "here",
  "have",
  "has",
  "had",
  "which",
  "where",
  "who",
  "do",
  "does",
  "did",
  "make",
  "makes",
  "made",
  "need",
  "needs",
  "needed",
]);

const normalizeWord = (token: string) =>
  token
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim();

const getTopTerms = (text: string, maxResults = 6) => {
  const counts = new Map<string, number>();
  const words = text
    .split(/\s+/)
    .map(normalizeWord)
    .filter(Boolean)
    .filter((word) => word.length > 2 && !STOP_WORDS.has(word));

  for (const word of words) {
    counts.set(word, (counts.get(word) || 0) + 1);
  }

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, maxResults)
    .map(([word]) => word);
};

const sentenceFromText = (text: string) => {
  const cleaned = text
    .replace(/\s+/g, " ")
    .replace(/[#*`_>\-]/g, " ")
    .trim();

  const match = cleaned.match(/.*?[.!?](?:\s|$)/);
  return (match ? match[0] : cleaned).trim();
};

export function buildBlogSeo(title: string, excerpt: string, content: string) {
  const titleText = title?.trim() || "";
  const excerptText = excerpt?.trim() || "";
  const contentText = content?.trim() || "";
  const fullText = `${titleText} ${excerptText} ${contentText}`;

  const topTerms = getTopTerms(fullText, 6);
  const primaryKeyword = topTerms[0] || titleText.split(/\s+/).filter(Boolean).slice(0, 3).join(" ");
  const secondaryKeywords = topTerms.slice(1, 5);

  const metaTitle = titleText
    ? titleText.length > 60
      ? `${titleText.slice(0, 57).trim()}...`
      : titleText
    : "JK Foundry Blog";

  const baseDescription = excerptText || sentenceFromText(contentText) || "Learn more about our foundry expertise and industrial casting solutions.";
  const metaDescription = baseDescription.length > 155 ? `${baseDescription.slice(0, 152).trim()}...` : baseDescription;

  return {
    primaryKeyword,
    secondaryKeywords,
    metaTitle,
    metaDescription,
  };
}
