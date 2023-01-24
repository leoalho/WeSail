/* eslint-disable @typescript-eslint/no-misused-promises */
import { Link } from 'react-router-dom'
import { RootState } from '../../types'
import { useSelector, useDispatch } from 'react-redux'
import { newUser } from '../../reducers/userReducer'
import serverLogout from '../../services/logout'
import React from 'react'

const NavUser = () => {

  const dispatch = useDispatch()

  const user = useSelector((state: RootState) => state.user)

  const logout = async () => {
      dispatch(newUser(null))
      await serverLogout()
    }

  const boats: JSX.Element[] = []

  if (user.boats) {
    user.boats.forEach((boat) => boats.push(<Link to={`/boats/${boat.id}`} key={boat.id as React.Key}>{boat.name}</Link>))
  }

  return (
    <>
    <div className='navbarLeft'>
    <Link to="/">Wesail</Link>
    {user.boats.length>0 &&
          <div className="dropdown">
            <div className="dropdownTitle">Boats</div>
            <div className="dropdown-content">
              {boats}
            </div>
        </div>
    }
    <Link to="/logger">Start Loggin</Link>
    <Link to="/newEvent">New Event</Link>
    </div>
    <div className="navbarRight">
        <Link to="/user">{user.username}</Link>
        <button className='btn' onClick={logout}>logout</button>
    </div>
    </>
  )
}

export default NavUser

