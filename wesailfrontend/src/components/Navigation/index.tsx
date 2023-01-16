import {Navbar, Container} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { LoginProps } from '../../types'
import NavUser from './NavUser'
import NavNoUser from './NavNoUser'

const Navigation = ({user, setUser}:LoginProps) => {

    return (
      <Navbar bg="dark" variant="dark">
        <Container>
            <Navbar.Brand as={Link} to="/">WeSail</Navbar.Brand>
            {user? <NavUser user={user} setUser={setUser}/> : <NavNoUser/>}
        </Container>
      </Navbar>
    )
}

export default Navigation