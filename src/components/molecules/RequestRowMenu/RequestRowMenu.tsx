import { Button } from "@mui/material";
import { RequestRowMenuProps } from "./RequestRowMenu.props";


export function RequestRowMenu({id}: RequestRowMenuProps) {
  
  return (
    <>
      <Button color="success">
        Принять
      </Button>
      <Button color='error'>
        Отклонить
      </Button>
    </>
  )
}