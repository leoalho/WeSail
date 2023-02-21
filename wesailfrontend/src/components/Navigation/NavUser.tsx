/* eslint-disable @typescript-eslint/no-misused-promises */
import { Link, useLocation } from 'react-router-dom'
import { RootState, Boat, User } from '../../types'
import { useSelector, useDispatch } from 'react-redux'
import { newUser } from '../../reducers/userReducer'
import serverLogout from '../../services/logout'
import React, { useEffect, useState } from 'react'
import { getBoats } from '../../services/boats'
import { getUsers } from '../../services/users'

const NavUser = () => {

  const dispatch = useDispatch()
  const location = useLocation();

  const user = useSelector((state: RootState) => state.user)
  const [users, setUSers] = useState<User[]>([])
  const [boats, setBoats] = useState<Boat[]>([])
  const [filter, setFilter] = useState("")

  useEffect(() => {
    getBoats().then((boats: Boat[]) => setBoats(boats)).catch(e => console.log(e.response.data.error))
    getUsers().then((users: User[]) => setUSers(users)).catch(e => console.log(e.response.data.error))
  }, [])

  useEffect(() => {
    setFilter("")
  }, [location])

  const logout = async () => {
      dispatch(newUser(null))
      await serverLogout()
    }

  const userBoats: JSX.Element[] = []

  if (user.boats) {
    user.boats.forEach((boat) => userBoats.push(<Link to={`/boats/${boat.id}`} key={boat.id as React.Key}>{boat.name}</Link>))
  }

  const filteredUsers = (): (JSX.Element | null) => {
    const filtUsers: JSX.Element[] = []
    users.forEach((user) => {
      if (user.username.includes(filter)){
        filtUsers.push(<Link to={`/users/${user.id}`} key={user.id}>{user.username}</Link>)
      }
    })
    if (filtUsers.length===0){
      return null
    }
    return (
      <>
        <div><b>Users:</b></div>
        {filtUsers}
      </>
    )
  }

  const filteredBoats = (): (JSX.Element | null) => {
    const filtBoats: JSX.Element[] = []
    boats.forEach((boat) => {
      if (boat.name.includes(filter)){
        filtBoats.push(<Link to={`/boats/${boat.id}`} key={boat.id as React.Key}>{boat.name}</Link>)
      }
    })
    if (filtBoats.length===0){
      return null
    }
    return (
      <>
        <div><b>Boats:</b></div>
        {filtBoats}
      </>
    )
  }

  return (
    <>
    <div className='navbarLeft'>
    <Link to="/"><b>Wesail</b></Link>
    {user.boats.length>0 &&
          <div className="dropdown">
            <div className="dropdownTitle">Boats</div>
            <div className="dropdown-content">
              {userBoats}
            </div>
          </div>
    }
    <Link to="/logger">Start Loggin</Link>
    <Link to="/newEvent">New Event</Link>
    <div className="search-container">
              <form className='formtitle'>
                <input className="navbar-input" type="text" placeholder="Search.." value={filter} onChange={e => setFilter(e.target.value)} name="search"/>
              </form>
              <div className={filter? "search-content": "search-no-content"}>
                {(!filteredUsers() && !filteredBoats())? <div>No results</div>: <>{filteredUsers()}{filteredBoats()}</>}
              </div>
    </div>
    </div>
    <div className="navbarRight">
        <Link to="/user">{user.username}</Link>
        <button className='btn' onClick={logout}>logout</button>
    </div>
    </>
  )
}

export default NavUser

