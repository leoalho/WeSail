import {Nav} from 'react-bootstrap'
import { Link } from 'react-router-dom'

const NavNoUser = () => {

    return (
      <Nav className="me-auto">
        <Nav.Link as={Link} to="/">Home</Nav.Link>
        <Nav.Link as={Link} to="/login">Log in</Nav.Link>
        <Nav.Link as={Link} to="/signup">Sign up</Nav.Link>
      </Nav>
    )
}

export default NavNoUser