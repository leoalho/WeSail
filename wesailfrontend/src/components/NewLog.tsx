/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */

import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Select from 'react-select'

import { getBoat } from "../services/boats"
import { newLog } from "../services/logs"
import { RootState, Option } from "../types"

const NewLog = () => {
  const user = useSelector((state: RootState) => state.user)
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

  useEffect(() => {
    if (user.boats.length>0){
        setBoat(user.boats[0].id)
    }
  }, [])

  useEffect(() => {
    const newOptions: Option[] = []
    setParticipants([])
    getBoat(boat).then((newBoat) => {
        newBoat.owners.forEach(owner => {
            newOptions.push({value: owner.id, label: owner.username})
        })
        newBoat.crew.forEach(crew => {
            newOptions.push({value: crew.id, label: crew.username})
        })
        setOptions(newOptions)
    }).catch(e => console.log(e))
  }, [boat])

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
            end: endLocation
        }
    )
  }

  const style = {
    backgroundColor: "white",
    padding: "10px"
  }

  return (
    <div className="main">
      <div>
        <div style={style}>
        <select onChange={({target}) => setBoat(target.value)}>
          {user.boats.map(boat => <option key={boat.id as React.Key} value={boat.id}>{boat.name}</option>)}
        </select><br/>
        <Select isMulti name="participants" options={options} value={participants} onChange={(option) => setParticipants([...option])} className="basic-multi-select" classNamePrefix="select" />
        Start location: <input onChange={({target}) => setStartLocation(target.value)}></input>
        <input onChange={({target}) => setStartTime(target.value)} type="datetime-local" id="start-time" name="start-time"></input><br />
        End location: <input onChange={({target}) => setEndLocation(target.value)}></input>
        <input onChange={({target}) => setEndTime(target.value)} type="datetime-local" id="end-time" name="end-time"></input><br />
        Distance: <input type="number" onChange={({target}) => setDistance(target.value)}></input><br />
        Distance sailed: <input type="number" onChange={({target}) => setDistanceSailed(target.value)}></input><br />
        Weather: <input onChange={({target}) => setWeather(target.value)}></input><br />
        Description: <input onChange={({target}) => setDescription(target.value)}></input><br/>
        <button onClick={createEvent}>Create log entry</button>
      </div>
      </div>
    </div>
  )
}

export default NewLog