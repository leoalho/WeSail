import React, { useState, useEffect } from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Navigation from './components/Navigation'
import Home from './components/Home'
import Login from './components/Login'
import getUser from './services/user'

function App() {
  const [user, setUser] = useState<string | null>(null)

  useEffect(() => {
    getUser().then(user => {
      setUser(user.username)
    })
  }, [])

  return (
    <Router>
      <Navigation user={user} setUser = {setUser}/>
      <Routes>
        <Route path="/login" element={<Login user = {user} setUser = {setUser}/>} />
        <Route path="/" element={<Home user = {user}/>} />
      </Routes>
    </Router>
    )
}

export default App;
