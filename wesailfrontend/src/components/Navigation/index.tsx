import { Link } from 'react-router-dom'
import { RootState } from '../../types'
import { useSelector } from 'react-redux'
import NavUser from './NavUser'
import NavNoUser from './NavNoUser'


const Navigation = () => {

  const user = useSelector((state: RootState) => state.user)

  return (
    <div className='navbar'>
          {user? <NavUser/> : <NavNoUser/>}
    </div>
  )
}

export default Navigation