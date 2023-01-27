/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState, useEffect } from "react"
import { getBoat } from "../../services/boats"
import { Boat, RootState } from "../../types"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"

const SingleBoat = () => {
  const [boat, setBoat] = useState<(Boat | null)>(null)
  const { id } = useParams();
  const user = useSelector((state: RootState) => state.user)

  useEffect(() => {
    getBoat(id).then(boat => setBoat(boat)).catch(e => console.log(e))
  }, [id])

  const isFollowing = (): boolean => {
    user.boatsFollowing.forEach((boat) => {
      if (boat.id===id){
        return true
      }
    })
    return false
  }

  return (
    <div className="main">
      <div className="single_content">
        {boat && boat.name}<br/>
        {isFollowing() ? <button>Unfollow</button> : <button>Start following</button>}<br/>
        <button>Apply for crew</button>
      </div>
    </div>
  )
}

export default SingleBoat