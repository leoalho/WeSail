/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useState, useEffect } from "react"
import { deleteFollower, getBoat, updateBoat } from "../../services/boats"
import { Boat, Log, RootState } from "../../types"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { updateUser } from "../../services/users"
import getUser from "../../services/user"
import { updateFollowing } from "../../reducers/userReducer"
import { getBoatLogs } from "../../services/logs"
import Card from "../Home/Card"

const SingleBoat = () => {
  const [boat, setBoat] = useState<(Boat | null)>(null)
  const [isFollowing, setIsFollowing] = useState(false)
  const [logs, setLogs] = useState<Log[]>([])
  const { id } = useParams();
  const user = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    if (id){
        getBoat(id).then((boat) => {setBoat(boat)}).catch(e => console.log(e))
        getBoatLogs(id).then(newLogs => setLogs(newLogs)).catch(e => console.log(e))
    user.boatsFollowing.forEach((follower) => {
      if (follower.id===id){
        setIsFollowing(true)
        return
      }
    })
}
  }, [id])

  if (!boat){
    return <>Loading ...</>
  }

  const followBoat = async () => {
    await updateUser(user.id, {boatsFollowing: boat.id})
    const newuser = await getUser()
    dispatch(updateFollowing(newuser.boatsFollowing))
    await updateBoat(boat.id, {follower: user.id})
    setIsFollowing(true)
  }

  const unFollowBoat = async () => {
    await deleteFollower(boat.id, user.id)
    const newuser = await getUser()
    dispatch(updateFollowing(newuser.boatsFollowing))
    setIsFollowing(false)
  }

  return (
    <div className="main">
      <div className="single_content">
        {boat && boat.name}<br/>
        {isFollowing ? <button onClick={unFollowBoat}>Unfollow</button> : <button onClick={followBoat}>Start following</button>}<br/>
        <button>Apply for crew</button><br/>
        <b>Boat log:</b><br/>
        {logs.map(log => <Card boat={log.boat} startTime={log.startTime} endTime={log.endTime} start={log.start} end={log.end} participants={log.participants} description={log.description} />)}
      </div>
    </div>
  )
}

export default SingleBoat