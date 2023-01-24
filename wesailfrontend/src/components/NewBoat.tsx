/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState } from "react"
import { useDispatch } from "react-redux"
import { addBoat } from "../reducers/userReducer"
import { newBoat } from "../services/boats"

const NewBoat = () => {
  const [boatname, setBoatname] = useState<string>("")
  const dispatch = useDispatch()

  const handleNewBoat = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    const newboat = await newBoat({name: boatname})
    dispatch(addBoat(newboat))
    setBoatname("")
  }

  return (
    <div className="main">
      <div className="single_content">
        <form onSubmit={handleNewBoat}>
          <div>
            boat name: <input type="text" value={boatname} onChange={({ target }) => setBoatname(target.value)} />
          </div>
          <button type="submit">Create new boat</button>
        </form>
      </div>
    </div>
  )
}

export default NewBoat

//creating a newboat does not yet update the userstate