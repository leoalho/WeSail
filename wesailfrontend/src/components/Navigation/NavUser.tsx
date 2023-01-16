import {Nav, Navbar} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { LoginProps } from '../../types'
import serverLogout from '../../services/logout'

const NavUser = ({user, setUser}:LoginProps) => {
    const logout = () => {
        setUser(null)
        serverLogout()
      }

    return (
      <>
      <Navbar.Brand>Logged in as {user}</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link as={Link} to="/">Home</Nav.Link>
        <Nav.Link as={Link} to="/"  onClick={logout} >Log out</Nav.Link>
      </Nav>
      </>
    )
}

export default NavUser