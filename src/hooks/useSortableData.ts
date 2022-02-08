import { useState, useMemo } from "react";

export const useSortableData = (items: number[], sortData: {[id: string]: any}, searchValue: string, searchFields: string[], config: {
    field: string;
    direction: "desc" | "asc" | undefined;
  } = {field: "ordinal", direction: 'asc'}) => {
  const [sortConfig, setSortConfig] = useState(config);
  
  const sortedItems = useMemo(() => {
    let sortableItems = [...items];
      if (searchValue) {
      sortableItems = items.filter((id) => {
        for (let i = 0; i < searchFields.length; i += 1) {
          const currentField = searchFields[i];
          
            if (sortData[id][currentField].includes(searchValue)) {
              return true;
            }
        }
        return false;
      });
    }

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
  }, [items, sortConfig, searchValue]);


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