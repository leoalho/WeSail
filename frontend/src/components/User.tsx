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
  const [newPwd, setNewPwd] = useState('')
  const [newPwd2, setNewPwd2] = useState('')
  const [newEmail, setNewEmail] = useState('')

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

  const cancelEmail = () => {
    setEditEmail(!editEmail)
    setNewEmail('')
  }

  const cancelPwd = () => {
    setEditPassword(!editPassword)
    setNewPwd('')
    setNewPwd2('')
  }

  return (
    <div className="content">
      username: {user.username}<br/>
      {editEmail
        ? <><input value={newEmail} onChange={({ target }) => setNewEmail(target.value)} placeholder="new email address" /><button className='button'>Save</button><button className='button' onClick={cancelEmail}>Cancel</button></>
        : <>email: {user.email} <button className="button" onClick={()=> setEditEmail(!editEmail)}>change</button></>}
      <br />
      {editPassword
        ? <><input value={newPwd} type="password" placeholder="New password" onChange={({ target }) => setNewPwd(target.value)} /><br />
          <input value={newPwd2} type="password" placeholder="New password again" onChange={({ target }) => setNewPwd2(target.value)} /><button className='button'>Send</button><button className='button' onClick={cancelPwd}>Cancel</button></>
        : <><button className="button" onClick={()=>setEditPassword(!editPassword)}>Change password</button></>}
      <br />
      {user.friendRequests.length>0 &&
      <>
      friend requests:<br />
      {user.friendRequests.map(friend => <div key={friend.id as React.Key}> {friend.username} <button onClick={() => acceptRequest(friend.id)}>Approve</button> <button onClick={()=> declineRequest(friend.id)}>Decline</button> </div>)}
      </>}
      {user.friends.length>0 &&
      <>
      friends:<br />
      {user.friends.map(friend => <>{friend.username} <button onClick={async () => await deleteFriend(friend.id)}>Remove</button> <br/></>)}
      </>} 
      <Link to="../newBoat">Add a new boat</Link>
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