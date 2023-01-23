/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState } from "react"
import { newBoat } from "../services/boats"

const NewBoat = () => {
  const [boatname, setBoatname] = useState<string>("")

  const handleNewBoat = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    await newBoat({name: boatname})
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