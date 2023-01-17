import { Link } from 'react-router-dom'
import { LoginProps } from '../../types'
import serverLogout from '../../services/logout'

const NavUser = ({user, setUser}:LoginProps) => {
    const logout = async () => {
        setUser(null)
        await serverLogout()
      }

    return (
      <>
      <div className='navbarLeft'>
      <Link to="/">Wesail</Link>
      <div>Boats</div>
      <div>Start Loggin</div>
      <div>New Event</div>
      </div>
      <div className="navbarRight">
          <Link to="/user">{user}</Link>
          <button className='btn' onClick={logout}>logout</button>
      </div>
      </>
    )
}

export default NavUser