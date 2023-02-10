/* eslint-disable @typescript-eslint/no-misused-promises */
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Event, RootState } from "../../types"
import {updateEvent} from "../../services/events"
import { updateEvents } from '../../reducers/userReducer'
import { updateUser } from "../../services/users"
import getLoggedInUser from "../../services/user"

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
    await updateEvent(event.id, {participant: user.id})
    await updateUser(user.id, {event: event.id})
    const newUser = await getLoggedInUser()
    dispatch(updateEvents(newUser.events))
  }

  return (
    <div className="eventCard">
      <div><b><Link to={`/boats/${event.boat.id}`}>{event.boat.name}</Link></b> @{event.location}</div>
      {date.toLocaleDateString()} {(date.getHours()<10?'0':'') + date.getHours()}:{(date.getMinutes()<10?'0':'') + date.getMinutes()}<br/>
      <div>{event.description}</div>
      {joining ? <>Joining <button>Unjoin</button></> : <button onClick={() => joinEvent()}>Join</button>}
    </div>
  )

}

export default Card
