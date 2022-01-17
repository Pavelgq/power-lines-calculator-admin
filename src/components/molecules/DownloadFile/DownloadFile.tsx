import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { getActionFile } from "../../../store/actionStore";
import { DownloadFileProps } from "./DownloadFile.props";

export function DownloadFile({
  path,
  children,
}: DownloadFileProps): JSX.Element {
  const dispatch = useDispatch();
  const handleDownload = () => {
    if (path) {
      dispatch(getActionFile({ path }));
    }
  };
  if (!path) {
    return <span>Отсутствует</span>;
  }

  return <Button onClick={handleDownload}>{children}</Button>;
}
