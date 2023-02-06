import { Link } from "react-router-dom"
import { BoatUser } from "../../types"

interface Props {
  boat: BoatUser,
  date: string,
  time: string,
  location: string,
  description: string
}

const Card = (props: Props) => {
  const date = new Date(props.date)
  return (
    <div className="eventCard">
      <div><b><Link to={`/boats/${props.boat.id}`}>{props.boat.name}</Link></b> @{props.location}</div>
      {date.toLocaleDateString()} {(date.getHours()<10?'0':'') + date.getHours()}:{(date.getMinutes()<10?'0':'') + date.getMinutes()}<br/>
      <div>{props.description}</div>
      <button>Join</button>
    </div>
  )

}

export default Card
