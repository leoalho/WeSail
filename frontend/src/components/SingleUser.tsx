/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState, useEffect } from "react"
import { updateUser, getUser } from "../services/users"
import { User, RootState, Log, Application } from "../types"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getUserLogs } from "../services/logs"
import Card from "./Home/Card"
import { updateFriends, updatePendingFriends } from "../reducers/userReducer"
//import Card from "./Home/Card"

const SingleUser = () => {
  const dispatch = useDispatch()
  const [user, setUser] = useState<(User | null)>(null)
  const [friend, setFriend] = useState<Application>(Application.No)
  const { id } = useParams()
  const [logs, setLogs] = useState<Log[]>([])
  const currentUser = useSelector((state: RootState) => state.user)
  
  useEffect(() => {
    if (id){
        getUser(id).then(user => setUser(user)).catch(e => console.log(e))
        getUserLogs(id).then(newLogs => setLogs(newLogs)).catch(e => console.log(e))
    }
  }, [id])

  useEffect(() => {
    setFriend(Application.No)
    currentUser.friends.forEach((friend) => {
        if (friend.id===id){
        setFriend(Application.Accepted)
        return
        }
    })
    currentUser.friendRequestsPending.forEach(request => {
      if (request.id===id){
        setFriend(Application.Pending)
        return
      }
    })
  }, [id, currentUser]) //currentUSer could perhaps be removed here?

  if (!id) {
    return <>Wrong path</>
  }

  if (!user){
    return <>Loading...</>
  }

  const unfriend = async () => {
    const newUser = await updateUser(currentUser.id, {op: "remove", path: "/friends", value: id})
    dispatch(updateFriends(newUser.friends))
    setFriend(Application.No)
  }

  const sendRequest = async () => {
    const newUser = await updateUser(currentUser.id, {op: "add", path: "/friendRequestsPending", value: id})
    dispatch(updatePendingFriends(newUser.friendRequestsPending))
    setFriend(Application.Pending)
  }

  const style = {
    backgroundColor: "white",
    marginRight: "10px",
    marginTop: "60px",
    width: "200px"
  }
  
  return (
    <div className="main">
    <div>
      <div style={style}>
      <center><img src="/images/user_profile_images/default.jpg" alt="Avatar" className="user_avatar"></img></center>
      <div style={{padding: "5px"}}>
        <div><center><b><u>{user.username}</u></b><br/></center></div>
        {currentUser.id!==user.id && friend===Application.No && <button onClick={sendRequest}>Send friend request</button>}
        {friend===Application.Pending && <>Friend application sent</>}
        {friend===Application.Accepted && <button className="button" onClick={unfriend}>UnFriend</button>}<br/>
      </div>
      </div>
    </div>
    <div>
      <div style={{width: "705px"}}><b>User log:</b></div>
      {logs.map(log => <Card boat={log.boat} startTime={log.startTime} endTime={log.endTime} start={log.start} end={log.end} participants={log.participants} description={log.description} />)}
    </div>
  </div>
  )
}

export default SingleUser
