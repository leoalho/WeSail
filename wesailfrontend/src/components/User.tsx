import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../types'
 
const UserInput = () => {
  const user = useSelector((state: RootState) => state.user)

  return (
    <div>
      username: {user.username}<br/>
      email: {user.email} <button>change</button><br />
      <button>Change password</button><br />
      friends:<br />
      {user.friends.map(friend => <>{friend.username} <button>Remove</button> <br/></>)}
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