import { RefObject, useLayoutEffect } from "react";
import {
  applyTableSearchHighlights,
  clearTableSearchHighlights,
  isCustomHighlightSupported,
  CLIENT_TABLE_HIGHLIGHT_NAME,
} from "../helpers/cssCustomHighlight";

/**
 * Прогрессивное улучшение: подсветка через CSS Custom Highlight API.
 * Разметка с [data-search-highlight] должна быть внутри rootRef.
 */
export function useTableSearchHighlights(
  rootRef: RefObject<HTMLElement | null>,
  searchValue: string,
  layoutKey: string,
  registryName: string = CLIENT_TABLE_HIGHLIGHT_NAME
): void {
  useLayoutEffect(() => {
    if (!isCustomHighlightSupported()) {
      return undefined;
    }
    const root = rootRef.current;
    applyTableSearchHighlights(root, searchValue, registryName);
    return () => {
      clearTableSearchHighlights(registryName);
    };
  }, [rootRef, searchValue, layoutKey, registryName]);
}
