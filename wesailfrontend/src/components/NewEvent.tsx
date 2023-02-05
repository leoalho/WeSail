/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState } from "react"
import { useSelector } from "react-redux"
import { newEvent } from "../services/events"
import { RootState } from "../types"

const NewEvent = () => {
  const user = useSelector((state: RootState) => state.user)
  const [boat, setBoat] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [location, setLocation] = useState("")
  const [description, setDescription] = useState("")
  
  const userBoats: JSX.Element[] = []

  if (user.boats) {
    user.boats.forEach((boat) => userBoats.push(<option key={boat.id as React.Key} value={boat.id}>{boat.name}</option>))
  }

  const createEvent = async () => {
    await newEvent(
      {
        boat: boat,
        date: date,
        time: time,
        location: location,
        description: description
      }
    )
  }

  return (
    <div className="main">
      <div className="single_content">
        <select onChange={({target}) => setBoat(target.value)}>
          {userBoats}
        </select><br/>
        <input onChange={({target}) => setDate(target.value)} type="date" id="start" name="trip-start" value={date}></input>
        <input onChange={({target}) => setTime(target.value)} type="time" id="start-time" name="start-time"></input><br />
        Location: <input onChange={({target}) => setLocation(target.value)}></input><br/>
        Description: <input onChange={({target}) => setDescription(target.value)}></input><br/>
        <button onClick={createEvent}>Create event</button>
      </div>
    </div>
  )
}

export default NewEvent