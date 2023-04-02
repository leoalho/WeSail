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

  const style = {
    backgroundColor: "white",
    padding: "10px"
  }

  return (
    <div className="main">
      <div>
      <div style={style}>
        <form onSubmit={handleNewBoat}>
          <div>
            boat name: <input type="text" value={boatname} onChange={({ target }) => setBoatname(target.value)} />
          </div>
          <button className="button" type="submit">Create new boat</button>
        </form>
      </div>
      </div>
    </div>
  )
}

export default NewBoat

//creating a newboat does not yet update the userstate