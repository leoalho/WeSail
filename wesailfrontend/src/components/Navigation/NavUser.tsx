/* eslint-disable @typescript-eslint/no-misused-promises */
import { Link } from 'react-router-dom'
import { RootState } from '../../types'
import { useSelector, useDispatch } from 'react-redux'
import { newUser } from '../../reducers/userReducer'
import serverLogout from '../../services/logout'

const NavUser = () => {

  const dispatch = useDispatch()

  const user = useSelector((state: RootState) => state.user)

  const logout = async () => {
      dispatch(newUser(null))
      await serverLogout()
    }

  const boats: JSX.Element[] = []

  if (user.boats) {
    user.boats.forEach((boat) => boats.push(<Link to="/boats" key={boat.id}>{boat.name}</Link>))
  }

  return (
    <>
    <div className='navbarLeft'>
    <Link to="/">Wesail</Link>
    {user.boats.length>0 &&
          <div className="dropdown">Boats
          <div className="dropdown-content">
            {boats}
          </div>
        </div>
    }
    <Link to="/logger">Start Loggin</Link>
    <div>New Event</div>
    </div>
    <div className="navbarRight">
        <Link to="/user">{user.username}</Link>
        <button className='btn' onClick={logout}>logout</button>
    </div>
    </>
  )
}

export default NavUser

