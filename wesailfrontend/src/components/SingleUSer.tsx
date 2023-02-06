/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState, useEffect } from "react"
import { getUser, updateUser } from "../services/users"
import { User, RootState, Log } from "../types"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { getUserLogs } from "../services/logs"
import Card from "./Home/Card"
//import Card from "./Home/Card"

const SingleUser = () => {
  const [user, setUser] = useState<(User | null)>(null)
  const [friend, setFriend] = useState(false)
  const { id } = useParams()
  const [logs, setLogs] = useState<Log[]>([])
  const currentUser = useSelector((state: RootState) => state.user)
  
  useEffect(() => {
    if (id){
        getUser(id).then(user => setUser(user)).catch(e => console.log(e))
        getUserLogs(id).then(newLogs => setLogs(newLogs)).catch(e => console.log(e))
        setFriend(false)
        currentUser.friends.forEach((friend) => {
            if (friend.id===id){
            setFriend(true)
            }
        })
    }
  }, [id])

  if (!id) {
    return <>Wrong path</>
  }

  if (!user){
    return <>Loading...</>
  }

  const unfriend = () => {
    console.log("Ei toimi")
  }

  const sendRequest = async () => {
    await updateUser(id, {friendRequest: currentUser.id})
  }
  
  return (
    <div className="main">
    <div className="single_content">
      {user && user.username}<br/>
      {friend ? <button onClick={unfriend}>UnFriend</button> : <button onClick={sendRequest}>Send friend request</button>}<br/>
      <b>User log:</b><br/>
      {logs.map(log => <Card boat={log.boat} startTime={log.startTime} endTime={log.endTime} start={log.start} end={log.end} participants={log.participants} description={log.description} />)}
    </div>
  </div>
  )
}

export default SingleUser