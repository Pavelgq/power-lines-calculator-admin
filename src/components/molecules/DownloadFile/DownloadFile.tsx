import { Button, IconButton, Typography } from "@mui/material";
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
    return <Typography variant="body1">--</Typography>;
  }

  return <IconButton onClick={handleDownload}>{children}</IconButton>;
}
