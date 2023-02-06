import { Link } from "react-router-dom"
import { BoatUser, Friend } from "../../types"

interface Props {
  boat: BoatUser,
  startTime: string,
  endTime: string,
  start: string,
  end: string,
  participants: Friend[],
  description: string
}

interface Props2 {
  participants: Friend[]
}

const Participants = ({participants}: Props2) => {
  if (participants.length==0){
    return <></>
  }else if (participants.length<4){
    return <>{participants.map(participant => <><Link to={`/users/${participant.id}`} key={participant.id}>{participant.username}</Link>,</>)}</>
  } else {
    return <><Link to={`/users/${participants[0].id}`}>{participants[0].username}</Link>, <Link to={`/users/${participants[1].id}`}>{participants[1].username}</Link>, <Link to={`/users/${participants[2].id}`}>{participants[2].username}</Link>...</>
  }
}

const Card = (props: Props) => {
  const date = new Date(props.endTime)
  return (
    <div className="content">
      <b><Link to={`/boats/${props.boat.id}`}>{props.boat.name}</Link></b> with <Participants participants={props.participants}/><br/>
      {date.toLocaleDateString()} {(date.getHours()<10?'0':'') + date.getHours()}:{(date.getMinutes()<10?'0':'') + date.getMinutes()}<br />
      From {props.start} to {props.end}<br />
      {props.description}< br />
    </div>
  )
}

export default Card