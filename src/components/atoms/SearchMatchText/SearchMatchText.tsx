import React, { useMemo } from "react";
import { isCustomHighlightSupported } from "../../../helpers/cssCustomHighlight";
import { TABLE_EMPTY_VALUE } from "../../../helpers/tableDisplay";

import styles from "./SearchMatchText.module.css";

function renderMarkFallback(display: string, query: string): React.ReactNode {
  if (display === TABLE_EMPTY_VALUE) {
    return display;
  }
  const q = query.trim();
  if (!q) return display;
  const lower = display.toLowerCase();
  const ql = q.toLowerCase();
  const parts: React.ReactNode[] = [];
  let i = 0;
  let key = 0;
  const matchLen = q.length;
  while (i < display.length) {
    const idx = lower.indexOf(ql, i);
    if (idx === -1) {
      parts.push(display.slice(i));
      break;
    }
    if (idx > i) parts.push(display.slice(i, idx));
    parts.push(
      <mark key={`hl-${key}`} className={styles.fallbackMark}>
        {display.slice(idx, idx + matchLen)}
      </mark>
    );
    key += 1;
    i = idx + matchLen;
  }
  if (parts.length === 0) {
    return display;
  }
  if (parts.length === 1) {
    return parts[0];
  }
  return <span className={styles.fallbackGroup}>{parts}</span>;
}

export interface SearchMatchTextProps {
  text: string;
  query: string;
  /** Как в таблице (например firstUpperChar); по умолчанию без изменений. */
  format?: (raw: string) => string;
  className?: string;
}

/**
 * При поддержке CSS.highlights — только текст в span с data-search-highlight (подсветка из useTableSearchHighlights).
 * Иначе — <mark> по совпадениям (без учёта регистра, как в useSortableData).
 */
export function SearchMatchText({
  text,
  query,
  format = (t) => t,
  className,
}: SearchMatchTextProps): JSX.Element {
  const supported = useMemo(() => isCustomHighlightSupported(), []);
  const display = format(text ?? "");

  if (display === TABLE_EMPTY_VALUE) {
    return (
      <span className={className} data-search-exclude>
        {TABLE_EMPTY_VALUE}
      </span>
    );
  }

  if (!supported) {
    return (
      <span className={className}>{renderMarkFallback(display, query)}</span>
    );
  }

  return (
    <span
      data-search-highlight
      className={className ?? styles.highlightAnchor}
    >
      {display}
    </span>
  );
}
