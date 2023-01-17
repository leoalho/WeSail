import { useState, useEffect } from 'react'
import SideNav from './SideNav'
import getUser from '../services/user'
 
const Home = () => {
  const [user, setUser] = useState<any | null>(null)

  useEffect(() => {
    getUser().then(user => {
      setUser(user)
    })
  }, [])

  return (
      <div className="main">
        <SideNav />
        <div className="single_content">
          {user && <>username: {user.username}<br/>
          email: {user.email}<br />
          friends:<br />
          {user.friends.map(friend => <>{friend.username} <br/></>)}
          </>
          }
          
        </div>
      </div>
    )
  }

export default Home