/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { useState, useEffect } from "react"
import { deleteFollower, getBoat, updateBoat } from "../../services/boats"
import { Boat, Log, RootState, Event } from "../../types"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { updateUser } from "../../services/users"
import getUser from "../../services/user"
import { updateFollowing } from "../../reducers/userReducer"
import { getBoatLogs } from "../../services/logs"
import LogCard from "../Home/Card"
import EventCard from "../Sidenav/Card"
import { getBoatEvents } from "../../services/events"

const SingleBoat = () => {
  const [boat, setBoat] = useState<(Boat | null)>(null)
  const [isFollowing, setIsFollowing] = useState(false)
  const [logs, setLogs] = useState<Log[]>([])
  const [events, setEvents] = useState<Event[]>([])
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
    setIsFollowing(false)
    user.boatsFollowing.forEach((follower) => {
      if (follower.id===id){
        setIsFollowing(true)
        return
      }
    })
  }, [id, user])


  if (!boat){
    return <>Loading ...</>
  }

  const followBoat = async () => {
    await updateUser(user.id, {boatsFollowing: boat.id})
    const newuser = await getUser()
    dispatch(updateFollowing(newuser.boatsFollowing))
    await updateBoat(boat.id, {follower: user.id})
  }

  const unFollowBoat = async () => {
    await deleteFollower(boat.id, user.id)
    const newuser = await getUser()
    dispatch(updateFollowing(newuser.boatsFollowing))
  }

  return (
    <div className="main">
      <div className="single_content">
        {boat && boat.name}<br/>
        {isFollowing ? <button onClick={unFollowBoat}>Unfollow</button> : <button onClick={followBoat}>Start following</button>}<br/>
        <button>Apply for crew</button><br/>
        {logs.length>0 && <div><b>Boat log:</b></div>}
        {logs.map(log => <LogCard boat={log.boat} startTime={log.startTime} endTime={log.endTime} start={log.start} end={log.end} participants={log.participants} description={log.description} />)}
        {events.length>0 && <div><b>Upcoming boat events:</b></div>}
        {events.map((card) => <EventCard boat={card.boat} date={card.date} time={card.time} location={card.location} description={card.description}/>)}
      </div>
    </div>
  )
}

export default SingleBoat