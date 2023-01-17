import { Link } from 'react-router-dom'
import { LoginProps } from '../../types'
import NavUser from './NavUser'
import NavNoUser from './NavNoUser'

const Navigation = ({user, setUser}:LoginProps) => {

    return (
      <div className='navbar'>
            {user? <NavUser user={user} setUser={setUser}/> : <NavNoUser/>}
      </div>
    )
}

export default Navigation