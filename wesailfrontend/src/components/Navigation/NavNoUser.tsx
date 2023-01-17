import { Link } from 'react-router-dom'

const NavNoUser = () => {

    return (
      <>
      <div className='navbarLeft'>
      <Link to="/">Wesail</Link>
      </div>
      <div className="navbarRight">
        <Link to="/login">Log in</Link>
        <Link to="/signup">Sign up</Link>
      </div>
      </>
    )
}

export default NavNoUser