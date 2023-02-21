/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { useState, useEffect } from "react"
import { getBoat, updateBoat } from "../../services/boats"
import { Boat, Log, RootState, Event, Application } from "../../types"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { updateUser } from "../../services/users"
import { updateFollowing, updatePendingCrew } from "../../reducers/userReducer"
import { getBoatLogs } from "../../services/logs"
import LogCard from "../Home/Card"
import EventCard from "../Sidenav/Card"
import { getBoatEvents } from "../../services/events"
import Crew from "./Crew"
import Owner from "./Owner"
import User from "./User"

const SingleBoat = () => {
  const [boat, setBoat] = useState<(Boat | null)>(null)
  const [isFollowing, setIsFollowing] = useState(false)
  const [isOwner, setIsOwner] = useState(false)
  const [isCrew, setIsCrew] = useState(false)
  const [logs, setLogs] = useState<Log[]>([])
  const [events, setEvents] = useState<Event[]>([])
  const [crewApplication, setCrewApplication] = useState<Application>(Application.No)

  const { id } = useParams();
  const user = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    if (id){
        getBoat(id).then((boat) => {setBoat(boat)}).catch(e => console.log(e))
        getBoatLogs(id).then(newLogs => setLogs(newLogs)).catch(e => console.log(e))
        getBoatEvents(id).then(newEvents => setEvents(newEvents)).catch(e => console.log(e))
    }
  }, [id])

  useEffect(() => {
    setIsOwner(false)
    setIsFollowing(false)
    setIsCrew(false)
    user.boatsFollowing.forEach((follower) => {
      if (follower.id===id){
        setIsFollowing(true)
        return
      }
    })
    user.boats.forEach((boat) => {
        if (boat.id===id){
            setIsOwner(true)
            return
        }
    })
    user.crewMember.forEach((boat) => {
        if (boat.id===id){
            setIsCrew(true)
            return
        }
    })
    setCrewApplication(Application.No)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    user.crewRequestsPending.forEach((request) => {
        if (request.id===id){
            setCrewApplication(Application.Pending)
            return
        }
    })
  }, [id, user])


  if (!boat){
    return <>Loading ...</>
  }

  const followBoat = async () => {
    const newuser = await updateUser(user.id, {op: "add", path: "/boatsFollowing", value: boat.id})
    dispatch(updateFollowing(newuser.boatsFollowing))
  }

  const unFollowBoat = async () => {
    const newuser = await updateUser(user.id, {op: "remove", path: "/boatsFollowing", value: boat.id})
    dispatch(updateFollowing(newuser.boatsFollowing))
  }

  const sendCrewRequest = async () => {
    const newUser = await updateUser(user.id, {op: "add", path: "/crewRequestsPending", value: boat.id})
    dispatch(updatePendingCrew(newUser.crewRequestsPending))
  }

  const acceptCrewRequest = async (userId: string) => {
    const newBoat = await updateBoat(boat.id, {op: "add", path: "/crew", value: userId})
    console.log(newBoat)
    setBoat(newBoat)
  }

  const rejectCrewRequest = async (userId: string) => {
    const newBoat = await updateBoat(boat.id, {op: "remove", path: "/crewRequests", value: userId})
    console.log(newBoat)
    setBoat(newBoat)
  }

  return (
    <div className="main">
      <div className="boat_info">
        <div className="boat_info_card">
        <img src="http://localhost:3001/boat_profile_images/default.jpg" alt="Avatar" className="boat_avatar"></img>
        <div style={{padding: "5px"}}>
        <center><h2>{boat.name}</h2></center>
        {isOwner && <Owner applications={boat.crewRequests} acceptCrewRequest={acceptCrewRequest} rejectCrewRequest={rejectCrewRequest}/>}
        {isCrew && <Crew />}
        {!isOwner && !isCrew && <User isFollowing={isFollowing} followBoat={followBoat} unFollowBoat={unFollowBoat} sendCrewRequest={sendCrewRequest} crewApplication={crewApplication}/>}
        </div>
        </div>
      </div>
      <div>
        <div><b>Boat log:</b></div>
        {logs.length===0 && <div className="content">No log yet</div>}
        {logs.map(log => <LogCard boat={log.boat} startTime={log.startTime} endTime={log.endTime} start={log.start} end={log.end} participants={log.participants} description={log.description} />)}
      </div>
      <div style={{marginLeft: "10px"}}>
        <div><b>Upcoming events:</b></div>
        {events.length===0 && <div className="eventCard">No upcoming events</div>}
        {events.map((card) => <EventCard event={card}/>)}
      </div>
    </div>
  )
}

export default SingleBoat