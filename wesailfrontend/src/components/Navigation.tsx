import {Navbar, Nav, Container} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { LoginProps } from '../types'
import serverLogout from '../services/logout'

const Navigation = ({user, setUser}:LoginProps) => {
  const logout = () => {
    setUser(null)
    serverLogout()
  }

  if (user){
    return (
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">WeSail</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/"  onClick={logout} >Log out</Nav.Link>
          </Nav>
        </Container>
    </Navbar>
    )
  }
  return (
    <Navbar bg="dark" variant="dark">
    <Container>
      <Navbar.Brand  as={Link} to="/">WeSail</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link as={Link} to="/">Home</Nav.Link>
        <Nav.Link as={Link} to="/login">Log in</Nav.Link>
        <Nav.Link href="#signup">Sign up</Nav.Link>
      </Nav>
    </Container>
  </Navbar>
  )

}

export default Navigation