/* eslint-disable @typescript-eslint/no-misused-promises */
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../types'
import { updateUser } from '../services/users'
import { useDispatch } from 'react-redux'
import { updateFriends, updateFriendRequests } from '../reducers/userReducer'
import { useState } from 'react'
 
const UserInput = () => {
  const [editPassword, setEditPassword] = useState(false)
  const [editEmail, setEditEmail] = useState(false)

  const user = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()

  const acceptRequest = async (id: string) => {
    const newUser = await updateUser(user.id, {op: "add", path: "/friends", value: id})
    dispatch(updateFriends(newUser.friends))
    dispatch(updateFriendRequests(newUser.friendRequests))
  }

  const declineRequest = async (request: string) => {
    const newUser = await updateUser(user.id, {op: "remove", path: "/friendRequests", value: request})
    dispatch(updateFriendRequests(newUser.friendRequests))
  }

  const deleteFriend = async (friend: string) => {
    const newUser = await updateUser(user.id, {op: "remove", path: "/friends", value: friend})
    dispatch(updateFriends(newUser.friends))
  }

  return (
    <div className="content">
      username: {user.username}<br/>
      {editEmail
        ? <><input></input><button className='button'>Save</button><button className='button' onClick={()=>setEditEmail(!editEmail)}>Cancel</button></>
        : <>email: {user.email} <button className="button" onClick={()=>setEditEmail(!editEmail)}>change</button></>}
      <br />
      {editPassword
        ? <><input></input><br />
          <input></input><button className='button'>Send</button><button className='button' onClick={()=>setEditPassword(!editPassword)}>Cancel</button></>
        : <><button className="button" onClick={()=>setEditPassword(!editPassword)}>Change password</button></>}
      <br />

      friend requests:<br />
      {user.friendRequests.map(friend => <div key={friend.id as React.Key}> {friend.username} <button onClick={() => acceptRequest(friend.id)}>Approve</button> <button onClick={()=> declineRequest(friend.id)}>Decline</button> </div>)}
      friends:<br />
      {user.friends.map(friend => <>{friend.username} <button onClick={async () => await deleteFriend(friend.id)}>Remove</button> <br/></>)}
      <Link to="../newBoat">Add boat</Link>
    </div>
  )
}

const Home = () => {
  const user = useSelector((state: RootState) => state.user)

  return (
      <div className="main">
        <div>
          {user && <UserInput/>}
        </div>
      </div>
    )
  }

export default Home