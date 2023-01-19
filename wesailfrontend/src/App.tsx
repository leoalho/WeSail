import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"

import Navigation from './components/Navigation'
import Home from './components/Home'
import Login from './components/Login'
import SignUp from './components/SignUp'
import User from './components/User'
import getUser from './services/user'
import './App.css';
import { newUser } from './reducers/userReducer'
import { RootState } from './types'

function App() {
  
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user)

  useEffect(() => {
    getUser().then(newuser => {
      if (newuser) {
        dispatch(newUser(newuser))
      }
    })
  }, [])

  return (
    <Router>
      <Navigation/>
      <Routes>
        <Route path="/login" element={user ? <Navigate replace to="/" /> : <Login/>} />
        <Route path="/signup" element={user ? <Navigate replace to="/" /> : <SignUp/>} />
        <Route path="/" element={user ? <Home/> : <Login/>} />
        <Route path="/user" element={user ? <User/> : <Login/>} />
      </Routes>
    </Router>
    )
}

export default App;
