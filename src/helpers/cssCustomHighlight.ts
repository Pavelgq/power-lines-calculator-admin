/** Имена регистра CSS.highlights — снимаются при размонтировании таблицы. */
export const CLIENT_TABLE_HIGHLIGHT_NAME = "powerlines-client-table-search";
export const REQUESTS_TABLE_HIGHLIGHT_NAME = "powerlines-requests-table-search";

export function isCustomHighlightSupported(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof CSS !== "undefined" &&
    "highlights" in CSS &&
    (CSS as { highlights?: unknown }).highlights != null &&
    typeof (globalThis as { Highlight?: unknown }).Highlight === "function"
  );
}

export function clearTableSearchHighlights(name = CLIENT_TABLE_HIGHLIGHT_NAME): void {
  if (!isCustomHighlightSupported()) return;
  try {
    (
      CSS as unknown as { highlights: { delete: (n: string) => void } }
    ).highlights.delete(name);
  } catch {
    // игнорируем в средах без полной поддержки
  }
}

function collectRangesInHost(host: Element, queryLower: string): Range[] {
  const ranges: Range[] = [];
  const qLen = queryLower.length;
  if (qLen === 0) return ranges;

  const walker = document.createTreeWalker(host, NodeFilter.SHOW_TEXT);
  let node = walker.nextNode() as Text | null;
  while (node) {
    const text = node.textContent ?? "";
    const lower = text.toLowerCase();
    let from = 0;
    let idx = lower.indexOf(queryLower, from);
    while (idx !== -1) {
      const r = document.createRange();
      r.setStart(node, idx);
      r.setEnd(node, idx + qLen);
      ranges.push(r);
      from = idx + qLen;
      idx = lower.indexOf(queryLower, from);
    }
    node = walker.nextNode() as Text | null;
  }
  return ranges;
}

/**
 * Находит все совпадения query (без учёта регистра) в узлах с [data-search-highlight] под root.
 */
export function collectTableSearchHighlightRanges(
  root: HTMLElement,
  query: string
): Range[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const hosts = root.querySelectorAll("[data-search-highlight]");
  const ranges: Range[] = [];
  hosts.forEach((host) => {
    ranges.push(...collectRangesInHost(host, q));
  });
  return ranges;
}

export function applyTableSearchHighlights(
  root: HTMLElement | null,
  query: string,
  name = CLIENT_TABLE_HIGHLIGHT_NAME
): void {
  clearTableSearchHighlights(name);
  if (!root || !isCustomHighlightSupported()) return;
  const q = query.trim();
  if (!q) return;
  const ranges = collectTableSearchHighlightRanges(root, q);
  if (ranges.length === 0) return;
  const HighlightCtor = (
    globalThis as unknown as { Highlight: new (...r: Range[]) => unknown }
  ).Highlight;
  const highlight = new HighlightCtor(...ranges) as unknown;
  (
    CSS as unknown as {
      highlights: { set: (n: string, h: unknown) => void };
    }
  ).highlights.set(name, highlight);
}
