/* eslint-disable @typescript-eslint/no-misused-promises */
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../types'
import { removeFriend, updateUser, declineFriendRequest } from '../services/users'
import { useDispatch } from 'react-redux'
import getLoggedInUser from "../services/user"
import { updateFriends, updateFriendRequests } from '../reducers/userReducer'
 
const UserInput = () => {
  const user = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()

  const acceptRequest = async (id: string) => {
    await updateUser(user.id, {friend: id})
    const newUser = await getLoggedInUser()
    dispatch(updateFriends(newUser.friends))
    dispatch(updateFriendRequests(newUser.friendRequests))
  }

  const declineRequest = async (request: string) => {
    await declineFriendRequest(user.id, request)
    const newUser = await getLoggedInUser()
    dispatch(updateFriendRequests(newUser.friendRequests))
  }

  const deleteFriend = async (friend: string) => {
    await removeFriend(user.id, friend)
    const newUser = await getLoggedInUser()
    dispatch(updateFriends(newUser.friends))
  }

  return (
    <div key={user.id}>
      username: {user.username}<br/>
      email: {user.email} <button>change</button><br />
      <button>Change password</button><br />
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
        <div className="single_content">
          {user && <UserInput/>}
        </div>
      </div>
    )
  }

export default Home