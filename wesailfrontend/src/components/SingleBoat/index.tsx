/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState, useEffect } from "react"
import { deleteFollower, getBoat, updateBoat } from "../../services/boats"
import { Boat, RootState } from "../../types"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { updateUser } from "../../services/users"
import getUser from "../../services/user"
import { updateFollowing } from "../../reducers/userReducer"

const SingleBoat = () => {
  const [boat, setBoat] = useState<(Boat | null)>(null)
  const { id } = useParams();
  let user = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    getBoat(id).then(boat => setBoat(boat)).catch(e => console.log(e))
  }, [id])

  if (!boat){
    return <>Loading ...</>
  }

  const isFollowing = (): boolean => {
    let returnValue = false
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    user.boatsFollowing.forEach((follower) => {
      if (follower.id===id){
        returnValue = true
      }
    })
    return returnValue
  }

  const followBoat = async () => {
    const newUser = await updateUser(user.id, {boatsFollowing: boat.id})
    console.log(newUser)
    const newBoat = await updateBoat(boat.id, {follower: user.id})
    console.log(newBoat)
    dispatch(updateFollowing(newUser.boatsFollowing))
    setBoat(newBoat)
  }

  const unFollowBoat = async () => {
    await deleteFollower(boat.id, user.id)
    const newUser = await getUser()
    const newBoat = await getBoat(id)
    dispatch(updateFollowing(newUser.boatsFollowing))
    setBoat(newBoat)
  }

  return (
    <div className="main">
      <div className="single_content">
        {boat && boat.name}<br/>
        {isFollowing() ? <button onClick={unFollowBoat}>Unfollow</button> : <button onClick={followBoat}>Start following</button>}<br/>
        <button>Apply for crew</button>
      </div>
    </div>
  )
}

export default SingleBoat