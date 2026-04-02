export const CLIENTS_ROWS_LS_KEY = "admin.clients.rowsPerPage";
export const REQUESTS_ROWS_LS_KEY = "admin.requests.rowsPerPage";

export const listTableRowsPerPageOptions = [5, 10, 25] as const;
export const listTableRowsPerPageDefault = 5;

export function parseListTableRowsPerPage(raw: string): number {
  const n = parseInt(String(raw).trim(), 10);
  if (
    Number.isFinite(n) &&
    (listTableRowsPerPageOptions as readonly number[]).includes(n)
  ) {
    return n;
  }
  return listTableRowsPerPageDefault;
}

export function canonicalListTableRowsStr(raw: string): string {
  return String(parseListTableRowsPerPage(raw));
}

export function rowsPerPageFromSelectValue(
  raw: unknown,
  allowed: readonly number[]
): number | null {
  const n =
    typeof raw === "number"
      ? raw
      : parseInt(String(raw ?? "").trim(), 10);
  if (!Number.isFinite(n) || !allowed.includes(n)) {
    return null;
  }
  return n;
}
