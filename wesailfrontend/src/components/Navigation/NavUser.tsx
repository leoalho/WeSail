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

  return (
    <>
    <div className='navbarLeft'>
    <Link to="/">Wesail</Link>
    <div>Boats</div>
    <div>Start Loggin</div>
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

