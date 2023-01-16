import React, { useState, useEffect } from 'react'
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
import Navigation from './components/Navigation'
import Home from './components/Home'
import Login from './components/Login'
import SignUp from './components/SignUp'
import getUser from './services/user'
import './App.css';

function App() {
  const [user, setUser] = useState<string | null>(null)

  useEffect(() => {
    getUser().then(user => {
      setUser(user.username)
    })
  }, [])

  return (
    <div className="container">
    <Router>
      <Navigation user={user} setUser = {setUser}/>
      <Routes>
        <Route path="/login" element={user ? <Navigate replace to="/" /> : <Login user = {user} setUser = {setUser}/>} />
        <Route path="/signup" element={user ? <Navigate replace to="/" /> : <SignUp/>} />
        <Route path="/" element={<Home user = {user}/>} />
      </Routes>
    </Router>
    </div>
    )
}

export default App;
