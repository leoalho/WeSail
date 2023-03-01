import React from "react"
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

export const Participants = ({participants}: Props2) => {
  if (participants.length==0){
    return <></>
  }else if (participants.length<4){
    return <>{participants.map(participant => <React.Fragment key={participant.id}><Link to={`/users/${participant.id}`}>{participant.username}</Link>,</React.Fragment>)}</>
  } else {
    return <><Link to={`/users/${participants[0].id}`}>{participants[0].username}</Link>, <Link to={`/users/${participants[1].id}`}>{participants[1].username}</Link>, <Link to={`/users/${participants[2].id}`}>{participants[2].username}</Link>...</>
  }
}

const Card = (props: Props) => {
  const date = new Date(props.endTime)
  return (
    <div className="content">
      <div style={{display: "flex", alignItems: "center"}}>
        <div>
          <img src="/boat_profile_images/default.jpg" alt="Avatar" className="boat_card"></img>
        </div>
        <div style={{marginLeft: "10px"}}>
          <b><Link to={`/boats/${props.boat.id}`}>{props.boat.name}</Link></b> with <Participants participants={props.participants}/><br/>
          {date.toLocaleDateString()} {(date.getHours()<10?'0':'') + date.getHours()}:{(date.getMinutes()<10?'0':'') + date.getMinutes()}<br />
        </div>
      </div>
      {(props.start && props.end)?<>From {props.start} to {props.end}<br /></>:<>@{props.start} </>}
      {props.description}< br />
    </div>
  )
}

export default Card