import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
import { Toaster } from 'react-hot-toast';

import Navigation from './components/Navigation'
import Home from './components/Home'
import Login from './components/Login'
import SignUp from './components/SignUp'
import User from './components/User'
import Logger from './components/Logger'
import NewBoat from './components/NewBoat'
import SingleBoat from './components/SingleBoat'
import SingleUser from './components/SingleUser'
import NewEvent from './components/NewEvent'
import NewLog from './components/NewLog'

import getUser from './services/user'
import './App.css';
import { newUser } from './reducers/userReducer'
import { RootState, Payload } from './types'

function App() {
  
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user)

  useEffect(() => {
    getUser().then((newuser: Payload) => {
      if (newuser) {
        dispatch(newUser(newuser))
      }
    }).catch(e => console.log(e.message))
  }, [])

  return (
    <Router>
      <Navigation/>
      <Routes>
        <Route path="/login" element={user ? <Navigate replace to="/" /> : <Login/>} />
        <Route path="/signup" element={user ? <Navigate replace to="/" /> : <SignUp/>} />
        <Route path="/" element={user ? <Home/> : <Login/>} />
        <Route path="/user" element={user ? <User/> : <Login/>} />
        <Route path="/logger" element={user ? <Logger/> : <Login/>} />
        <Route path="/newBoat" element={user ? <NewBoat /> : <Login/>} />
        <Route path="/newEvent" element={user ? <NewEvent /> : <Login/>} />
        <Route path="/boats/:id" element={user ? <SingleBoat key={window.location.pathname}/> : <Login/>} />
        <Route path="/users/:id" element={user ? <SingleUser /> : <Login/>} />
        <Route path="/newLog" element={user ? <NewLog /> : <Login />} />
      </Routes>
      <Toaster/>
    </Router>
    )
}

export default App;