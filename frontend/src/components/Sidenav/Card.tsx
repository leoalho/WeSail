/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import toast from 'react-hot-toast'

import { Event, RootState } from "../../types"
import { updateEvents } from '../../reducers/userReducer'
import { updateUser } from "../../services/users"
import { deleteEvent, getEvents } from "../../services/events"
import { Participants } from "../Home/Card"

interface Props {
  event: Event,
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>
}

const Card = ({event, setEvents}: Props) => {
  const user = useSelector((state: RootState) => state.user)
  const [joining, setJoining] = useState(false)
  const [edit, setEdit] = useState(false)
  const [startTime, setStartTime] = useState("")
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

  const getDate = () => {
    const days = `${date.getDate()<10?'0':''}${date.getDate()}`
    const months = `${date.getMonth()<10?'0':''}${date.getMonth()+1}`
    return `${date.getFullYear()}-${months}-${days}`
  }

  const updateEvent = () => {
    console.log(startTime)
    console.log(date)
    toast.success("Updated event")
  }

  const deleteEventLocal = async () => {
    await deleteEvent(event.id)
    const events = await getEvents()
    console.log(`Card events: ${events}`)
    setEvents(events)
    toast.success("Deleted event")
  }

  return (
    <div className="eventCard">
    {edit 
      ? <>
        <div><b><Link to={`/boats/${event.boat.id}`}>{event.boat.name}</Link></b><br />
        Location: <input defaultValue={event.location}></input></div>
        Start time: <input onChange={({target}) => setStartTime(target.value)} type="date" defaultValue={getDate()} />
        <input type="time" defaultValue={`${date.getHours()}:${date.getMinutes()}${date.getMinutes()<10?'0':''}`}/><br />
        <div>Description: <input defaultValue={event.description} /></div>
        <div style={{display: "flex", justifyContent: "right"}}>
        <button className="button" style={{marginRight: "5px"}} onClick={deleteEventLocal}>Delete event</button>
        <button className="button" style={{marginRight: "5px"}} onClick={updateEvent}>Save</button>
        <button className="button" onClick={() => setEdit(!edit)}>cancel</button>
        </div>        
      </>
      : <>
        <div><b><Link to={`/boats/${event.boat.id}`}>{event.boat.name}</Link></b> @{event.location} <Participants participants={event.participants}/></div>
        {date.toLocaleDateString()} {(date.getHours()<10?'0':'') + date.getHours()}:{(date.getMinutes()<10?'0':'') + date.getMinutes()}<br/>
        <div >{event.description}</div>
        <div style={{display: "flex", justifyContent: "right"}}>
        {joining ? <button className="button" style={{borderRadius: "5px", marginRight: "5px"}} onClick={()=>unjoinEvent()}>Unjoin</button> : <button className="button" style={{borderRadius: "5px", marginRight: "5px"}} onClick={() => joinEvent()}>Join</button>}
        {user.id===event.creator && <button className="button" onClick={() => setEdit(!edit)}>Edit</button>}
        </div>
      </>}
    </div>
  )

}

export default Card