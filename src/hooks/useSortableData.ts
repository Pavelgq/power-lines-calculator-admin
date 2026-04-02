import { useState, useMemo } from "react";
import { checkTimeInterval, isNumber } from "../helpers/filter";
import { TABLE_EMPTY_VALUE } from "../helpers/tableDisplay";

function clientMatchesSearchQuery(
  record: Record<string, unknown> | undefined,
  searchFields: readonly string[],
  queryLower: string
): boolean {
  const haystack = searchFields
    .map((field) => String(record?.[field] ?? "").trim())
    .filter((s) => s.length > 0 && s !== TABLE_EMPTY_VALUE)
    .join(" ")
    .toLowerCase();
  return haystack.includes(queryLower);
}

export const useSortableData = <T extends { [id: string]: any }>(
  items: (keyof T)[],
  sortData: T,
  searchValue: string,
  searchFields: readonly string[],
  timeInterval: string,
  config: {
    field: string;
    direction: "desc" | "asc" | undefined;
  } = { field: "ordinal", direction: "desc" }
) => {
  const [sortConfig, setSortConfig] = useState(config);

  const sortedItems = useMemo(() => {
    let sortableItems = [...items];
    const query = searchValue.trim().toLowerCase();
    if (query) {
      sortableItems = sortableItems.filter((id) =>
        clientMatchesSearchQuery(sortData[id], searchFields, query)
      );
    }

    if (timeInterval !== "all" && timeInterval !== 'not') {
      sortableItems = sortableItems.filter((id) => {
        for (let i = 0; i < searchFields.length; i += 1) {
          if (checkTimeInterval(sortData[id].update, timeInterval)) {
            return true;
          }
        }
        return false;
      });
    }

    if (timeInterval === 'not') {
      sortableItems = sortableItems.filter((id) => {
        for (let i = 0; i < searchFields.length; i += 1) {
          if (!sortData[id].isAccept) {
            return true;
          }
        }
        return false;
      });
    }

    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        const value1 = isNumber(sortData[a][sortConfig.field]);
        const value2 = isNumber(sortData[b][sortConfig.field]);
        if (value1 < value2) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (value1 > value2) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems.map((el) => Number(el));
  }, [items, sortConfig, searchValue, timeInterval, sortData, searchFields]);

  const sortingField = (field: string) => {
    let direction: "desc" | "asc" | undefined =
      sortConfig.direction === "desc" ? "asc" : "desc";
    if (sortConfig.field !== field) {
      direction = "desc";
    }
    setSortConfig({ field, direction });
  };

  return { items: sortedItems, sortConfig, sortingField };
};
