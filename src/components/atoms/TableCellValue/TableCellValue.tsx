import { ElementType } from "react";
import { Typography, TypographyProps } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import {
  TABLE_EMPTY_VALUE,
  isTableCellEmpty,
} from "../../../helpers/tableDisplay";
import { SearchMatchText } from "../SearchMatchText/SearchMatchText";
import type { SearchMatchTextProps } from "../SearchMatchText/SearchMatchText";

const passthrough = (raw: string) => raw;

/* Опциональные поля покрыты значениями по умолчанию в деструктуризации. */
/* eslint-disable react/require-default-props */
type TableCellValueProps = {
  value: string | number | null | undefined;
  format?: (raw: string) => string;
  component?: ElementType;
  variant?: TypographyProps["variant"];
  className?: string;
  sx?: SxProps<Theme>;
  align?: TypographyProps["align"];
  noWrap?: boolean;
};

export function TableCellValue({
  value,
  format = passthrough,
  variant = "body2",
  component = "span",
  className,
  sx,
  align,
  noWrap,
}: TableCellValueProps): JSX.Element {
  const raw = value == null ? "" : String(value).trim();
  const formatted = format(raw);
  const display = String(formatted).trim();
  const empty = display.length === 0;

  return (
    <Typography
      component={component}
      variant={variant}
      color={empty ? "text.secondary" : "inherit"}
      className={className}
      sx={sx}
      align={align}
      noWrap={noWrap}
      data-search-exclude={empty ? true : undefined}
    >
      {empty ? TABLE_EMPTY_VALUE : display}
    </Typography>
  );
}

export function TableSearchMatchText({
  text,
  query,
  format,
  className,
}: SearchMatchTextProps): JSX.Element {
  if (isTableCellEmpty(text)) {
    return (
      <Typography
        component="span"
        variant="body2"
        color="text.secondary"
        className={className}
        data-search-exclude
      >
        {TABLE_EMPTY_VALUE}
      </Typography>
    );
  }
  return (
    <SearchMatchText
      text={String(text).trim()}
      query={query}
      format={format}
      className={className}
    />
  );
}
