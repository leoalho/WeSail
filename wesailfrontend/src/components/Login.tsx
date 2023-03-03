/* eslint-disable @typescript-eslint/no-misused-promises */

import { useState } from "react"
import { useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import { newUser } from '../reducers/userReducer'
import { User } from '../types'
import login from '../services/login'

const Login = () => {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const navigate = useNavigate();

  const dispatch = useDispatch()
  const handleLogin = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const NewUser: User = await login({
        username, password,
      })
      dispatch(newUser(NewUser))
      setUsername('')
      setPassword('')
      navigate('/')
    } catch (exception) {
      console.log('Wrong credentials')
    }
  }

  return (
    <div className="login">
    <form onSubmit={handleLogin} className="form">
    <center><h2>LOG IN</h2></center>
    <center>
    <div>
      username: 
      <input type="text" value={username} name="Username " onChange={({ target }) => setUsername(target.value)} />
    </div>
    <div> 
      password: 
      <input type="password" value={password} name="Password " onChange={({ target }) => setPassword(target.value)} />
    </div>
    <button className="button" type="submit" style={{fontSize:"20px", width: "100%", marginTop: "15px"}}>login</button><br/>
    </center>
  </form>
  </div>
  )
}

export default Login