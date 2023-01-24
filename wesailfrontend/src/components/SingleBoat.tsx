/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState, useEffect } from "react"
import { getBoat } from "../services/boats"
import { Boat } from "../types"
import { useParams } from "react-router-dom"

const SingleBoat = () => {
  const [boat, setBoat] = useState<(Boat | null)>(null)
  const { id } = useParams();

  useEffect(() => {
    getBoat(id).then(boat => setBoat(boat)).catch(e => console.log(e))
  }, [])

  return (
    <div className="main">
      <div className="single_content">
        {boat && boat.name}
      </div>
    </div>
  )
}

export default SingleBoat