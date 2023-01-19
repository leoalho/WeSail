import SideNav from './SideNav'
import { useSelector } from 'react-redux'
import { RootState } from '../types'
 
const UserInput = () => {
  const user = useSelector((state: RootState) => state.user)

  return (
    <div>
      username: {user.username}<br/>
      email: {user.email} <button>change</button><br />
      <button>Change password</button>
      friends:<br />
      {user.friends.map(friend => <>{friend.username} <br/></>)}
    </div>
  )
}

const Home = () => {
  const user = useSelector((state: RootState) => state.user)

  return (
      <div className="main">
        <SideNav />
        <div className="single_content">
          {user && <UserInput/>}
        </div>
      </div>
    )
  }

export default Home