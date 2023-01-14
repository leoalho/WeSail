import React, { useState } from 'react'
import {Button} from 'react-bootstrap'
import Header from './components/header'
import login from './services/login'

function App() {
  const [user, setUser] = useState<string | null>(null)
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const handleLogin = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    try {
      const user = await login({
        username, password,
      })

      setUser(user.username)

      //blogService.setToken(user.token)
      //window.localStorage.setItem(
      //  'loggedUser', JSON.stringify(user)
      //)
      setUsername('')
      setPassword('')
      console.log(user)
    } catch (exception) {
      console.log('Wrong credentials')
    }
}

  const logout = () => {
    setUser(null)
  }

  if (!user){
    return (
      <div className="container">
        <Header />
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
      </div>
    )
  }
  return (
    <div className="container">
      <Header />
      <div>
        Hello {user}!
      </div>
      <Button onClick={logout}>logout</Button>
    </div>
  );
}

export default App;
