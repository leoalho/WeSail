/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */

import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Select from 'react-select'
import { useLocation } from "react-router-dom"

import { getBoat } from "../services/boats"
import { newLog } from "../services/logs"
import { RootState, Option } from "../types"

const NewLog = () => {
  const user = useSelector((state: RootState) => state.user)
  const location = useLocation()
  const [logType, setLogType] = useState("sail")
  const [boat, setBoat] = useState("")
  const [participants, setParticipants] = useState<Option[]>([])
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [distance, setDistance] = useState("")
  const [distanceSailed, setDistanceSailed] = useState("")
  const [startLocation, setStartLocation] = useState("")
  const [endLocation, setEndLocation] = useState("")
  const [description, setDescription] = useState("")
  const [weather, setWeather] = useState("")
  const [options, setOptions] = useState<Option[]>([])
  const [todoOptions, setTodoOptions] = useState<Option[]>([])
  const [todos, setTodos] = useState<Option[]>([])

  useEffect(() => {
    
    setParticipants([{value: user.id, label: user.username}])
    if (location.state){
        setBoat(location.state.boat)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        setParticipants([...location.state.participants])
        setLogType(location.state.type)
        if (location.state.description){
            setDescription(location.state.description)
        }
    }
    if (boat){
        const newOptions: Option[] = []
        const newTodoOptions: Option[] = []
        getBoat(boat).then((newBoat) => {
            newBoat.owners.forEach(owner => {
                newOptions.push({value: owner.id, label: owner.username})
            })
            newBoat.crew.forEach(crew => {
                newOptions.push({value: crew.id, label: crew.username})
            })
            newBoat.todos.forEach(todo => {
                newTodoOptions.push({value: todo._id, label: todo.value})
            })
            setOptions(newOptions)
            setTodoOptions(newTodoOptions)
        }).catch(e => console.log(e))
    }
  }, [boat])

  useEffect(() => {
    if (user.boats.length>0){
        setBoat(user.boats[0].id)
    }
  }, [])

  const createEvent = async () => {
    await newLog(
        {
            boat: boat,
            participants: participants.map(participant => participant.value),
            description: description,
            weather: weather,
            distance: distance,
            distanceSailed: distanceSailed,  
            startTime: startTime,
            endTime: endTime,
            start: startLocation,
            end: endLocation,
            logType: logType
        }
    )
    console.log(todos)
  }

  const style = {
    backgroundColor: "white",
    padding: "10px"
  }

  return (
    <div className="main">
      <div>
        <div style={style}>
        <select value={logType} onChange={({target}) => setLogType(target.value)}>
            <option value="sail">Sail</option>
            <option value="maintenance">Maintenance</option>
        </select>
        <select value={boat} onChange={({target}) => setBoat(target.value)}>
          {user.boats.map(boat => <option key={boat.id as React.Key} value={boat.id}>{boat.name}</option>)}
        </select><br/>
        With: <Select isMulti name="participants" options={options} value={participants} onChange={(option) => setParticipants([...option])} className="basic-multi-select" classNamePrefix="select" />
        Start location: <input onChange={({target}) => setStartLocation(target.value)}></input>
        <input onChange={({target}) => setStartTime(target.value)} type="datetime-local" id="start-time" name="start-time"></input><br />
        {(logType==="sail")? <>End location: <input onChange={({target}) => setEndLocation(target.value)}></input></>:<>End time: </>}
        <input value={endTime} onChange={({target}) => setEndTime(target.value)} type="datetime-local" id="end-time" name="end-time"></input><br />
        {logType==="sail" && <>Distance: <input type="number" onChange={({target}) => setDistance(target.value)}></input><br />
            Distance sailed: <input type="number" onChange={({target}) => setDistanceSailed(target.value)}></input><br />
            Weather: <input onChange={({target}) => setWeather(target.value)}></input><br /></>
        }
        Description: <input value={description} onChange={({target}) => setDescription(target.value)}></input><br/>
        Todos Done: <Select isMulti name="todos" options={todoOptions} className="basic-multi-select" classNamePrefix="select" onChange={(option) => setTodos([...option])}/>
        <button onClick={createEvent}>Create log entry</button>
      </div>
      </div>
    </div>
  )
}

export default NewLog