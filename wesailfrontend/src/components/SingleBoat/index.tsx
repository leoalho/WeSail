/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { useState, useEffect } from "react"
import Select from 'react-select'
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { Boat, Log, RootState, Event, Application, Option, Patch } from "../../types"
import { updateFollowing, updatePendingCrew } from "../../reducers/userReducer"
import { getBoatLogs } from "../../services/logs"
import { getBoat, updateBoat } from "../../services/boats"
import { updateUser } from "../../services/users"
import { getBoatEvents, getPastBoatEvents } from "../../services/events"

import LogCard from "../Home/Card"
import EventCard from "../Sidenav/Card"
import Crew from "./Crew"
import Owner from "./Owner"
import User from "./User"
import PastEventCard from "./PastEventCard"
import NewTodo from "./NewTodo"
import TodoCard from "./TodoCard"

const SingleBoat = () => {
  const navigate = useNavigate()
  const [boat, setBoat] = useState<(Boat | null)>(null)
  const [isFollowing, setIsFollowing] = useState(false)
  const [isOwner, setIsOwner] = useState(false)
  const [isCrew, setIsCrew] = useState(false)
  const [logs, setLogs] = useState<Log[]>([])
  const [events, setEvents] = useState<Event[]>([])
  const [pastEvents, setPastEvents] = useState<Event[]>([])
  const [selectTodos, setSelectTodos] = useState(false)
  const [selectedTodos, setSelectedTodos] = useState<Option[]>([])
  const [crewApplication, setCrewApplication] = useState<Application>(Application.No)
  const [sails, setSails] = useState(true)
  const [maintenances, setMaintenances] = useState(true)
  const [newTodo, setNewTodo] = useState(false)
  const [options, setOptions] = useState<Option[]>([])

  const { id } = useParams();
  const user = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    if (id){
        getBoat(id).then((boat) => {setBoat(boat)}).catch(e => console.log(e))
        getBoatLogs(id).then(newLogs => setLogs(newLogs)).catch(e => console.log(e))
    }
  }, [id])

  useEffect(() => {
    setIsOwner(false)
    setIsFollowing(false)
    setIsCrew(false)
    user.boatsFollowing.forEach((follower) => {
      if (follower.id===id){
        setIsFollowing(true)
        return
      }
    })
    user.boats.forEach((boat) => {
        if (boat.id===id){
            setIsOwner(true)
            return
        }
    })
    user.crewMember.forEach((boat) => {
        if (boat.id===id){
            setIsCrew(true)
            return
        }
    })
    setCrewApplication(Application.No)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    user.crewRequestsPending.forEach((request) => {
        if (request.id===id){
            setCrewApplication(Application.Pending)
            return
        }
    })
    if (id){
      getBoatEvents(id).then(newEvents => setEvents(newEvents)).catch(e => console.log(e))
      getPastBoatEvents(id).then(newEvents => setPastEvents(newEvents)).catch(e => console.log(e))
    }
  }, [id, user])

  useEffect(() => {
    setOptions([])
    const newOptions: Option[] = []
    if (boat){
        boat.todos.forEach((todo) => {
            newOptions.push({value: todo._id, label: todo.value})
        })
        setOptions(newOptions)
    }
  }, [id, boat])


  if (!boat){
    return <>Loading ...</>
  }

  const followBoat = async () => {
    const newuser = await updateUser(user.id, {op: "add", path: "/boatsFollowing", value: boat.id})
    dispatch(updateFollowing(newuser.boatsFollowing))
  }

  const unFollowBoat = async () => {
    const newuser = await updateUser(user.id, {op: "remove", path: "/boatsFollowing", value: boat.id})
    dispatch(updateFollowing(newuser.boatsFollowing))
  }

  const sendCrewRequest = async () => {
    const newUser = await updateUser(user.id, {op: "add", path: "/crewRequestsPending", value: boat.id})
    dispatch(updatePendingCrew(newUser.crewRequestsPending))
  }

  const acceptCrewRequest = async (userId: string) => {
    const newBoat = await updateBoat(boat.id, [{op: "add", path: "/crew", value: userId}])
    console.log(newBoat)
    setBoat(newBoat)
  }

  const rejectCrewRequest = async (userId: string) => {
    const newBoat = await updateBoat(boat.id, [{op: "remove", path: "/crewRequests", value: userId}])
    console.log(newBoat)
    setBoat(newBoat)
  }

  const doneTodos = async () => {
    let description = ""
    const todoPatches: Patch[] = []
    selectedTodos.forEach(todo => {
        todoPatches.push({op: "remove", path: "/todos", value: todo.value})
        description = description.concat(" -", todo.label)
    })
    const newBoat = await updateBoat(boat.id, todoPatches)
    if (confirm("Create a log entry?")){
        navigate("/newLog", {state: {boat: boat.id, participants: [{value: user.id, label: user.username}], description: description, type: "maintenance"}})
    }else {
        setBoat(newBoat)
        setSelectTodos(false)
        setSelectedTodos([])
    }
  }

  return (
    <div className="main">
      <div className="boat_info">
        <div className="boat_info_card">
        <img src="http://localhost:3001/boat_profile_images/default.jpg" alt="Avatar" className="boat_avatar"></img>
        <div style={{padding: "5px"}}>
        <center><h2>{boat.name}</h2></center>
        {isOwner && <Owner applications={boat.crewRequests} acceptCrewRequest={acceptCrewRequest} rejectCrewRequest={rejectCrewRequest}/>}
        {isCrew && <Crew />}
        {!isOwner && !isCrew && <User isFollowing={isFollowing} followBoat={followBoat} unFollowBoat={unFollowBoat} sendCrewRequest={sendCrewRequest} crewApplication={crewApplication}/>}
        </div>
        </div>
      </div>
      <div>
        <div>
          <b>Boat log:</b><br/>
           Show: 
          <input type="checkbox" id="sails" name="sails" checked={sails} onChange={() => setSails(!sails)}/>sails
          <input type="checkbox" id="maintenances" name="maintenances" checked={maintenances} onChange={() => setMaintenances(!maintenances)}/>maintenances</div>
        {logs.length===0 && <div className="content">No logs yet</div>}
        {logs.map(log => <LogCard key={log.id} boat={log.boat} startTime={log.startTime} endTime={log.endTime} start={log.start} end={log.end} participants={log.participants} description={log.description} />)}
      </div>
      <div style={{marginLeft: "10px"}}>
        <div><b>Upcoming events:</b></div>
        {events.length===0 && <div className="eventCard">No upcoming events</div>}
        {events.map((card) => <EventCard key={card.id} event={card}/>)}
        <div><b>Todos:</b></div>
        <div className="eventCard">
            {(boat.todos.length===0)
                ?<div>No Todos</div>
                :<ul>{boat.todos.map(todo => <TodoCard key={todo._id} todo={todo}/>)}</ul>
            }
        </div>
        {newTodo && <NewTodo setNewTodo={setNewTodo} setBoat={setBoat} boatId={boat.id} userId={user.id}/>}
        {selectTodos && 
            <div className="eventCard">
                <Select isMulti name="todos" options={options} onChange={(option) => setSelectedTodos([...option])} className="basic-multi-select" classNamePrefix="select" />
                <button className="button" onClick={() => {
                    setSelectTodos(false)
                    setSelectedTodos([])}}
                >Cancel</button>
                <button className="button" onClick={doneTodos}> Mark as done</button>
            </div>
        }
        {!newTodo && !selectTodos &&
        <div>
            <button className="button" onClick={() => {setNewTodo(true)}}>Create New</button>
            <button className="button" onClick={() => setSelectTodos(true)}>Mark todos as done</button>
        </div>}
        <div><b>Past events:</b></div>
        {pastEvents.map((card) => <PastEventCard key={card.id} boatId={boat.id} setPastEvents={setPastEvents} event={card}/>)}
      </div>
    </div>
  )
}

export default SingleBoat