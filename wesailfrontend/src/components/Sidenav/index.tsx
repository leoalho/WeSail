/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { getEvents } from "../../services/events"
import { Event, RootState} from "../../types"
import Card from "./Card"

interface Props {
    yourboats: boolean,
    followingboats: boolean,
    crewboats: boolean,
    friendActivity: boolean
}

const SideNav = ({yourboats, followingboats, crewboats, friendActivity}: Props) => {
  const [events, setEvents] = useState<Event[]>([])
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([])
  const currentUser = useSelector((state: RootState) => state.user)

  useEffect(() => {
    getEvents().then((newEvents) => {
        setEvents(newEvents)
        setFilteredEvents(newEvents)
    }).catch(e => console.log(e))
  }, [currentUser])

  useEffect(() => {
    filterEvents()
  }, [yourboats, followingboats, crewboats, friendActivity])

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
        if (friendActivity && !newEvent){
            currentUser.friends.forEach((friend) => {
                if (friend.id===event.creator){
                    newEvent = true
                }
            })
        }
        if (newEvent){
            newEvents.push(event)
        }
    })
    console.log(newEvents)
    setFilteredEvents(newEvents)
  }

  return (
    <div id="sideNav">
    <div style={{width: "285px"}}>Upcoming events:</div>
    {filteredEvents.map((card) => <Card key={card.id} event={card}/>)}    
    </div>
)}

export default SideNav