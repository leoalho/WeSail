import React, { useState, useEffect } from 'react'
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
import Navigation from './components/Navigation'
import Home from './components/Home'
import Login from './components/Login'
import SignUp from './components/SignUp'
import User from './components/User'
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
    <Router>
      <Navigation user={user} setUser = {setUser}/>
      <Routes>
        <Route path="/login" element={user ? <Navigate replace to="/" /> : <Login user = {user} setUser = {setUser}/>} />
        <Route path="/signup" element={user ? <Navigate replace to="/" /> : <SignUp/>} />
        <Route path="/" element={user ? <Home/> : <Login user = {user} setUser = {setUser}/>} />
        <Route path="/user" element={user ? <User/> : <Login user = {user} setUser = {setUser}/>} />
      </Routes>
    </Router>
    )
}

export default App;
