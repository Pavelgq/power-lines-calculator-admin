import { useState, useMemo } from "react";

export const useSortableData = <T>(items: (keyof Т)[], sortData: T, config: {
    field: string;
    direction: "desc" | "asc" | undefined;
  } = {field: "id", direction: 'asc'}) => {
  const [sortConfig, setSortConfig] = useState(config);
  
  const sortedItems = useMemo(() => {
  const sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (sortData[a][sortConfig.field] < sortData[b][sortConfig.field]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (sortData[a][sortConfig.field] > sortData[b][sortConfig.field]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const sortingField = (field: string) => {
    let direction: "desc" | "asc" | undefined =
      sortConfig.direction === "desc" ? "asc" : "desc";
    if (sortConfig.field !== field) {
      direction = "desc";
    }
    setSortConfig({ field, direction });
  };

  return { items: sortedItems, sortConfig, sortingField };
}