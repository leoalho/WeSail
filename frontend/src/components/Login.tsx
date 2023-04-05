/* eslint-disable @typescript-eslint/no-misused-promises */

import { useState } from "react"
import { useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from 'react-hot-toast';

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
      toast.success(`Logged in as ${username}`)
    } catch (exception) {
      toast.error('Wrong credentials')
    }
  }

  const style = {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    backgroundPosition: "bottom",
    backgroundImage: "url('/images/login.png')",
    backgroundSize: "cover"
  }

  return (
    <div style={style}>
    <form onSubmit={handleLogin} className="form">
    <center><h2>LOG IN</h2></center>
    <center>
    <div><input type="text" value={username} name="Username " onChange={({ target }) => setUsername(target.value)} placeholder="username" style={{fontSize:"15px", width: "90%"}}/></div>
    <div> <input type="password" value={password} name="Password " onChange={({ target }) => setPassword(target.value)} placeholder="password" style={{fontSize:"15px", width: "90%", marginTop: "10px"}}/></div>
    <button className="button" type="submit" style={{fontSize:"20px", width: "100%", marginTop: "15px"}}>login</button><br/>
    </center>
  </form>
  </div>
  )
}

export default Login