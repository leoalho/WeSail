/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState } from "react"
import { useSelector } from "react-redux"
import { newLog } from "../services/logs"
import { RootState } from "../types"

const NewLog = () => {
  const user = useSelector((state: RootState) => state.user)
  const [boat, setBoat] = useState("")
  //const [date, setDate] = useState("")
  //const [crew, setCrew] = useState<Friend[]>([])
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [distance, setDistance] = useState("")
  const [distanceSailed, setDistanceSailed] = useState("")
  const [startLocation, setStartLocation] = useState("")
  const [endLocation, setEndLocation] = useState("")
  const [description, setDescription] = useState("")
  const [weather, setWeather] = useState("")

  /*
  useEffect(() => {
    const today = new Date()
    setDate(today.toISOString().split('T')[0])
  }, [])
  */
  
  const userBoats: JSX.Element[] = []

  if (user.boats) {
    user.boats.forEach((boat) => userBoats.push(<option key={boat.id as React.Key} value={boat.id}>{boat.name}</option>))
  }

  const createEvent = async () => {
    await newLog(
        {
            boat: boat,
            //participants?: string[],
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

  return (
    <div className="main">
      <div className="single_content">
        <select onChange={({target}) => setBoat(target.value)}>
          {userBoats}
        </select><br/>
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
  )
}

export default NewLog