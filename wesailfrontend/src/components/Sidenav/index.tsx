/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { getEvents } from "../../services/events"
import { Event, RootState} from "../../types"
import Card from "./Card"

const SideNav = () => {
  const [events, setEvents] = useState<Event[]>([])
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([])
  const [yourboats, setYourboats] = useState(true)
  const [followingboats, setFollowingboats] = useState(true)
  //const [friendboats, setFriendboats] = useState(true)
  const [crewboats, setCrewboats] = useState(true)
  const currentUser = useSelector((state: RootState) => state.user)

  useEffect(() => {
    getEvents().then((newEvents) => {
        setEvents(newEvents)
        setFilteredEvents(newEvents)
    }).catch(e => console.log(e))
  }, [])

  useEffect(() => {
    filterEvents()
  }, [yourboats, followingboats, crewboats])

  const filterEvents = () => {
    const newEvents: Event[] = []
    events.forEach((event) => {
        let newEvent = false
        if (yourboats){
            currentUser.boats.forEach((boat) => {
                if (boat.id===event.boat.id){
                    newEvent = true
                }
            })
        }
        if (followingboats && !newEvent){
            currentUser.boatsFollowing.forEach((boat) => {
                if (boat.id===event.boat.id){
                    newEvent = true
                }
            })
        }
        if (crewboats && !newEvent){
            currentUser.crewMember.forEach((boat) => {
                if (boat.id===event.boat.id){
                    newEvent = true
                }
            })
        }
        if (newEvent){
            newEvents.push(event)
        }
    })

    setFilteredEvents(newEvents)
  }

  return (
    <div id="sideNav">
    <div className="eventCard">
        <div>Upcoming events:</div>
        <div>Show:
            <input type="checkbox" id="yourboats" name="yourboats" checked={yourboats} onChange={() => setYourboats(!yourboats)}/>your boats
            <input type="checkbox" id="followingboats" name="followingboats" checked={followingboats} onChange={() => setFollowingboats(!followingboats)}/>boats you follow<br/>
            <input type="checkbox" id="crewboats" name="crewboats" checked={crewboats} onChange={() => setCrewboats(!crewboats)}/>boats you are a crewmember of
        </div>
    </div>
    {filteredEvents.map((card) => <Card key={card.id} event={card}/>)}    
    </div>
)}

export default SideNav