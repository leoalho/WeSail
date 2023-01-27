/* eslint-disable @typescript-eslint/no-misused-promises */
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../types'
import { removeFriend, updateUser } from '../services/users'
 
const UserInput = () => {
  const user = useSelector((state: RootState) => state.user)

  return (
    <div key={user.id}>
      username: {user.username}<br/>
      email: {user.email} <button>change</button><br />
      <button>Change password</button><br />
      friend requests:<br />
      {user.friendRequests.map(friend => <div key={friend.id as React.Key}> {friend.username} <button onClick={() => updateUser(user.id, {friend: friend.id})}>Approve</button> <button>Decline</button> </div>)}
      friends:<br />
      {user.friends.map(friend => <>{friend.username} <button onClick={() => removeFriend(user.id, friend.id)}>Remove</button> <br/></>)}
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