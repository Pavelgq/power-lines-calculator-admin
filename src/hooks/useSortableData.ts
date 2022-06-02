import { useState, useMemo } from "react";
import { checkTimeInterval, isNumber } from "../helpers/filter";

export const useSortableData = <T extends { [id: string]: any }>(
  items: (keyof T)[],
  sortData: T,
  searchValue: string,
  searchFields: string[],
  timeInterval: string,
  config: {
    field: string;
    direction: "desc" | "asc" | undefined;
  } = { field: "ordinal", direction: "desc" }
) => {
  const [sortConfig, setSortConfig] = useState(config);

  const sortedItems = useMemo(() => {
    let sortableItems = [...items];
    if (searchValue) {
      sortableItems = sortableItems.filter((id) => {
        for (let i = 0; i < searchFields.length; i += 1) {
          const currentField = searchFields[i];
          if (
            sortData[id][currentField]
              .toLowerCase()
              .includes(searchValue.toLowerCase())
          ) {
            return true;
          }
        }
        return false;
      });
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
  }, [items, sortConfig, searchValue, timeInterval]);

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
