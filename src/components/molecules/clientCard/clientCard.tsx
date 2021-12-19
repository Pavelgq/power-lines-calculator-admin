import { Card } from "../../atoms/Card/Card"
import { ClientCardProps } from "./clientCard.props"


export const ClientCard = ({client, color='white', children}: ClientCardProps): JSX.Element => {

  return (
    <Card>
      <h3>{client.first_name}</h3>
      <h3>{client.last_name}</h3>
    </Card>
  )
}