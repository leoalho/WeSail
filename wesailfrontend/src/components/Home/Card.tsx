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
    return <>{participants.map(participant => <>{participant.username},</>)}</>
  } else {
    return <>{participants[0].username}, {participants[1].username}, {participants[2].username}, ...</>
  }
}

const Card = (props: Props) => {
  const date = new Date(props.endTime)
  return (
    <div className="content">
      <b>{props.boat.name}</b> with <Participants participants={props.participants}/><br/>
      {date.toLocaleDateString()} {(date.getHours()<10?'0':'') + date.getHours()}:{(date.getMinutes()<10?'0':'') + date.getMinutes()}<br />
      From {props.start} to {props.end}<br />
      {props.description}< br />
    </div>
  )
}

export default Card