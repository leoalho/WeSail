/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Event, RootState } from "../../types"
import { updateEvents } from '../../reducers/userReducer'
import { updateUser } from "../../services/users"
import { Participants } from "../Home/Card"

interface Props {
  event: Event
}

const Card = ({event}: Props) => {
  const user = useSelector((state: RootState) => state.user)
  const [joining, setJoining] = useState(false)
  const dispatch = useDispatch()
  
  const date = new Date(event.date)

  useEffect(() => {
    setJoining(false)
    user.events.forEach(userEvent => {
      if (userEvent === event.id){
        setJoining(true)
      }
    })
  }, [user])
  
  const joinEvent = async () => {
    const newUser = await updateUser(user.id, {op: "add", path: "/events", value: event.id})
    dispatch(updateEvents(newUser.events))
  }

  const unjoinEvent = async () => {
    const newUser = await updateUser(user.id, {op: "remove", path: "/events", value: event.id})
    dispatch(updateEvents(newUser.events))
  }

  return (
    <div className="eventCard">
      <div><b><Link to={`/boats/${event.boat.id}`}>{event.boat.name}</Link></b> @{event.location} <Participants participants={event.participants}/></div>
      {date.toLocaleDateString()} {(date.getHours()<10?'0':'') + date.getHours()}:{(date.getMinutes()<10?'0':'') + date.getMinutes()}<br/>
      <div >{event.description}</div>
      <div style={{display: "flex", justifyContent: "right"}}>{joining ? <button className="button" onClick={()=>unjoinEvent()}>Unjoin</button> : <button className="button" onClick={() => joinEvent()}>Join</button>}</div>
    </div>
  )

}

export default Card
