import { useState } from "react"
import {Button} from 'react-bootstrap'

import { LoginProps } from "../types"
import login from '../services/login'
import { useNavigate } from "react-router-dom";

const Login = ({user, setUser}: LoginProps) => {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const navigate = useNavigate();

  const handleLogin = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    try {
      const user = await login({
        username, password,
      })

      setUser(user.username)
      //blogService.setToken(user.token)
      //window.localStorage.setItem('loggedUser', JSON.stringify(user.username))
      setUsername('')
      setPassword('')
      console.log(user)
      navigate('/')
    } catch (exception) {
      console.log('Wrong credentials')
    }
  }

  if (user) {
    navigate('/')
    return (
      <></>
    )
  }

  return (
    <form onSubmit={handleLogin}>
    <div>
      username
      <input type="text" value={username} name="Username " onChange={({ target }) => setUsername(target.value)} />
    </div>
    <div> 
      password
      <input type="password" value={password} name="Password " onChange={({ target }) => setPassword(target.value)} />
    </div>
    <Button type="submit">login</Button>
  </form>
  )
}

export default Login