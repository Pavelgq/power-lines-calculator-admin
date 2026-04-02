export const TABLE_EMPTY_VALUE = "(нет данных)";

export function isTableCellEmpty(
  value: string | number | null | undefined
): boolean {
  if (value === null || value === undefined) {
    return true;
  }
  return String(value).trim().length === 0;
}
