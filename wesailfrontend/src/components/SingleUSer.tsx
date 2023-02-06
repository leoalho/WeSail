/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState, useEffect } from "react"
import { getUser, updateUser } from "../services/users"
import { User, RootState } from "../types"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"

const SingleUser = () => {
  const [user, setUser] = useState<(User | null)>(null)
  const [friend, setFriend] = useState(false)
  const { id } = useParams();
  const currentUser = useSelector((state: RootState) => state.user)
  
  useEffect(() => {
    getUser(id).then(user => setUser(user)).catch(e => console.log(e))
    setFriend(false)
    currentUser.friends.forEach((friend) => {
        if (friend.id===id){
          setFriend(true)
        }
    })
  }, [id])

  if (!id) {
    return <>Wrong path</>
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
    </div>
  </div>
  )
}

export default SingleUser